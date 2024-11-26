"use client";

import LinkedinDisplay from "@/components/library/Analysis/Linkedin/Display";
import LinkedinInsight from "@/components/library/Analysis/Linkedin/Insight";
import { ToastFail } from "@/components/library/Toast";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import useAnalysisContext from "@/contexts/analyses/hooks";
import { useCurrentLocale } from "@/locales/client";
import { getAnalysesFavorites } from "@/store/analyses/getAnalysesFavorites";
import { getAnalysis } from "@/store/analyses/getAnalysis";
import { getAnalysisInsights } from "@/store/analyses/getAnalysisInsights";
import { postAnalysisToFavorites } from "@/store/analyses/postAnalysisToFavorites";
import { Analysis } from "@/store/client/interface/analysis";
import { Insight } from "@/store/client/interface/insight";
import { Info, Star, StarOff } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { use, useCallback, useEffect, useState } from "react";

export default function Page({ params }: { params: Promise<{ uuid: string }> }) {
  const { data } = useSession();
  const { uuid } = use(params);
  const { analysisDispatch } = useAnalysisContext();
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [insights, setInsights] = useState<Insight[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const router = useRouter();
  const locale = useCurrentLocale();

  const fetchAnalysis = useCallback(async () => {
    if (uuid && data?.accessToken) {
      getAnalysis(`${data?.accessToken}`, uuid, analysisDispatch)
        .then((response) => {
          setIsLoading(false);
          setAnalysis(response.data);
          setIsFavorite(response.data?.isFavorite ?? false);
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
    }, 5000);

    return () => clearInterval(interval);
  }, [analysisDispatch, fetchAnalysis, fetchAnalysisInsights, uuid]);

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

  const handleClickOnFavorite = async () => {
    setIsFavorite(true);
    postAnalysisToFavorites(`${data?.accessToken}`, { uuid: analysis?.uuid, status: !isFavorite }, analysisDispatch)
      .then(() => {
        fetchAnalysis();
        getAnalysesFavorites(`${data?.accessToken}`, analysisDispatch);
      })
      .catch(() => {
        setIsFavorite(false);
        ToastFail();
      });
  };

  return (
    <>
      <div className="flex items-center space-x-4 mb-8">
        <Avatar className="h-28 w-28">
          <AvatarImage src={analysis?.socialAccount?.profilePicture ?? "https://ui.shadcn.com/avatars/01.png"} className="w-full h-full" />
        </Avatar>
        <div>
          <div className=" flex items-center gap-3">
            <a
              href={`https://www.linkedin.com/in/${analysis?.socialAccount?.username}`}
              target="_blank"
              className="text-2xl font-bold tracking-tight hover:underline"
            >
              {analysis?.socialAccount?.name}{" "}
            </a>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" onClick={handleClickOnFavorite}>
                    {!isFavorite && <Star size={48} color={"#fff"} strokeWidth={2} />}
                    {isFavorite && <StarOff size={48} color={"#dbca57"} strokeWidth={2} />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add to favorites</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <p className="text-muted-foreground">{analysis?.socialAccount?.headline}</p>
        </div>
      </div>

      {analysis?.socialAccount && <LinkedinInsight analysis={analysis} insights={insights ?? []} />}

      <>
        <div className="mt-8">
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-3">
            Top All-Time Publications
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild className="text-muted-foreground w-5">
                  <Info strokeWidth={3} />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Based on last {analysis?.socialAccount?.postCount} publications</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </h2>
          <p className="text-muted-foreground">Explore the most impactful posts from your account’s history!</p>
        </div>
        <>
          {/* Vue mobile : one column */}
          <div className="lg:hidden md:hidden space-y-4 mt-8">
            {analysis?.socialAccount?.topPosts?.map((post, index) => (
              <LinkedinDisplay key={post.uuid} socialAccount={analysis.socialAccount} post={post} index={index + 1} />
            ))}
          </div>

          {/* Vue intermediaire : deux colonnes */}
          <div className="hidden md:flex xl:hidden gap-4 mt-8">
            <div className="flex-1 space-y-4">
              {analysis?.socialAccount?.topPosts
                ?.filter((_, index) => index % 2 === 0)
                .map((post, index) => (
                  <LinkedinDisplay key={post.uuid} socialAccount={analysis.socialAccount} post={post} index={index * 2 + 1} />
                ))}
            </div>
            <div className="flex-1 space-y-4">
              {analysis?.socialAccount?.topPosts
                ?.filter((_, index) => index % 2 === 1)
                .map((post, index) => (
                  <LinkedinDisplay key={post.uuid} socialAccount={analysis.socialAccount} post={post} index={index * 2 + 2} />
                ))}
            </div>
          </div>

          {/* Vue desktop : trois colonnes */}
          <div className="hidden xl:flex gap-4 mt-8">
            <div className="flex-1 space-y-4">
              {analysis?.socialAccount?.topPosts
                ?.filter((_, index) => index % 3 === 0)
                .map((post, index) => (
                  <LinkedinDisplay key={post.uuid} socialAccount={analysis.socialAccount} post={post} index={index * 3 + 1} />
                ))}
            </div>
            <div className="flex-1 space-y-4">
              {analysis?.socialAccount?.topPosts
                ?.filter((_, index) => index % 3 === 1)
                .map((post, index) => (
                  <LinkedinDisplay key={post.uuid} socialAccount={analysis.socialAccount} post={post} index={index * 3 + 2} />
                ))}
            </div>
            <div className="flex-1 space-y-4">
              {analysis?.socialAccount?.topPosts
                ?.filter((_, index) => index % 3 === 2)
                .map((post, index) => (
                  <LinkedinDisplay key={post.uuid} socialAccount={analysis.socialAccount} post={post} index={index * 3 + 3} />
                ))}
            </div>
          </div>
        </>
      </>

      <>
        <div className="mt-8">
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-3">All Publications</h2>
          <p className="text-muted-foreground">Explore the most impactful posts from your account’s history!</p>
        </div>
        <>
          {/* Vue mobile : one column */}
          <div className="2xl:hidden space-y-4 mt-8">
            {analysis?.socialAccount?.posts?.map((post, index) => (
              <LinkedinDisplay key={post.uuid} socialAccount={analysis.socialAccount} post={post} index={index + 1} />
            ))}
          </div>

          {/* Vue desktop : three columns */}
          <div className="hidden 2xl:flex gap-4 mt-8">
            <div className="flex-1 space-y-4">
              {analysis?.socialAccount?.posts
                ?.filter((_, index) => index % 3 === 0)
                .map((post, index) => (
                  <LinkedinDisplay key={post.uuid} socialAccount={analysis.socialAccount} post={post} index={index * 3 + 1} />
                ))}
            </div>
            <div className="flex-1 space-y-4">
              {analysis?.socialAccount?.posts
                ?.filter((_, index) => index % 3 === 1)
                .map((post, index) => (
                  <LinkedinDisplay key={post.uuid} socialAccount={analysis.socialAccount} post={post} index={index * 3 + 2} />
                ))}
            </div>
            <div className="flex-1 space-y-4">
              {analysis?.socialAccount?.posts
                ?.filter((_, index) => index % 3 === 2)
                .map((post, index) => (
                  <LinkedinDisplay key={post.uuid} socialAccount={analysis.socialAccount} post={post} index={index * 3 + 3} />
                ))}
            </div>
          </div>
        </>
      </>
    </>
  );
}
