"use client";

import { SocialNetworksValidateCard } from "@/components/library/SocialNetworks/Validate/SocialNetworksValidateCard";
import { ToastFail } from "@/components/library/Toast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import useSocialNetworksContext from "@/contexts/social-networks/hooks";
import { useCurrentLocale } from "@/locales/client";
import { GetSocialNetworks } from "@/store/client/interface/GetSocialNetworks";
import { getSocialNetworks } from "@/store/social-networks/getSocialNetworks";
import { getSocialNetworksByCode } from "@/store/social-networks/getSocialNetworksByCode";
import { postSocialNetworksValidate } from "@/store/social-networks/postSocialNetworksValidate";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Shield } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

export default function Page({ params }: { params: Promise<{ uuid: string }> }) {
  const { socialNetworksDispatch } = useSocialNetworksContext();
  const { data } = useSession();
  const { uuid } = use(params);
  const [socialNetworks, setSocialNetworks] = useState<GetSocialNetworks | null>(null);
  const [isValidateLoading, setIsValidateLoading] = useState<boolean>(false);
  const [isCancelLoading, setIsCancelLoading] = useState<boolean>(false);
  const [selectedSocialNetworks, setSelectedSocialNetworks] = useState<Set<string>>(new Set());
  const router = useRouter();
  const locale = useCurrentLocale();

  const handleCheckChange = (socialNetworkUuid: string, checked: boolean) => {
    setSelectedSocialNetworks((prev) => {
      const newSet = new Set(prev);
      if (checked) {
        newSet.add(socialNetworkUuid);
      } else {
        newSet.delete(socialNetworkUuid);
      }
      return newSet;
    });
  };

  const handleValidate = () => {
    setIsValidateLoading(true);
    postSocialNetworksValidate(`${data?.accessToken}`, uuid, Array.from(selectedSocialNetworks), socialNetworksDispatch)
      .then(() => {
        getSocialNetworks(`${data?.accessToken}`, socialNetworksDispatch);
        setTimeout(() => {
          setIsValidateLoading(false);
          router.push(`/${locale}`);
        }, 2000);
      })
      .catch(() => {
        setTimeout(() => {
          setIsValidateLoading(false);
          ToastFail("Something went wrong.", "There was a problem with your request.");
        }, 2000);
      });
  };

  const handleCancel = () => {
    setIsCancelLoading(true);
    postSocialNetworksValidate(`${data?.accessToken}`, uuid, [], socialNetworksDispatch)
      .then(() => {
        getSocialNetworks(`${data?.accessToken}`, socialNetworksDispatch);
        setTimeout(() => {
          setIsCancelLoading(false);
          router.push(`/${locale}`);
        }, 2000);
      })
      .catch(() => {
        setTimeout(() => {
          setIsCancelLoading(false);
          router.push(`/${locale}`);
        }, 2000);
      });
  };

  useEffect(() => {
    if (data?.accessToken && uuid) {
      getSocialNetworksByCode(`${data?.accessToken}`, uuid, socialNetworksDispatch).then((response) => {
        setSocialNetworks(response);
      });
    }
  }, [data?.accessToken, socialNetworksDispatch, uuid]);

  return (
    <>
      <main className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-2xl w-full my-8 flex flex-col items-center gap-8">
          <div className="w-full space-y-3 max-h-[500px] overflow-y-auto">
            {socialNetworks && socialNetworks?.length <= 0 && (
              <Card className="w-full p-12 flex flex-col items-center justify-center text-center space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold tracking-tight">No new social networks to validate</h3>
                  <p className="text-sm text-muted-foreground max-w-sm">
                    There are currently no new Facebook social networks available for confirmation. Please check back later or contact support if you
                    believe this is an error.
                  </p>
                </div>
              </Card>
            )}
            {socialNetworks && socialNetworks?.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <Shield className="w-8 h-8 text-blue-600" />
                  <h1 className="text-2xl font-bold text-gray-900">Connect Your Social Networks</h1>
                </div>

                <p className="text-gray-600 mb-4">
                  Select the social network accounts you would like to connect to your profile. You can manage these connections at any time.
                </p>
              </div>
            )}

            {socialNetworks?.map((socialNetwork) => (
              <SocialNetworksValidateCard
                key={socialNetwork.uuid}
                account={socialNetwork}
                checked={selectedSocialNetworks.has(socialNetwork.uuid)}
                onCheckChange={(checked) => handleCheckChange(socialNetwork.uuid, checked)}
              />
            ))}
          </div>

          <div className="flex justify-end w-full gap-4">
            <Button variant="outline" onClick={handleCancel} disabled={isValidateLoading || isCancelLoading}>
              Cancel {isCancelLoading ? <ReloadIcon className="h-7 w-7 animate-spin" /> : <></>}
            </Button>
            <Button disabled={selectedSocialNetworks.size === 0 || isValidateLoading || isCancelLoading} onClick={handleValidate}>
              {selectedSocialNetworks.size === 0
                ? "Select social networks"
                : `Validate ${selectedSocialNetworks.size} ${selectedSocialNetworks.size === 1 ? "social network" : "social networks"}`}
              {isValidateLoading ? <ReloadIcon className="h-7 w-7 animate-spin" /> : <></>}
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
