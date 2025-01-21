"use client";

import { PublicationsPreview } from "@/components/library/Publications/PublicationsPreview";
import { ToastFail } from "@/components/library/Toast";
import usePublicationsContext from "@/contexts/publications/hooks";
import { GetPublication } from "@/store/client/interface/GetPublication";
import { Publication } from "@/store/client/interface/publication";
import { SocialNetwork } from "@/store/client/interface/social-network";
import { getPublication } from "@/store/publications/getPublication";
import { useSession } from "next-auth/react";
import { Fragment, use, useEffect, useState } from "react";

export default function Page({ params }: { params: Promise<{ uuid: string }> }) {
  const { publicationsDispatch } = usePublicationsContext();
  const { uuid } = use(params);
  const { data } = useSession();
  const [publications, setPublications] = useState<GetPublication>([]);
  const [socialNetwork, setSocialNetwork] = useState<SocialNetwork | null>(null);

  useEffect(() => {
    if (data?.accessToken && uuid) {
      getPublication(`${data?.accessToken}`, uuid, publicationsDispatch)
        .then((data) => {
          setPublications(data);
          if (data && data[0] && data[0].socialNetwork) {
            setSocialNetwork(data[0].socialNetwork);
          }
        })
        .catch(() => {
          ToastFail();
        });
    }
  }, [data?.accessToken, publicationsDispatch, uuid]);

  const handleOnDelete = (publication: Publication) => {
    console.log(publication);
  };
  const handlePublicationSelect = (selectedPublication: Publication) => {
    console.log(selectedPublication);
  };

  return (
    <div className="flex-1 flex gap-4" style={{ height: "calc(100vh - 4rem)" }}>
      <div className="w-1/2 h-full">
        <div className="h-full flex flex-col">
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex-1 min-h-0">{JSON.stringify(publications)}</div>
          </div>
        </div>
      </div>

      <div className="w-1/2 bg-gray-100 dark:bg-secondary p-4 border overflow-y-auto custom-scrollbar">
        {publications && socialNetwork && (
          <Fragment key={crypto.randomUUID()}>
            <PublicationsPreview
              onDelete={handleOnDelete}
              selected={null}
              publications={publications}
              socialNetwork={socialNetwork}
              onSelect={handlePublicationSelect}
            />
          </Fragment>
        )}
      </div>
    </div>
  );
}
