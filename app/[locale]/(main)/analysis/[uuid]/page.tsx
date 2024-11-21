"use client";

import LinkedinAnalysisHeader from "@/components/library/Analysis/Linkedin/LinkedinAnalysisHeader";
import LinkedinAnalysisInsight from "@/components/library/Analysis/Linkedin/LinkedinAnalysisInsight";
import LinkedinAnalysisPost from "@/components/library/Analysis/Linkedin/LinkedinAnalysisPost";
import { ToastFail } from "@/components/library/Toast";
import { Skeleton } from "@/components/ui/skeleton";
import useAnalysisContext from "@/contexts/analyses/hooks";
import { useCurrentLocale } from "@/locales/client";
import { getAnalysis } from "@/store/analyses/getAnalysis";
import { Analysis } from "@/store/client/interface/analysis";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

const mockTopPosts = [
  {
    id: "1",
    content: "Excited to announce our new product launch! 🚀",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=300",
    likes: 1542,
    comments: 89,
    shares: 245,
    date: "2d ago",
  },
  {
    id: "2",
    content: "Thank you everyone for the amazing support on our journey! 🙏",
    likes: 983,
    comments: 56,
    shares: 124,
    date: "4d ago",
  },
  {
    id: "3",
    content: "Join us for an exclusive webinar on digital transformation",
    image: "https://images.unsplash.com/photo-1591267990532-e5bdb1b0ceb8?w=400&h=300",
    likes: 756,
    comments: 43,
    shares: 89,
    date: "1w ago",
  },
];

const mockRecentPosts = [
  {
    id: "4",
    content: "Just wrapped up an amazing meeting with our global team! 💫",
    likes: 234,
    comments: 12,
    shares: 45,
    date: "2h ago",
  },
  {
    id: "5",
    content: "Check out our latest blog post on industry trends",
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=400&h=300",
    likes: 167,
    comments: 8,
    shares: 23,
    date: "5h ago",
  },
];

const mockInsights = [
  { label: "Avg. Engagement", value: 12.5, change: 2.3 },
  { label: "Reach", value: 45892, change: 5.7 },
  { label: "Impressions", value: 128937, change: -1.2 },
  { label: "Click Rate", value: 3.2, change: 0.8 },
];

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

  return (
    <div className="text-gray-100">
      <div className="mx-auto">
        <LinkedinAnalysisHeader name={analysis?.socialAccount?.name ?? ""} username={analysis?.socialAccount?.username ?? ""} joinDate="January 2020" followers={analysis?.socialAccount?.followerCount?.toString() ?? "~"} posts={342} engagement={4.8} />
      </div>

      <div className="mt-6">
        <LinkedinAnalysisInsight metrics={mockInsights} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <LinkedinAnalysisPost title="Top Posts" posts={mockTopPosts} />
        <LinkedinAnalysisPost title="Recent Posts" posts={mockRecentPosts} />
      </div>
    </div>
  );
}
