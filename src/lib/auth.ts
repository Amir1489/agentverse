import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { cookies } from "next/headers";
import { prisma } from "./prisma";

const JWT_SECRET = process.env.JWT_SECRET || "insecure-dev-secret-change-me";
const SESSION_COOKIE = "agentverse_session";
const SESSION_DAYS = 30;

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

function hashToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export type SessionPayload = { sub: string; sid: string };

/** Create a DB-backed session + signed JWT, and set it as an httpOnly cookie. */
export async function createSession(userId: string, userAgent?: string | null) {
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);
  const rawSessionId = crypto.randomUUID();

  const token = jwt.sign({ sub: userId, sid: rawSessionId } satisfies SessionPayload, JWT_SECRET, {
    expiresIn: `${SESSION_DAYS}d`,
  });

  await prisma.session.create({
    data: {
      id: rawSessionId,
      userId,
      tokenHash: hashToken(token),
      userAgent: userAgent ?? undefined,
      expiresAt,
    },
  });

  cookies().set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });

  return token;
}

export function clearSessionCookie() {
  cookies().set(SESSION_COOKIE, "", { path: "/", expires: new Date(0) });
}

/** Reads the session cookie, verifies the JWT and checks it against the DB. Returns the user or null. */
export async function getCurrentUser() {
  const token = cookies().get(SESSION_COOKIE)?.value;
  if (!token) return null;

  let payload: SessionPayload;
  try {
    payload = jwt.verify(token, JWT_SECRET) as SessionPayload;
  } catch {
    return null;
  }

  const session = await prisma.session.findUnique({ where: { id: payload.sid } });
  if (!session || session.tokenHash !== hashToken(token) || session.expiresAt < new Date()) {
    return null;
  }

  const user = await prisma.user.findUnique({ where: { id: payload.sub } });
  if (!user) return null;

  return user;
}

export async function destroyCurrentSession() {
  const token = cookies().get(SESSION_COOKIE)?.value;
  if (token) {
    try {
      const payload = jwt.verify(token, JWT_SECRET) as SessionPayload;
      await prisma.session.delete({ where: { id: payload.sid } }).catch(() => {});
    } catch {
      /* ignore */
    }
  }
  clearSessionCookie();
}
