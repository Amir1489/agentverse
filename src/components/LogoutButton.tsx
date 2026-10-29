"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function logout() {
    setLoading(true);
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  return (
    <button
      onClick={logout}
      disabled={loading}
      className="w-full rounded-lg px-3 py-2.5 text-right text-sm font-semibold text-faint hover:bg-surface2 hover:text-ink"
    >
      {loading ? "در حال خروج..." : "خروج از حساب"}
    </button>
  );
}
