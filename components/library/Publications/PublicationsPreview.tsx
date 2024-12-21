import { SocialNetworkTypeEnum } from "@/enums/SocialNetworkType";
import { Publication } from "@/store/client/interface/publication";
import { SocialNetwork } from "@/store/client/interface/social-network";
import FacebookView from "./Facebook/FacebookView";
import InstagramView from "./Instagram/InstagramView";
import LinkedinView from "./Linkedin/LinkedinView";
import TwitterView from "./Twitter/TwitterView";
import YoutubeView from "./Youtube/YoutubeView";

interface PreviewPanelProps {
  publications: Publication[];
  socialNetwork: SocialNetwork | null;
}

export function PublicationsPreview({ publications, socialNetwork }: PreviewPanelProps) {
  return (
    <div className="space-y-4 items-center justify-center flex">
      {socialNetwork?.socialNetworkType.name === SocialNetworkTypeEnum.LINKEDIN && <LinkedinView publication={publications[0]} />}
      {socialNetwork?.socialNetworkType.name === SocialNetworkTypeEnum.TWITTER && <TwitterView publications={publications} />}
      {socialNetwork?.socialNetworkType.name === SocialNetworkTypeEnum.FACEBOOK && <FacebookView publication={publications[0]} />}
      {socialNetwork?.socialNetworkType.name === SocialNetworkTypeEnum.INSTAGRAM && <InstagramView publication={publications[0]} />}
      {socialNetwork?.socialNetworkType.name === SocialNetworkTypeEnum.YOUTUBE && <YoutubeView publication={publications[0]} />}
    </div>
  );
}
