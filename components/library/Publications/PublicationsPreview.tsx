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
  onSelect: (publication: Publication) => void;
}

export function PublicationsPreview({ publications, socialNetwork, onSelect }: PreviewPanelProps) {
  if (socialNetwork?.socialNetworkType.name === SocialNetworkTypeEnum.LINKEDIN) {
    return (
      <div className="flex flex-col space-y-1 items-center justify-center">
        {publications.map((publication) => (
          <LinkedinView key={publication.id} publication={publication} onSelect={onSelect} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4 items-center justify-center flex">
      {socialNetwork?.socialNetworkType.name === SocialNetworkTypeEnum.TWITTER && <TwitterView publications={publications} />}
      {socialNetwork?.socialNetworkType.name === SocialNetworkTypeEnum.FACEBOOK && <FacebookView publication={publications[0]} />}
      {socialNetwork?.socialNetworkType.name === SocialNetworkTypeEnum.INSTAGRAM && <InstagramView publication={publications[0]} />}
      {socialNetwork?.socialNetworkType.name === SocialNetworkTypeEnum.YOUTUBE && <YoutubeView publication={publications[0]} />}
    </div>
  );
}
