"use client";

import { useSession } from "next-auth/react";

export default function Page() {
  // const { user } = useUserContext();
  const { data: session } = useSession();

  // return <>{JSON.stringify(user)}</>;
  return <>{JSON.stringify(session)}</>;
}
