import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { messageSchema } from "@/lib/validation";
import { getAgentReply } from "@/lib/agent";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "وارد نشده‌اید" }, { status: 401 });

  const conversation = await prisma.conversation.findFirst({
    where: { id: params.id, userId: user.id },
    include: { messages: { orderBy: { createdAt: "asc" } } },
  });
  if (!conversation) return NextResponse.json({ error: "پیدا نشد" }, { status: 404 });

  const body = await req.json().catch(() => null);
  const parsed = messageSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || "داده نامعتبر" },
      { status: 400 }
    );
  }

  const userMessage = await prisma.message.create({
    data: { conversationId: conversation.id, role: "user", content: parsed.data.content },
  });

  // Auto-title the conversation from the first message.
  if (conversation.messages.length === 0) {
    const title = parsed.data.content.slice(0, 48);
    await prisma.conversation.update({ where: { id: conversation.id }, data: { title } });
  }

  const history = [
    ...conversation.messages.map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    })),
    { role: "user" as const, content: parsed.data.content },
  ];

  const replyText = await getAgentReply(history);

  const assistantMessage = await prisma.message.create({
    data: { conversationId: conversation.id, role: "assistant", content: replyText },
  });

  await prisma.conversation.update({
    where: { id: conversation.id },
    data: { updatedAt: new Date() },
  });

  return NextResponse.json({ userMessage, assistantMessage });
}
