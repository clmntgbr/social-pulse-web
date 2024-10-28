"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export function User() {
  return (
    <>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </>
  );
}
