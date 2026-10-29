"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Logo from "./Logo";

type Mode = "login" | "signup";

export default function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(`/api/auth/${mode === "login" ? "login" : "signup"}`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(mode === "login" ? { email, password } : { name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "مشکلی پیش آمد");
        return;
      }
      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("ارتباط با سرور برقرار نشد");
    } finally {
      setLoading(false);
    }
  }

  const isLogin = mode === "login";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-bg px-6 py-16 text-ink">
      <Link href="/" className="mb-10">
        <Logo />
      </Link>

      <div className="w-full max-w-sm">
        <h1 className="mb-2 text-center text-2xl font-extrabold">
          {isLogin ? "ورود به حساب" : "ساخت حساب جدید"}
        </h1>
        <p className="mb-8 text-center text-sm text-muted">
          {isLogin ? "خوش برگشتی، دوباره وارد شو" : "در کمتر از یک دقیقه شروع کن"}
        </p>

        <form onSubmit={onSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-muted">نام</label>
              <input
                className="input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="نام و نام خانوادگی"
                required
                minLength={2}
              />
            </div>
          )}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-muted">ایمیل</label>
            <input
              className="input"
              type="email"
              dir="ltr"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-muted">رمز عبور</label>
            <input
              className="input"
              type="password"
              dir="ltr"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength={isLogin ? 1 : 8}
            />
          </div>

          {error && (
            <p className="rounded-lg border border-red-900/50 bg-red-950/40 px-3 py-2 text-xs text-red-300">
              {error}
            </p>
          )}

          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? "در حال پردازش..." : isLogin ? "ورود" : "ثبت‌نام"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted">
          {isLogin ? (
            <>
              حساب نداری؟{" "}
              <Link href="/signup" className="font-semibold text-accent2">
                ثبت‌نام کن
              </Link>
            </>
          ) : (
            <>
              قبلاً ثبت‌نام کرده‌ای؟{" "}
              <Link href="/login" className="font-semibold text-accent2">
                وارد شو
              </Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
