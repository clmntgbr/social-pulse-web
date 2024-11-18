"use client";

import { Skeleton } from "@/components/ui/skeleton";
import useAnalysisContext from "@/contexts/analyses/hooks";
import { getAnalysis } from "@/store/analyses/getAnalysis";
import { Analysis } from "@/store/client/interface/analysis";
import { useSession } from "next-auth/react";
import { use, useEffect, useState } from "react";

export default function Page({ params }: { params: Promise<{ uuid: string }> }) {
  const { data } = useSession();
  const { uuid } = use(params);
  const { analysisDispatch } = useAnalysisContext();
  const [analysis, setAnalysis] = useState<Analysis | null>(null);

  useEffect(() => {
    const fetchAnalysis = async () => {
      if (uuid && data?.accessToken) {
        const response = await getAnalysis(`${data?.accessToken}`, uuid, analysisDispatch);
        setAnalysis(response.data);
      }
    };

    fetchAnalysis();
    const interval = setInterval(() => {
      fetchAnalysis();
    }, 5000);

    return () => clearInterval(interval);
  }, [analysisDispatch, data?.accessToken, uuid]);

  if (!analysis || analysis.status === "loading") {
    return (
      <div className="flex flex-col space-y-3 items-center justify-center h-full w-[100%]">
        <Skeleton className="h-[125px] w-[60%] rounded-xl bg-gray-200" />
        <div className="flex">
          <div className="flex-1 space-y-2 space-x-2">
            <Skeleton className="h-4 w-[250px] bg-gray-200" />
            <Skeleton className="h-4 w-[200px] bg-gray-200" />
          </div>
          <div className="flex-1 space-y-2 space-x-2">
            <Skeleton className="h-4 w-[250px] bg-gray-200" />
            <Skeleton className="h-4 w-[200px] bg-gray-200" />
          </div>
          <div className="flex-1 space-y-2 space-x-2">
            <Skeleton className="h-4 w-[250px] bg-gray-200" />
            <Skeleton className="h-4 w-[200px] bg-gray-200" />
          </div>
        </div>
      </div>
    );
  }

  return <>ready</>;
}
