import { Publication } from "@/store/client/interface/publication";

interface YoutubeViewProps {
  publication: Publication;
}

export default function YoutubeView({ publication }: YoutubeViewProps) {
  return <div>{publication.socialNetwork?.socialNetworkType.name}</div>;
}
