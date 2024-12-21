import { Publication } from "@/store/client/interface/publication";

interface TwitterViewProps {
  publications: Publication[];
}

export default function TwitterView({ publications }: TwitterViewProps) {
  return (
    <div>
      <pre>{publications.length}</pre>
    </div>
  );
}
