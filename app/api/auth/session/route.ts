import { auth, AuthUser } from "@/auth";
import SocialPulseClient from "@/store/client/SocialPulseClient";
import { Session } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await auth();
  const token = (data?.user as AuthUser)?.token;
  const client = new SocialPulseClient(token);
  const response = await client.getUser();
  return NextResponse.json({ user: response?.data, token: token } as unknown as AuthSession, { status: 200 });
}

export interface AuthSession extends Session {
  user: AuthUser;
  token: string;
}
