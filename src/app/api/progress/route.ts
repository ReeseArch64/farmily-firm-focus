import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({});

  const progress = await prisma.userModuleProgress.findMany({
    where: { userId: session.user.id },
  });

  const map: Record<string, boolean> = {};
  for (const p of progress) {
    map[p.moduleId] = p.completed;
  }
  return NextResponse.json(map);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  const { moduleId, completed } = await req.json();

  await prisma.userModuleProgress.upsert({
    where: { userId_moduleId: { userId: session.user.id, moduleId } },
    update: { completed },
    create: { userId: session.user.id, moduleId, completed },
  });

  return NextResponse.json({ ok: true });
}
