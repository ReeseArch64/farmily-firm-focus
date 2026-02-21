import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({});

  const allModules = await prisma.module.findMany({
    include: { resources: { select: { id: true } } },
  });

  const resourceProgress = await prisma.userResourceProgress.findMany({
    where: { userId: session.user.id, completed: true },
  });

  const completedResourceIds = new Set(resourceProgress.map((p) => p.resourceId));

  const map: Record<string, { completed: boolean; done: number; total: number }> = {};
  for (const mod of allModules) {
    const total = mod.resources.length;
    const done = mod.resources.filter((r) => completedResourceIds.has(r.id)).length;
    map[mod.id] = {
      completed: total > 0 && done === total,
      done,
      total,
    };
  }

  return NextResponse.json(map);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  const { resourceId, completed } = await req.json();

  await prisma.userResourceProgress.upsert({
    where: { userId_resourceId: { userId: session.user.id, resourceId } },
    update: { completed },
    create: { userId: session.user.id, resourceId, completed },
  });

  return NextResponse.json({ ok: true });
}
