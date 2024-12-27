import { Card, CardContent } from "@/components/ui/card";
import { Publication } from "@/store/client/interface/publication";
import Image from "next/image";
import TwitterBody from "./TwitterBody";

interface TwitterViewProps {
  publication: Publication;
  isSelected: boolean;
  onSelect: (publication: Publication) => void;
}

export default function TwitterViewSecondary({ publication, onSelect, isSelected }: TwitterViewProps) {
  return (
    <Card
      className={`shadow-none relative text-wrap w-[500px] z-30 ${isSelected ? "border-dashed border-gray-400" : ""}`}
      onClick={() => onSelect(publication)}
    >
      <CardContent className="p-4 px-0">
        <div className="flex items-start gap-3 group px-4">
          <div className="font-semibold">
            <Image
              src={publication.socialNetwork?.avatarUrl ?? "https://ui.shadcn.com/avatars/01.png"}
              width={100}
              height={100}
              alt={publication.socialNetwork?.username ?? ""}
              className="w-12 h-12 rounded-full object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center flex-row gap-3">
              <div className="flex gap-4">
                <a
                  href={`https://www.linkedin.com/in/${publication.socialNetwork?.username}`}
                  className="font-semibold hover:underline"
                  target="_blank"
                >
                  {publication.socialNetwork?.name}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-400 font-normal">@{publication.socialNetwork?.username}</p>
              </div>
            </div>
          </div>
        </div>

        {publication.content && (
          <div className="mt-4 px-4">
            <TwitterBody content={publication.content ?? ""} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
