import Link from "next/link";
import Logo from "@/components/Logo";

const FEATURES = [
  {
    title: "برنامه‌ریزی خودکار چندمرحله‌ای",
    desc: "ایجنت کار بزرگ را به مراحل کوچک تقسیم می‌کند، ترتیب اجرا را خودش تعیین می‌کند و پیش می‌رود.",
  },
  {
    title: "اجرای واقعی کارها",
    desc: "به‌جای توضیح‌دادن اینکه چه باید کرد، خودش انجامش می‌دهد؛ از جست‌وجو تا نوشتن و سازمان‌دهی.",
  },
  {
    title: "حافظهٔ گفتگو",
    desc: "هر مکالمه ذخیره می‌شود تا بتوانی بعداً برگردی و همان‌جا ادامه بدهی.",
  },
  {
    title: "کنترل کامل روی حساب",
    desc: "ورود امن، مدیریت گفتگوها و تنظیمات شخصی، همه زیر یک حساب کاربری.",
  },
];

const STEPS = [
  { n: "۱", t: "ثبت‌نام کن", d: "با ایمیل و رمز عبور در کمتر از یک دقیقه حساب بساز." },
  { n: "۲", t: "یک گفتگو شروع کن", d: "هدفت را بگو؛ یک کار، یک سؤال، یا یک پروژه." },
  { n: "۳", t: "نتیجه را بگیر", d: "ایجنت مراحل را اجرا می‌کند و نتیجهٔ نهایی را تحویل می‌دهد." },
];

const PLANS = [
  {
    name: "رایگان",
    price: "۰",
    desc: "برای شروع و آشنایی با ایجنت",
    features: ["۲۰ پیام در روز", "یک گفتگوی فعال", "پاسخ استاندارد"],
    cta: "شروع رایگان",
    highlighted: false,
  },
  {
    name: "حرفه‌ای",
    price: "۲۹۹",
    unit: "هزار تومان / ماه",
    desc: "برای استفادهٔ جدی و روزانه",
    features: ["پیام نامحدود", "گفتگوهای نامحدود", "اولویت در صف اجرا", "پشتیبانی ایمیلی"],
    cta: "شروع نسخه حرفه‌ای",
    highlighted: true,
  },
  {
    name: "تیمی",
    price: "تماس بگیرید",
    desc: "برای تیم‌ها و سازمان‌ها",
    features: ["چند کاربره", "گزارش‌گیری مدیریتی", "اتصال به ابزارهای داخلی", "پشتیبانی اختصاصی"],
    cta: "درخواست دمو",
    highlighted: false,
  },
];

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-bg text-ink">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-36 -top-44 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(217,119,87,0.16)_0%,rgba(217,119,87,0)_70%)]" />
        <div className="absolute -right-40 bottom-[-220px] h-[620px] w-[620px] rounded-full bg-[radial-gradient(circle,rgba(217,119,87,0.10)_0%,rgba(217,119,87,0)_70%)]" />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-8 sm:px-12 lg:px-24">
        <Logo />
        <nav className="flex items-center gap-7">
          <a href="#features" className="hidden text-sm text-muted hover:text-ink sm:inline">
            قابلیت‌ها
          </a>
          <a href="#pricing" className="hidden text-sm text-muted hover:text-ink sm:inline">
            قیمت‌گذاری
          </a>
          <Link href="/login" className="text-sm text-muted hover:text-ink">
            ورود
          </Link>
          <Link href="/signup" className="rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-bg">
            ثبت‌نام
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <main className="relative z-10 flex flex-col items-center px-6 pb-24 pt-10 text-center sm:px-12">
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-accent/35 bg-accent/10 px-4 py-1.5 text-[13px] font-semibold text-accent2">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          نسل تازه‌ای از هوش مصنوعی
        </div>

        <h1 className="max-w-3xl text-[40px] font-black leading-[1.15] sm:text-[56px] lg:text-[72px]">
          هوش مصنوعی ایجنتیک
          <br />
          دنیا را از نو می‌سازد
        </h1>

        <p className="mt-7 max-w-xl text-[17px] leading-[1.9] text-muted sm:text-lg">
          برخلاف ابزارهای گذشته که فقط پاسخ می‌دادند، ایجنت‌های امروزی تصمیم می‌گیرند، برنامه‌ریزی
          می‌کنند و کارها را تا انتها به‌تنهایی انجام می‌دهند. ایجنت‌ورس همین تجربه را در اختیارت
          می‌گذارد.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Link href="/signup" className="btn-primary">
            شروع کنید — رایگان
          </Link>
          <a href="#how" className="btn-ghost">
            چطور کار می‌کند؟
          </a>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-5 text-[13px] text-faint sm:gap-10">
          <span>بدون نیاز به کارت بانکی</span>
          <span className="h-1 w-1 rounded-full bg-border" />
          <span>شروع در کمتر از یک دقیقه</span>
          <span className="h-1 w-1 rounded-full bg-border" />
          <span>لغو اشتراک در هر زمان</span>
        </div>
      </main>

      {/* Features */}
      <section id="features" className="relative z-10 border-t border-border px-6 py-20 sm:px-12 lg:px-24">
        <h2 className="mb-12 text-center text-3xl font-extrabold sm:text-4xl">چرا ایجنت‌ورس؟</h2>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2">
          {FEATURES.map((f) => (
            <div key={f.title} className="card">
              <h3 className="mb-2 text-lg font-bold">{f.title}</h3>
              <p className="text-sm leading-7 text-muted">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="relative z-10 border-t border-border px-6 py-20 sm:px-12 lg:px-24">
        <h2 className="mb-12 text-center text-3xl font-extrabold sm:text-4xl">چطور کار می‌کند</h2>
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.n} className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-lg font-black text-bg">
                {s.n}
              </div>
              <h3 className="mb-2 font-bold">{s.t}</h3>
              <p className="text-sm leading-7 text-muted">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="relative z-10 border-t border-border px-6 py-20 sm:px-12 lg:px-24">
        <h2 className="mb-12 text-center text-3xl font-extrabold sm:text-4xl">قیمت‌گذاری ساده</h2>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-3">
          {PLANS.map((p) => (
            <div
              key={p.name}
              className={`card flex flex-col ${p.highlighted ? "border-accent ring-1 ring-accent" : ""}`}
            >
              <h3 className="text-lg font-bold">{p.name}</h3>
              <p className="mt-1 text-sm text-faint">{p.desc}</p>
              <div className="mt-5 flex items-baseline gap-2">
                <span className="text-3xl font-black">{p.price}</span>
                {p.unit && <span className="text-xs text-faint">{p.unit}</span>}
                {p.price === "۰" && <span className="text-xs text-faint">تومان</span>}
              </div>
              <ul className="mt-6 flex-1 space-y-3 text-sm text-muted">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 flex-none rounded-full bg-accent" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/signup"
                className={`mt-7 rounded-full px-5 py-3 text-center text-sm font-bold ${
                  p.highlighted ? "bg-accent text-bg" : "border border-border text-ink"
                }`}
              >
                {p.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border px-6 py-10 sm:px-12 lg:px-24">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <Logo size={22} />
          <p className="text-xs text-faint">© ۱۴۰۴ ایجنت‌ورس. همهٔ حقوق محفوظ است.</p>
        </div>
      </footer>
    </div>
  );
}
