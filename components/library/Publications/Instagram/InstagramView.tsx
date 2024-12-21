import { Publication } from "@/store/client/interface/publication";

interface InstagramViewProps {
  publication: Publication;
}

export default function InstagramView({ publication }: InstagramViewProps) {
  return <div>{publication.socialNetwork?.socialNetworkType.name}</div>;
}
