"use client";

import { ToastFail } from "@/components/library/Toast";
import usePublicationsContext from "@/contexts/publications/hooks";
import { GetPublication } from "@/store/client/interface/GetPublication";
import { getPublication } from "@/store/publications/getPublication";
import { useSession } from "next-auth/react";
import { use, useEffect, useState } from "react";

export default function Page({ params }: { params: Promise<{ uuid: string }> }) {
  const { publicationsDispatch } = usePublicationsContext();
  const { uuid } = use(params);
  const { data } = useSession();
  const [publication, setPublication] = useState<GetPublication>([]);

  useEffect(() => {
    if (data?.accessToken && uuid) {
      getPublication(`${data?.accessToken}`, uuid, publicationsDispatch)
        .then((data) => {
          setPublication(data);
        })
        .catch(() => {
          ToastFail();
        });
    }
  }, [data?.accessToken, publicationsDispatch, uuid]);

  return <pre className="whitespace-pre-wrap overflow-auto text-sm"> {publication && JSON.stringify(publication, null, 2)}</pre>;
}
