"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";

type Msg = { id: string; role: "user" | "assistant"; content: string };

export default function ChatRoom({
  conversationId,
  title,
  initialMessages,
}: {
  conversationId: string;
  title: string;
  initialMessages: Msg[];
}) {
  const [messages, setMessages] = useState<Msg[]>(initialMessages);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function send() {
    const content = input.trim();
    if (!content || sending) return;
    setInput("");
    setSending(true);

    const tempId = `temp-${Date.now()}`;
    setMessages((m) => [...m, { id: tempId, role: "user", content }]);

    try {
      const res = await fetch(`/api/conversations/${conversationId}/messages`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ content }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessages((m) => [
          ...m.filter((x) => x.id !== tempId),
          { id: data.userMessage.id, role: "user", content: data.userMessage.content },
          { id: data.assistantMessage.id, role: "assistant", content: data.assistantMessage.content },
        ]);
      }
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="flex h-screen flex-col">
      <header className="flex items-center gap-3 border-b border-border px-6 py-4">
        <Link href="/dashboard" className="text-sm text-faint hover:text-ink">
          ← بازگشت
        </Link>
        <h1 className="truncate text-sm font-bold">{title}</h1>
      </header>

      <div className="flex-1 overflow-y-auto px-6 py-8">
        <div className="mx-auto max-w-2xl space-y-5">
          {messages.length === 0 && (
            <div className="rounded-xl border border-border bg-surface px-5 py-4 text-sm text-muted">
              پیامت را بنویس تا ایجنت شروع به کار کند.
            </div>
          )}
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.role === "user" ? "justify-start" : "justify-end"}`}>
              <div
                className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-7 ${
                  m.role === "user" ? "bg-surface2 text-ink" : "bg-accent/15 text-ink border border-accent/25"
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}
          {sending && (
            <div className="flex justify-end">
              <div className="rounded-2xl border border-accent/25 bg-accent/15 px-4 py-3 text-sm text-faint">
                در حال فکر کردن...
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      <div className="border-t border-border px-6 py-5">
        <div className="mx-auto flex max-w-2xl items-end gap-3">
          <textarea
            className="input min-h-[52px] flex-1 resize-none"
            placeholder="پیامت را بنویس..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            rows={1}
          />
          <button onClick={send} disabled={sending || !input.trim()} className="btn-primary flex-none">
            ارسال
          </button>
        </div>
      </div>
    </div>
  );
}
