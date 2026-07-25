import { SignJWT, jwtVerify } from "jose";

/** Edge-safe session primitives (no next/headers) — usable in middleware. */

export const SESSION_COOKIE = "fitnear_session";

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar?: string | null;
}

function secret() {
  return new TextEncoder().encode(
    process.env.AUTH_SECRET || "dev-only-insecure-secret-change-in-production",
  );
}

export async function signSession(user: SessionUser): Promise<string> {
  return new SignJWT({
    email: user.email,
    name: user.name,
    role: user.role,
    avatar: user.avatar ?? null,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(user.id)
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret());
}

export async function verifySession(
  token: string,
): Promise<SessionUser | null> {
  try {
    const { payload } = await jwtVerify(token, secret());
    return {
      id: String(payload.sub),
      email: String(payload.email),
      name: String(payload.name),
      role: String(payload.role),
      avatar: (payload.avatar as string | null) ?? null,
    };
  } catch {
    return null;
  }
}
