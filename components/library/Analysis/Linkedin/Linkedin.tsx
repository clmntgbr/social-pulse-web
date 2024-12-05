"use client";

import LinkedinChart from "@/components/library/Analysis/Linkedin/Chart";
import LinkedinDisplay from "@/components/library/Analysis/Linkedin/Display";
import LinkedinInsight from "@/components/library/Analysis/Linkedin/Insight";
import { ToastFail } from "@/components/library/Toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import useAnalysisContext from "@/contexts/analyses/hooks";
import { getAnalysesFavorites } from "@/store/analyses/getAnalysesFavorites";
import { postAnalysisToFavorites } from "@/store/analyses/postAnalysisToFavorites";
import { Analysis } from "@/store/client/interface/analysis";
import { GetAnalysisInsights } from "@/store/client/interface/GetAnalysisInsights";
import { Info, Star, StarOff } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

interface Props {
  analysis: Analysis;
  insights: GetAnalysisInsights;
}

export default function Linkedin({ analysis, insights }: Props) {
  const { data } = useSession();
  const { analysisDispatch } = useAnalysisContext();
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const handleClickOnFavorite = async () => {
    setIsFavorite(true);
    postAnalysisToFavorites(`${data?.accessToken}`, { uuid: analysis?.uuid, status: !isFavorite }, analysisDispatch)
      .then(() => {
        getAnalysesFavorites(`${data?.accessToken}`, analysisDispatch);
        setIsFavorite(!isFavorite);
      })
      .catch(() => {
        setIsFavorite(false);
        ToastFail();
      });
  };

  return (
    <>
      <div className="flex items-center space-x-4 mb-8">
        <Avatar className="h-28 w-28 overflow-visible">
          <AvatarImage
            src={analysis?.socialAccount?.profilePicture ?? "https://ui.shadcn.com/avatars/01.png"}
            className="w-full h-full overflow-hidden rounded-full"
          />
        </Avatar>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <a
              href={`https://www.linkedin.com/in/${analysis?.socialAccount?.username}`}
              target="_blank"
              className="text-2xl font-bold tracking-tight hover:underline"
            >
              {analysis?.socialAccount?.name}
            </a>
            <Image
              src={`/images/${analysis?.platform}-logo.png`}
              height={30}
              width={30}
              alt={`/images/${analysis?.socialAccount?.socialAccountType} logo`}
            />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" onClick={handleClickOnFavorite}>
                    {!isFavorite && <Star size={48} strokeWidth={2} />}
                    {isFavorite && <StarOff size={48} color={"#dbca57"} strokeWidth={2} />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add to favorites</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Button variant="outline" className={`${analysis?.socialAccount?.isOpenToWork ? "" : "line-through"}`}>
              Open To Work
            </Button>
          </div>
          <div>{analysis.socialAccount?.headline}</div>
        </div>
      </div>

      {analysis?.socialAccount && <LinkedinInsight analysis={analysis} insights={insights} />}

      <>
        <div className="mt-8 mb-8">
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-3">
            Top Publications
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild className="text-muted-foreground w-5">
                  <Info strokeWidth={1.5} color="#000" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Based on last {analysis?.socialAccount?.postCount} publications</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </h2>
          <p className="text-muted-foreground">Explore the most impactful posts from {analysis?.socialAccount?.name} account’s history !</p>
        </div>

        {analysis?.socialAccount?.topPosts && analysis?.socialAccount?.topPosts.length <= 0 && (
          <>
            <Alert className="mt-8 mb-8" variant="default">
              <AlertDescription>You dont have any publications yet.</AlertDescription>
            </Alert>
          </>
        )}

        <>
          {/* Vue mobile : one column */}
          <div className="lg:hidden md:hidden space-y-4 mt-8 mb-8">
            {analysis?.socialAccount?.topPosts?.map((post, index) => (
              <LinkedinDisplay key={post.uuid} socialAccount={analysis.socialAccount} post={post} index={index + 1} />
            ))}
          </div>

          {/* Vue intermediaire : deux colonnes */}
          <div className="hidden md:flex xl:hidden gap-4 mt-8 mb-8">
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
          <div className="hidden xl:flex gap-4 mt-8 mb-8">
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
        <div className="mt-8 mb-8">
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-3">
            Insights
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild className="text-muted-foreground w-5">
                  <Info strokeWidth={1.5} color="#000" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Based on last {analysis?.socialAccount?.postCount} publications</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </h2>
          <p className="text-muted-foreground">
            Discover {analysis?.socialAccount?.name} highest performing content and key moments from posts history !
          </p>
        </div>
        <LinkedinChart insights={insights} />
      </>
    </>
  );
}
