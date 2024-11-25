"use client";

import LinkedinDisplay from "@/components/library/Analysis/Linkedin/Display";
import LinkedinInsight from "@/components/library/Analysis/Linkedin/Insight";
import { ToastFail } from "@/components/library/Toast";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import useAnalysisContext from "@/contexts/analyses/hooks";
import { useCurrentLocale } from "@/locales/client";
import { getAnalysis } from "@/store/analyses/getAnalysis";
import { Analysis } from "@/store/client/interface/analysis";
import { Info } from "lucide-react";
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
      <div className="flex items-center space-x-4 mb-8">
        <Avatar className="h-28 w-28">
          <AvatarImage src={analysis?.socialAccount?.profilePicture ?? "https://ui.shadcn.com/avatars/01.png"} className="w-full h-full" />
        </Avatar>
        <div>
          <a
            href={`https://www.linkedin.com/in/${analysis?.socialAccount?.username}`}
            target="_blank"
            className="text-2xl font-bold tracking-tight hover:underline"
          >
            {analysis?.socialAccount?.name}
          </a>
          <p className="text-muted-foreground">{analysis?.socialAccount?.headline}</p>
        </div>
      </div>

      {analysis?.socialAccount && <LinkedinInsight socialAccount={analysis?.socialAccount} />}

      <div className="">
        <div className="mt-8">
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-3">
            Top All-Time Publications{" "}
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
          <div className="md:hidden space-y-4 mt-8">
            {analysis?.socialAccount?.topPosts?.map((post, index) => (
              <LinkedinDisplay key={post.uuid} socialAccount={analysis.socialAccount} post={post} index={index + 1} />
            ))}
          </div>

          {/* Vue desktop : two columns */}
          <div className="hidden md:flex gap-4 mt-8">
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
        </>
      </div>
    </>
  );
}
