"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

type Conversation = { id: string; title: string; updatedAt: string };

export default function ConversationList({
  initialConversations,
}: {
  initialConversations: Conversation[];
}) {
  const router = useRouter();
  const [conversations, setConversations] = useState(initialConversations);
  const [creating, setCreating] = useState(false);

  async function createConversation() {
    setCreating(true);
    try {
      const res = await fetch("/api/conversations", { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        router.push(`/dashboard/chat/${data.conversation.id}`);
      }
    } finally {
      setCreating(false);
    }
  }

  async function removeConversation(id: string) {
    setConversations((cs) => cs.filter((c) => c.id !== id));
    await fetch(`/api/conversations/${id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <button onClick={createConversation} disabled={creating} className="btn-primary mb-6 w-fit">
        + گفتگوی جدید
      </button>

      {conversations.length === 0 ? (
        <div className="card text-center text-sm text-muted">
          هنوز گفتگویی نداری. اولین گفتگو را شروع کن.
        </div>
      ) : (
        <div className="flex-1 space-y-2 overflow-y-auto pb-6">
          {conversations.map((c) => (
            <div
              key={c.id}
              className="group flex items-center justify-between rounded-xl border border-border bg-surface px-4 py-3.5 hover:border-faint"
            >
              <Link href={`/dashboard/chat/${c.id}`} className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{c.title}</p>
                <p className="text-xs text-faint">
                  {new Date(c.updatedAt).toLocaleDateString("fa-IR")}
                </p>
              </Link>
              <button
                onClick={() => removeConversation(c.id)}
                className="mr-2 flex-none text-xs text-faint opacity-0 transition hover:text-red-400 group-hover:opacity-100"
              >
                حذف
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
