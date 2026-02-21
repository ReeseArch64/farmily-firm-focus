import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  const modules = await prisma.module.findMany({
    where: { published: true },
    include: { resources: { orderBy: { order: "asc" } } },
    orderBy: { order: "asc" },
  });
  return NextResponse.json(modules);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session || (session.user as any).role !== "ADMIN") {
    return NextResponse.json({ error: "Sem permissão" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { title, summary, bannerImage, resources } = body;

    const count = await prisma.module.count();
    const module = await prisma.module.create({
      data: {
        title,
        summary,
        bannerImage: bannerImage || `https://picsum.photos/seed/${Date.now()}/800/400`,
        order: count,
        resources: {
          create: (resources || []).map((r: any, i: number) => ({
            type: r.type,
            title: r.title,
            url: r.url,
            order: i,
          })),
        },
      },
      include: { resources: true },
    });

    return NextResponse.json(module, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Erro ao criar módulo" }, { status: 500 });
  }
}
