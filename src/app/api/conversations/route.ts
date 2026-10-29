import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "وارد نشده‌اید" }, { status: 401 });

  const conversations = await prisma.conversation.findMany({
    where: { userId: user.id },
    orderBy: { updatedAt: "desc" },
    select: { id: true, title: true, createdAt: true, updatedAt: true },
  });

  return NextResponse.json({ conversations });
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "وارد نشده‌اید" }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const title = typeof body?.title === "string" && body.title.trim() ? body.title.trim() : "گفتگوی جدید";

  const conversation = await prisma.conversation.create({
    data: { userId: user.id, title },
  });

  return NextResponse.json({ conversation });
}
