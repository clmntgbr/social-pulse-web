import { signIn } from "@/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const { email, password } = body;

  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      return NextResponse.json({ error: "Authentification échouée" }, { status: 401 });
    }

    return NextResponse.json({}, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Authentification échouée" }, { status: 401 });
  }
}
