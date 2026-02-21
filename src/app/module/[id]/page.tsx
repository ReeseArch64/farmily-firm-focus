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
  let initialCompleted = false;

  if (session?.user?.id) {
    const progress = await prisma.userModuleProgress.findUnique({
      where: { userId_moduleId: { userId: session.user.id, moduleId: id } },
    });
    initialCompleted = progress?.completed ?? false;
  }

  return (
    <ModulePageClient
      module={module}
      initialCompleted={initialCompleted}
      isLoggedIn={!!session?.user}
      isAdmin={(session?.user as any)?.role === "ADMIN"}
    />
  );
}
