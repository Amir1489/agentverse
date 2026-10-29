import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";

const PLAN_LABEL: Record<string, string> = { free: "رایگان", pro: "حرفه‌ای", team: "تیمی" };

export default async function SettingsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      <h1 className="mb-8 text-2xl font-extrabold">تنظیمات حساب</h1>

      <div className="card mb-6 space-y-4">
        <h2 className="text-sm font-bold text-muted">اطلاعات حساب</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-xs text-faint">نام</p>
            <p className="mt-1 font-semibold">{user.name}</p>
          </div>
          <div>
            <p className="text-xs text-faint">ایمیل</p>
            <p className="mt-1 font-semibold" dir="ltr">
              {user.email}
            </p>
          </div>
          <div>
            <p className="text-xs text-faint">پلن فعلی</p>
            <p className="mt-1 font-semibold">{PLAN_LABEL[user.plan] || user.plan}</p>
          </div>
          <div>
            <p className="text-xs text-faint">عضویت از</p>
            <p className="mt-1 font-semibold">{user.createdAt.toLocaleDateString("fa-IR")}</p>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="mb-2 text-sm font-bold text-muted">ارتقای پلن</h2>
        <p className="text-sm leading-7 text-muted">
          برای فعال‌سازی پلن حرفه‌ای یا تیمی، اتصال درگاه پرداخت لازم است. این بخش در ساختار پروژه
          آماده شده و می‌توانی آن را به درگاه دلخواهت متصل کنی.
        </p>
      </div>
    </div>
  );
}
