import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import ConversationList from "@/components/ConversationList";

export default async function DashboardHome() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const conversations = await prisma.conversation.findMany({
    where: { userId: user.id },
    orderBy: { updatedAt: "desc" },
    select: { id: true, title: true, updatedAt: true },
  });

  return (
    <div className="mx-auto flex h-screen max-w-3xl flex-col px-6 py-10">
      <h1 className="mb-1 text-2xl font-extrabold">سلام، {user.name.split(" ")[0]} 👋</h1>
      <p className="mb-8 text-sm text-muted">یک گفتگوی جدید شروع کن یا یکی از گفتگوهای قبلی را ادامه بده.</p>
      <ConversationList
        initialConversations={conversations.map((c) => ({
          id: c.id,
          title: c.title,
          updatedAt: c.updatedAt.toISOString(),
        }))}
      />
    </div>
  );
}
