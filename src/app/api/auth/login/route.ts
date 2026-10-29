import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPassword, createSession } from "@/lib/auth";
import { loginSchema } from "@/lib/validation";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || "داده نامعتبر" },
      { status: 400 }
    );
  }
  const { email, password } = parsed.data;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ error: "ایمیل یا رمز عبور اشتباه است" }, { status: 401 });
  }

  const ok = await verifyPassword(password, user.passwordHash);
  if (!ok) {
    return NextResponse.json({ error: "ایمیل یا رمز عبور اشتباه است" }, { status: 401 });
  }

  await createSession(user.id, req.headers.get("user-agent"));

  return NextResponse.json({
    user: { id: user.id, name: user.name, email: user.email, plan: user.plan },
  });
}
