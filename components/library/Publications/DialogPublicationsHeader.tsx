import useSocialNetworksContext from "@/contexts/social-networks/hooks";
import { SocialNetwork } from "@/store/client/interface/social-network";
import Image from "next/image";
import { useState } from "react";

interface DialogPublicationsHeaderProps {
  onSelectSocialNetwork: (socialNetwork: SocialNetwork) => void;
}

export function DialogPublicationsHeader({ onSelectSocialNetwork }: DialogPublicationsHeaderProps) {
  const { socialNetworks } = useSocialNetworksContext();
  const [selectedSocialNetwork, setSelectedSocialNetwork] = useState<SocialNetwork | null>(null);

  return (
    <header className="h-[70px] w-full flex items-center justify-center">
      <div className="flex items-center gap-2">
        {socialNetworks.socialNetworks?.map((item: SocialNetwork) => (
          <div
            key={item.uuid}
            className="flex items-center relative"
            onClick={() => {
              setSelectedSocialNetwork(item);
              onSelectSocialNetwork(item);
            }}
          >
            <Image
              src={`${item.avatarUrl}`}
              alt={item.username}
              width={100}
              height={100}
              className={`flex-shrink-0 w-14 h-14 rounded-full object-cover overflow-hidden border-4 ${
                selectedSocialNetwork?.uuid === item.uuid ? "border-blue-400" : "border-white"
              }`}
            />
            <Image
              src={`/images/${item.socialNetworkType.name}-logo.png`}
              alt={item.username}
              width={20}
              quality={100}
              height={20}
              className="flex-shrink-0 w-6 h-6 object-cover absolute -bottom-[5px] left-[30px] overflow-hidden border-white border-4 rounded-full"
            />
          </div>
        ))}
      </div>
    </header>
  );
}
