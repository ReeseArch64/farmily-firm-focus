import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { notFound } from "next/navigation";
import { ModulePageClient } from "./module-page-client";

export default async function ModulePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const module = await prisma.module.findUnique({
    where: { id },
    include: { resources: { orderBy: { order: "asc" } } },
  });

  if (!module) notFound();

  const session = await auth();
  let initialCompletedResources: Record<string, boolean> = {};

  if (session?.user?.id) {
    const resourceProgress = await prisma.userResourceProgress.findMany({
      where: {
        userId: session.user.id,
        resourceId: { in: module.resources.map((r) => r.id) },
      },
    });
    for (const p of resourceProgress) {
      initialCompletedResources[p.resourceId] = p.completed;
    }
  }

  return (
    <ModulePageClient
      module={module}
      initialCompletedResources={initialCompletedResources}
      isLoggedIn={!!session?.user}
      isAdmin={(session?.user as any)?.role === "ADMIN"}
    />
  );
}
