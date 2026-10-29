# ایجنت‌ورس (AgentVerse)

پلتفرم SaaS کامل برای دستیار هوش مصنوعی ایجنتیک — با لندینگ پیج، ثبت‌نام و ورود، دیتابیس، و داشبورد چت.

## چارچوب پروژه

- **فرانت‌اند**: Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **بک‌اند**: Next.js Route Handlers (API) روی همان پروژه
- **دیتابیس**: Prisma ORM + PostgreSQL (برای کارکردن روی هاست‌های سرورلس مثل Netlify/Vercel؛ یک دیتابیس رایگان مثل Neon یا Supabase کافی است) — برای توسعهٔ محلی بدون Postgres می‌توانید provider را به SQLite سوییچ کنید
- **احراز هویت**: ایمیل/رمز عبور، هش با bcrypt، نشست (session) با JWT در کوکی httpOnly + جدول Session در دیتابیس (قابل invalidate کردن)
- **ایجنت**: اگر `ANTHROPIC_API_KEY` تنظیم شود به API واقعی claude وصل می‌شود؛ در غیر این صورت یک پاسخ نمایشی (mock) برمی‌گرداند تا کل جریان برنامه (ثبت‌نام → گفتگو → پاسخ) بدون کلید هم کار کند.

## صفحات

| مسیر | توضیح |
|---|---|
| `/` | لندینگ پیج (هیرو، قابلیت‌ها، نحوهٔ کار، قیمت‌گذاری) |
| `/signup` | ثبت‌نام |
| `/login` | ورود |
| `/dashboard` | لیست گفتگوها + ساخت گفتگوی جدید |
| `/dashboard/chat/[id]` | رابط چت با ایجنت |
| `/dashboard/settings` | تنظیمات حساب و پلن |

## مدل‌های دیتابیس (`prisma/schema.prisma`)

- `User` — نام، ایمیل، هش رمز، پلن
- `Session` — نشست‌های فعال کاربر (قابل حذف برای خروج از همهٔ دستگاه‌ها)
- `Conversation` — هر گفتگوی کاربر
- `Message` — پیام‌های هر گفتگو (نقش user/assistant)

## راه‌اندازی

```bash
npm install
cp .env.example .env     # DATABASE_URL را به یک Postgres واقعی (مثلاً Neon رایگان) و JWT_SECRET را به یک مقدار تصادفی تنظیم کنید
npx prisma db push       # ساخت جدول‌های دیتابیس
npm run dev
```

سپس روی `http://localhost:3000` باز کنید.

### فعال‌سازی پاسخ واقعی ایجنت

در فایل `.env`:

```
ANTHROPIC_API_KEY="sk-ant-..."
ANTHROPIC_MODEL="claude-sonnet-4-5"
```

بدون این مقدار، ایجنت پاسخ نمایشی می‌دهد تا بتوانید کل اپ را تست کنید.

### دیدن دیتابیس

```bash
npm run db:studio
```

## استقرار (Deploy) — مثلاً روی Netlify

1. یک دیتابیس Postgres رایگان بسازید (مثلاً [Neon](https://neon.tech)) و آدرس اتصال آن را کپی کنید.
2. ریپازیتوری را در Netlify (یا Vercel، یا هر هاست دیگر Node) ایمپورت کنید.
3. متغیرهای محیطی `DATABASE_URL` (آدرس Postgres)، `JWT_SECRET` (یک رشتهٔ تصادفی بلند) و در صورت نیاز `ANTHROPIC_API_KEY` را در تنظیمات سایت قرار دهید.
4. Deploy کنید.
5. یک‌بار از ترمینال محلی، با همان `DATABASE_URL`، دستور `npx prisma db push` را اجرا کنید تا جدول‌ها روی دیتابیس production ساخته شوند.

## نکات امنیتی که از قبل رعایت شده

- رمز عبور هرگز خام ذخیره نمی‌شود (bcrypt).
- نشست‌ها httpOnly و (در production) secure هستند؛ در سمت سرور هم علیه جدول Session چک می‌شوند، نه فقط JWT.
- مسیرهای `/dashboard/*` با middleware و هم در سطح سرور هر صفحه محافظت شده‌اند.
- هر Query به گفتگوها و پیام‌ها با `userId` فیلتر می‌شود؛ کاربری نمی‌تواند داده کاربر دیگر را ببیند.
