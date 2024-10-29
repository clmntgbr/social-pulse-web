import { auth, AuthUser } from "@/auth";
import SocialPulseClient from "@/store/client/SocialPulseClient";
import { Session } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await auth();
  const client = new SocialPulseClient(data?.accessToken);
  const response = await client.getUser();
  const user = response?.data;

  if (user !== undefined) {
    user.token = data?.accessToken ?? null;
  }

  return NextResponse.json({ user: user, accessToken: data?.accessToken }, { status: 200 });
}

export interface AuthSession extends Session {
  user: AuthUser;
  token: string;
}
