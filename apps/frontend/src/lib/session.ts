"use server";

import { jwtVerify, SignJWT } from "jose";
import { SESSION_SECRET_KEY } from "./constants";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type Session = {
  user: {
    id: string;
    name: string;
  };
  //   accessToken: string;
  //   refreshToken: string;
};

const secretKey = SESSION_SECRET_KEY;
const encodedKey = new TextEncoder().encode(secretKey);

export async function createSession(payload: Session) {
  const expiredAt = new Date(Date.now() * 7 * 24 * 60 * 60 * 1000); // 7 days

  const session = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d") // If you pass expiredAt as the parameter, it will throw an error telling that TypeError
    .sign(encodedKey);

  (await cookies()).set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiredAt,
    sameSite: "lax",
    path: "/", // You’re telling the browser: Send the session cookie on all paths of this site
  });
}

export async function getSession(): Promise<Session | null> {
  const cookie = (await cookies()).get("session")?.value;
  if (!cookie) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(cookie, encodedKey, {
      algorithms: ["HS256"],
    });

    return payload as Session;
  } catch (err) {
    console.error("Failed to verify the session:", err);
    redirect("/auth/signin");
  }
}

export async function deleteSession() {
  (await cookies()).delete("session");
}
