"use client";

import { ToastFail } from "@/components/library/Toast";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import useAnalysisContext from "@/contexts/analyses/hooks";
import { getAnalysesFavorites } from "@/store/analyses/getAnalysesFavorites";
import { postAnalysisToFavorites } from "@/store/analyses/postAnalysisToFavorites";
import { Analysis } from "@/store/client/interface/analysis";
import { GetAnalysisInsights } from "@/store/client/interface/GetAnalysisInsights";
import { Star, StarOff } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import InstagramInsight from "./Insight";

interface Props {
  analysis: Analysis;
  insights: GetAnalysisInsights;
}

export default function Instagram({ analysis, insights }: Props) {
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
              href={`https://www.instagram.com/${analysis?.socialAccount?.username}`}
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
          </div>
          <div>{analysis.socialAccount?.headline}</div>
        </div>
      </div>

      {analysis?.socialAccount && <InstagramInsight analysis={analysis} insights={insights} />}
    </>
  );
}
