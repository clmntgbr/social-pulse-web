"use client";

import LinkedinInsight from "@/components/library/Analysis/Linkedin/Insight";
import { ToastFail } from "@/components/library/Toast";
import { Skeleton } from "@/components/ui/skeleton";
import useAnalysisContext from "@/contexts/analyses/hooks";
import { useCurrentLocale } from "@/locales/client";
import { getAnalysis } from "@/store/analyses/getAnalysis";
import { Analysis } from "@/store/client/interface/analysis";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

export default function Page({ params }: { params: Promise<{ uuid: string }> }) {
  const { data } = useSession();
  const { uuid } = use(params);
  const { analysisDispatch } = useAnalysisContext();
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();
  const locale = useCurrentLocale();

  useEffect(() => {
    const fetchAnalysis = async () => {
      if (uuid && data?.accessToken) {
        getAnalysis(`${data?.accessToken}`, uuid, analysisDispatch)
          .then((response) => {
            setIsLoading(false);
            setAnalysis(response.data);
          })
          .catch(() => {
            setIsLoading(false);
            ToastFail(null, "Analysis not found");
            router.push(`/${locale}`);
          });
      }
    };

    fetchAnalysis();
    const interval = setInterval(() => {
      fetchAnalysis();
    }, 5000);

    return () => clearInterval(interval);
  }, [analysisDispatch, data?.accessToken, locale, router, uuid]);

  if (isLoading || analysis?.status === "loading") {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 p-3">
        <Skeleton className="h-[125px] rounded-xl" />
        <Skeleton className="h-[125px] rounded-xl" />
        <Skeleton className="h-[125px] rounded-xl" />
        <Skeleton className="h-[125px] rounded-xl" />
      </div>
    );
  }

  return (
    <>
      <>{analysis?.socialAccount && <LinkedinInsight socialAccount={analysis?.socialAccount} />}</>
    </>
  );
}
