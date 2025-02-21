import { Card, CardContent } from "@/components/ui/card";
import { Publication } from "@/store/client/interface/publication";
import Image from "next/image";
import Link from "next/link";
import TwitterAction from "./TwitterAction";
import TwitterBody from "./TwitterBody";
import TwitterImage from "./TwitterImage";

interface TwitterViewProps {
  publication: Publication;
  isSelected: boolean;
  onSelect: (publication: Publication) => void;
}

export default function TwitterViewPrimary({ publication, onSelect, isSelected }: TwitterViewProps) {
  return (
    <Card
      className={`shadow-none relative text-wrap w-[500px] z-30 ${isSelected ? "border-dashed border-gray-400" : ""}`}
      onClick={() => onSelect(publication)}
    >
      <CardContent className="p-4 px-0 cursor-default">
        <Link
          className="flex items-start gap-3 group px-4 cursor-pointer"
          href={`https://x.com/${publication.socialNetwork?.username}`}
          target="_blank"
        >
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
            <div className="flex items-center justify-between">
              <div>
                <div className="flex gap-4">
                  <p className="font-semibold hover:underline">{publication.socialNetwork?.name}</p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-gray-400 font-normal">@{publication.socialNetwork?.username}</p>
                </div>
              </div>
            </div>
          </div>
        </Link>

        {publication.content && (
          <div className="mt-2 px-4">
            <TwitterBody content={publication.content ?? ""} />
          </div>
        )}

        {publication.pictures.length > 0 && (
          <div className="mt-4 px-4">
            <TwitterImage pictures={publication.pictures ?? []} />
          </div>
        )}

        <TwitterAction />
      </CardContent>
    </Card>
  );
}
