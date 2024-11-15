import { auth, AuthUser } from "@/auth";
import ApiClient from "@/store/client/ApiClient";
import { Session } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await auth();

  const client = new ApiClient(data?.accessToken);
  const response = await client.getUser();
  const user = response?.data;

  if (user) {
    user.id = user?.uuid;
  }

  return NextResponse.json({ user: response?.data, accessToken: data?.accessToken }, { status: 200 });
}

export interface AuthSession extends Session {
  user: AuthUser;
  token: string;
}
