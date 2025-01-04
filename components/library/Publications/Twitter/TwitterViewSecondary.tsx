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
      className={`shadow-none relative text-wrap w-[500px] cursor-pointer z-30 ${isSelected ? "border-dashed border-gray-400" : ""}`}
      onClick={() => onSelect(publication)}
    >
      <CardContent className="p-0 pt-4 px-0">
        <div className="flex gap-3 px-4">
          <div className="flex flex-col items-center">
            <div className="flex-shrink-0 w-10">
              <Image
                src={publication.socialNetwork?.avatarUrl ?? "https://ui.shadcn.com/avatars/01.png"}
                width={40}
                height={40}
                alt={publication.socialNetwork?.username ?? ""}
                className="rounded-full object-cover"
              />
            </div>
            <div className="w-0.5 bg-gray-200 grow mt-2"></div>
          </div>

          <div className="flex-grow min-w-0 mb-4">
            <div className="flex items-center gap-2">
              <a
                href={`https://www.linkedin.com/in/${publication.socialNetwork?.username}`}
                className="font-semibold hover:underline break-all"
                target="_blank"
              >
                {publication.socialNetwork?.name}
              </a>
              <p className="text-sm text-gray-400 font-normal break-all">@{publication.socialNetwork?.username}</p>
            </div>
            {publication.content && (
              <div className="mt-2 break-all">
                <TwitterBody content={publication.content ?? ""} />
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
