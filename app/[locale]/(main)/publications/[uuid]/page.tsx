"use client";

import { use } from "react";

export default function Page({ params }: { params: Promise<{ uuid: string }> }) {
  const { uuid } = use(params);
  return <>{uuid}</>;
}
