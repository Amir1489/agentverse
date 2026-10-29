// Agent service: calls the Anthropic API when ANTHROPIC_API_KEY is set,
// otherwise falls back to a small deterministic mock so the whole product
// (auth -> conversations -> chat UI) works end-to-end with zero external keys.

export type AgentMessage = { role: "user" | "assistant"; content: string };

const SYSTEM_PROMPT =
  "تو «ایجنت‌ورس» هستی، یک دستیار هوش مصنوعی ایجنتیک که به‌جای فقط پاسخ دادن، کارها را مرحله‌به‌مرحله برنامه‌ریزی و اجرا می‌کند. پاسخ‌ها را به فارسی، کوتاه، دقیق و کاربردی بده.";

export async function getAgentReply(history: AgentMessage[]): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return mockReply(history);
  }

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: process.env.ANTHROPIC_MODEL || "claude-sonnet-4-5",
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: history.map((m) => ({ role: m.role, content: m.content })),
      }),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      console.error("Anthropic API error", res.status, errText);
      return mockReply(history, true);
    }

    const data = await res.json();
    const text = data?.content?.[0]?.text;
    return typeof text === "string" && text.length > 0 ? text : mockReply(history, true);
  } catch (err) {
    console.error("Agent call failed", err);
    return mockReply(history, true);
  }
}

function mockReply(history: AgentMessage[], wasError = false): string {
  const last = history[history.length - 1]?.content?.trim() || "";
  const prefix = wasError
    ? "اتصال به مدل هوش مصنوعی برقرار نشد، این یک پاسخ نمایشی است.\n\n"
    : "";
  if (!last) {
    return prefix + "سلام! من ایجنت‌ورس هستم. چه کاری برایت انجام بدهم؟";
  }
  return (
    prefix +
    `دریافت شد: «${last}»\n\n` +
    "این یک پاسخ نمایشی از ایجنت است (برای فعال‌سازی پاسخ واقعی، ANTHROPIC_API_KEY را در فایل .env تنظیم کن). " +
    "در حالت واقعی، ایجنت این درخواست را به چند مرحله تقسیم می‌کند، ابزارهای لازم را صدا می‌زند و نتیجهٔ نهایی را همین‌جا تحویل می‌دهد."
  );
}
