"use client";

import Instagram from "@/components/library/Analysis/Insagram/Instagram";
import Linkedin from "@/components/library/Analysis/Linkedin/Linkedin";
import { ToastFail } from "@/components/library/Toast";
import { Skeleton } from "@/components/ui/skeleton";
import useAnalysisContext from "@/contexts/analyses/hooks";
import { PlatformEnum } from "@/enums/Platform";
import { useCurrentLocale } from "@/locales/client";
import { getAnalysis } from "@/store/analyses/getAnalysis";
import { getAnalysisInsights } from "@/store/analyses/getAnalysisInsights";
import { Analysis } from "@/store/client/interface/analysis";
import { GetAnalysisInsights } from "@/store/client/interface/GetAnalysisInsights";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { use, useCallback, useEffect, useState } from "react";

export default function Page({ params }: { params: Promise<{ uuid: string }> }) {
  const { data } = useSession();
  const { uuid } = use(params);
  const { analysisDispatch } = useAnalysisContext();
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [insights, setInsights] = useState<GetAnalysisInsights | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();
  const locale = useCurrentLocale();

  const fetchAnalysis = useCallback(async () => {
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
  }, [analysisDispatch, data?.accessToken, locale, router, uuid]);

  const fetchAnalysisInsights = useCallback(async () => {
    if (uuid && data?.accessToken) {
      getAnalysisInsights(`${data?.accessToken}`, uuid, analysisDispatch).then((response) => {
        setInsights(response.data);
      });
    }
  }, [analysisDispatch, data?.accessToken, uuid]);

  useEffect(() => {
    fetchAnalysis();
    fetchAnalysisInsights();
    const interval = setInterval(() => {
      fetchAnalysis();
      fetchAnalysisInsights();
    }, 5000);

    return () => clearInterval(interval);
  }, [analysisDispatch, fetchAnalysis, fetchAnalysisInsights, uuid, analysis?.status]);

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
      {analysis && insights && (
        <>
          {analysis.platform === PlatformEnum.LINKEDIN && <Linkedin analysis={analysis} insights={insights} />}
          {analysis.platform === PlatformEnum.INSTAGRAM && <Instagram analysis={analysis} insights={insights} />}
          {analysis.platform === PlatformEnum.FACEBOOK && <></>}
          {analysis.platform === PlatformEnum.TWITTER && <></>}
          {analysis.platform === PlatformEnum.YOUTUBE && <></>}
        </>
      )}
    </>
  );
}
