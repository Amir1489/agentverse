import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "وارد نشده‌اید" }, { status: 401 });

  const conversation = await prisma.conversation.findFirst({
    where: { id: params.id, userId: user.id },
    include: { messages: { orderBy: { createdAt: "asc" } } },
  });

  if (!conversation) return NextResponse.json({ error: "پیدا نشد" }, { status: 404 });

  return NextResponse.json({ conversation });
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "وارد نشده‌اید" }, { status: 401 });

  const conversation = await prisma.conversation.findFirst({
    where: { id: params.id, userId: user.id },
  });
  if (!conversation) return NextResponse.json({ error: "پیدا نشد" }, { status: 404 });

  await prisma.conversation.delete({ where: { id: conversation.id } });
  return NextResponse.json({ ok: true });
}
