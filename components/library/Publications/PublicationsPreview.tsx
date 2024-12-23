import { Button } from "@/components/ui/button";
import { SocialNetworkTypeEnum } from "@/enums/SocialNetworkType";
import { Publication } from "@/store/client/interface/publication";
import { SocialNetwork } from "@/store/client/interface/social-network";
import { Trash2 } from "lucide-react";
import FacebookView from "./Facebook/FacebookView";
import InstagramView from "./Instagram/InstagramView";
import LinkedinView from "./Linkedin/LinkedinView";
import TwitterView from "./Twitter/TwitterView";
import YoutubeView from "./Youtube/YoutubeView";

interface PreviewPanelProps {
  publications: Publication[];
  selected: Publication;
  socialNetwork: SocialNetwork | null;
  onSelect: (publication: Publication) => void;
  onDelete: (publication: Publication) => void;
}

export function PublicationsPreview({ publications, socialNetwork, onSelect, onDelete, selected }: PreviewPanelProps) {
  if (socialNetwork?.socialNetworkType.name === SocialNetworkTypeEnum.LINKEDIN) {
    return (
      <div className="flex flex-col space-y-1 items-center justify-center">
        {publications.map((publication) => (
          <div key={publication.id} className="relative">
            <LinkedinView publication={publication} onSelect={onSelect} isSelected={selected.uuid === publication.uuid && publications.length > 1} />
            {publication.id !== 1 && (
              <Button className="absolute -right-4 z-50 top-1/2 -translate-y-1/2 rounded-full w-8 h-8" onClick={() => onDelete(publication)}>
                <Trash2 size={16} strokeWidth={2.5} />
              </Button>
            )}
          </div>
        ))}
      </div>
    );
  }

  if (socialNetwork?.socialNetworkType.name === SocialNetworkTypeEnum.FACEBOOK) {
    return (
      <div className="flex flex-col space-y-1 items-center justify-center">
        {publications.map((publication) => (
          <FacebookView
            key={publication.id}
            publication={publication}
            onSelect={onSelect}
            isSelected={selected.uuid === publication.uuid && publications.length > 1}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4 items-center justify-center flex">
      {socialNetwork?.socialNetworkType.name === SocialNetworkTypeEnum.TWITTER && <TwitterView publications={publications} />}
      {socialNetwork?.socialNetworkType.name === SocialNetworkTypeEnum.INSTAGRAM && <InstagramView publication={publications[0]} />}
      {socialNetwork?.socialNetworkType.name === SocialNetworkTypeEnum.YOUTUBE && <YoutubeView publication={publications[0]} />}
    </div>
  );
}
