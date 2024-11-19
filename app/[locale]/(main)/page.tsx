"use client";

import { Capitalize } from "@/components/Capitalize";
import SocialButton from "@/components/library/Home/SocialButton";
import { ToastFail } from "@/components/library/Toast";
import { Platforms } from "@/components/Platforms";
import { Button } from "@/components/ui/button";
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
  const { analysisDispatch } = useAnalysisContext();
  const locale = useCurrentLocale();
  const searchParams = useSearchParams();
  const platform = searchParams.get("platform");
  const [username, setUsername] = useState("");
  const router = useRouter();
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
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
    if (!platform) {
      router.push(`?platform=linkedin`);
    }

    if (platform) {
      setSelectedPlatform(`${platform}`);
    }
  }, [platform, router]);

  return (
    <>
      <div className=" h-full">
        <div className="relative h-full flex items-center justify-center p-4">
          <div className="w-full max-w-3xl">
            <div className="text-center space-y-5">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-3 bg-indigo-50 px-4 py-2 rounded-full">
                  <BarChart2 className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-semibold text-blue-600">Social Media Analytics</span>
                </div>

                <h1 className="text-6xl font-extrabold text-gray-900 tracking-tight">
                  Analysez les profils
                  <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-sky-600">{Capitalize(`${platform}`)} avec précision</span>
                </h1>
                <p className="text-xl text-gray-600 font-bold font-sans max-w-2xl mx-auto">Découvrez des insights détaillés et analysez les tendances à partir des données sociales</p>
              </div>

              <div className="backdrop-blur-lg rounded-2xl p-8">
                <div className="flex justify-center gap-3 mb-8">
                  {Platforms.map((platform) => (
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
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Entrez un nom d'utilisateur"
                      className="w-full h-14 px-6 rounded-xl border-2 border-blue-100 focus:border-blue-100 focus:ring-1 focus:ring-indigo-100 outline-none transition-all text-lg bg-white/80"
                      required
                    />
                  </div>

                  <Button onClick={handleCreateAnalysis} className="h-14 w-14 rounded-xl flex items-center justify-center" disabled={!username || !selectedPlatform} type="submit" variant="default">
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
