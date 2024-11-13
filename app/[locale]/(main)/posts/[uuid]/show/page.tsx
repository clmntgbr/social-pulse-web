"use client";

import { use } from "react";

export default function Page({ params }: { params: Promise<{ uuid: string }> }) {
  const { uuid } = use(params);

  return (
    <div className="space-y-6 py-10 px-8 pb-16 md:block">
      <p>{uuid}</p>
    </div>
  );
}
