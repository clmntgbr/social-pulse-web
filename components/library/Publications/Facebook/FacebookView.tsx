import { Publication } from "@/store/client/interface/publication";

interface FacebookViewProps {
  publication: Publication;
}

export default function FacebookView({ publication }: FacebookViewProps) {
  return <div>{publication.socialNetwork?.socialNetworkType.name}</div>;
}
