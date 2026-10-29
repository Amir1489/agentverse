import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import Logo from "@/components/Logo";
import LogoutButton from "@/components/LogoutButton";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <div className="flex min-h-screen bg-bg text-ink">
      <aside className="flex w-64 flex-none flex-col border-l border-border bg-surface px-4 py-6">
        <Link href="/" className="mb-8 px-2">
          <Logo size={24} />
        </Link>

        <nav className="flex flex-1 flex-col gap-1">
          <Link
            href="/dashboard"
            className="rounded-lg px-3 py-2.5 text-sm font-semibold text-ink hover:bg-surface2"
          >
            گفتگوها
          </Link>
          <Link
            href="/dashboard/settings"
            className="rounded-lg px-3 py-2.5 text-sm font-semibold text-muted hover:bg-surface2 hover:text-ink"
          >
            تنظیمات
          </Link>
        </nav>

        <div className="mt-auto border-t border-border pt-4">
          <div className="mb-3 px-2">
            <p className="truncate text-sm font-semibold">{user.name}</p>
            <p className="truncate text-xs text-faint" dir="ltr">
              {user.email}
            </p>
          </div>
          <LogoutButton />
        </div>
      </aside>

      <main className="flex-1 overflow-hidden">{children}</main>
    </div>
  );
}
