"use client";

import { Capitalize } from "@/components/Capitalize";
import SocialButton from "@/components/library/Home/SocialButton";
import { ToastFail } from "@/components/library/Toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useAnalysisContext from "@/contexts/analyses/hooks";
import { useCurrentLocale } from "@/locales/client";
import { getAnalysesRecents } from "@/store/analyses/getAnalysesRecents";
import { postAnalyses } from "@/store/analyses/postAnalysis";
import { ReloadIcon } from "@radix-ui/react-icons";
import { BarChart2, Search } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const { data } = useSession();
  const { analysis, analysisDispatch } = useAnalysisContext();
  const locale = useCurrentLocale();
  const searchParams = useSearchParams();
  const platform = searchParams.get("platform");
  const [username, setUsername] = useState("");
  const router = useRouter();
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [selectedPlatformColor, setSelectedPlatformColor] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCreateAnalysis = () => {
    setIsLoading(true);
    postAnalyses(`${data?.accessToken}`, { username: encodeURI(username), platform }, analysisDispatch)
      .then((response) => {
        getAnalysesRecents(`${data?.accessToken}`, analysisDispatch);
        setTimeout(() => {
          setIsLoading(false);
          router.push(`/${locale}/analysis/${response.data?.uuid}`);
        }, 2000);
      })
      .catch((error) => {
        setTimeout(() => {
          setIsLoading(false);
          ToastFail("Something went wrong.", error.message ?? "There was a problem with your request.");
        }, 2000);
      });
  };

  useEffect(() => {
    const getColorById = (id: string) => {
      const platform = analysis.platforms.find((p) => p.id === id);
      return platform ? platform.color : null;
    };

    if (!platform) {
      router.push(`?platform=linkedin`);
    }

    if (platform) {
      setSelectedPlatform(`${platform}`);
      setSelectedPlatformColor(getColorById(platform));
    }
  }, [analysis.platforms, platform, router]);

  return (
    <>
      <div className=" h-full">
        <div className="relative h-full flex items-center justify-center p-4">
          <div className="w-full max-w-3xl">
            <div className="text-center space-y-5">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-3 bg-blue-600  dark:bg-gray-100 px-4 py-2 rounded-md">
                  <BarChart2 className="w-5 h-5 text-white dark:text-blue-600" />
                  <span className="text-sm font-semibold text-white dark:text-blue-600">Social Media Analytics</span>
                </div>

                <h1 className="text-6xl font-extrabold  tracking-tight dark:text-gray-100 text-gray-700">
                  Analysez les profils
                  <br />
                  <span style={{ color: selectedPlatformColor ?? "#fff" }}>{Capitalize(`${platform}`)} avec précision</span>
                </h1>
                <p className="text-xl dark:text-gray-100 text-gray-700 font-bold max-w-2xl mx-auto">
                  Découvrez des insights détaillés et analysez les tendances à partir des données sociales
                </p>
              </div>

              <div className="backdrop-blur-lg rounded-2xl p-8">
                <div className="flex justify-center gap-3 mb-8">
                  {analysis.platforms &&
                    analysis.platforms.map((platform) => (
                      <SocialButton
                        key={platform.id}
                        icon={platform.icon}
                        label={platform.label}
                        isSelected={selectedPlatform === platform.id}
                        onClick={() => {
                          setSelectedPlatform(platform.id);
                          router.push(`?platform=${platform.id}`);
                        }}
                      />
                    ))}
                </div>

                <div className="flex items-stretch gap-2">
                  <div className="flex-1">
                    <Input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Entrez un nom d'utilisateur"
                      className="w-full h-14 px-6 border-2 focus:border-blue-600 focus-visible:ring-0 outline-none transition-all text-lg"
                      required
                    />
                  </div>

                  <Button
                    onClick={handleCreateAnalysis}
                    className="h-14 w-14 flex items-center justify-center hover:bg-blue-500 bg-blue-600 text-white"
                    disabled={!username || !selectedPlatform || isLoading}
                    type="submit"
                    variant="default"
                  >
                    {isLoading ? <ReloadIcon className="w-6 h-6 animate-spin" /> : <Search className="w-6 h-6" />}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
