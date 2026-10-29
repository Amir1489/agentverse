import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ایجنت‌ورس | دستیار هوش مصنوعی ایجنتیک",
  description: "دستیار هوش مصنوعی ایجنتیک که به‌جای فقط پاسخ‌دادن، کارها را برنامه‌ریزی و اجرا می‌کند.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
