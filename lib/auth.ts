import { SignJWT, jwtVerify, JWTPayload } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.JWT_SECRET || "default_super_secret_fallback_key";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: JWTPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(key);
}

export async function decrypt(token: string) {
  try {
    const { payload } = await jwtVerify(token, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch {
    return null;
  }
}

export async function login(username: string) {
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 day
  const session = await encrypt({ user: username, expires });

  const cookieStore = await cookies();
  cookieStore.set("session", session, { expires, httpOnly: true });
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.set("session", "", { expires: new Date(0) });
}

export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}
