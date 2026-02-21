import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const module = await prisma.module.findUnique({
    where: { id },
    include: { resources: { orderBy: { order: "asc" } } },
  });
  if (!module) return NextResponse.json({ error: "Não encontrado" }, { status: 404 });
  return NextResponse.json(module);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session || (session.user as any).role !== "ADMIN") {
    return NextResponse.json({ error: "Sem permissão" }, { status: 403 });
  }

  const { id } = await params;
  const body = await req.json();

  try {
    await prisma.resource.deleteMany({ where: { moduleId: id } });
    const module = await prisma.module.update({
      where: { id },
      data: {
        title: body.title,
        summary: body.summary,
        bannerImage: body.bannerImage,
        resources: {
          create: (body.resources || []).map((r: any, i: number) => ({
            type: r.type,
            title: r.title,
            url: r.url,
            order: i,
          })),
        },
      },
      include: { resources: true },
    });
    return NextResponse.json(module);
  } catch {
    return NextResponse.json({ error: "Erro ao atualizar módulo" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session || (session.user as any).role !== "ADMIN") {
    return NextResponse.json({ error: "Sem permissão" }, { status: 403 });
  }

  const { id } = await params;
  await prisma.module.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
