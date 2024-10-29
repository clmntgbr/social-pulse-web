/* eslint-disable @next/next/no-async-client-component */
// "use client";

import { auth } from "@/auth";

export default async function Page() {
  const session = await auth();

  if (!session || !session.user) {
    return <div>Non connecté</div>;
  }

  return (
    <div>
      <h1>Profil Utilisateur</h1>
      <div>
        <p>Email: {JSON.stringify(session)}</p>
      </div>
    </div>
  );
}
