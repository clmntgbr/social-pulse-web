import { Card, CardContent } from "@/components/ui/card";
import { Publication } from "@/store/client/interface/publication";
import { DateTime } from "luxon";
import Image from "next/image";
import LinkedinBody from "./LinkedinBody";
import LinkedinImage from "./LinkedinImage";

interface LinkedinViewProps {
  publication: Publication;
  isSelected: boolean;
  onSelect: (publication: Publication) => void;
}

export default function LinkedinView({ publication, onSelect, isSelected }: LinkedinViewProps) {
  return (
    <Card
      className={`shadow-none relative text-wrap w-[500px] ${isSelected ? "border-dashed border-gray-400" : ""}`}
      onClick={() => onSelect(publication)}
    >
      <CardContent className="p-6 px-0">
        <div className="flex items-start gap-3 group px-6">
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
                  <a
                    href={`https://www.linkedin.com/in/${publication.socialNetwork?.username}`}
                    className="font-semibold hover:underline"
                    target="_blank"
                  >
                    {publication.socialNetwork?.name}
                  </a>
                </div>
                <p className="text-xs text-gray-400 font-semibold">
                  Publié le {DateTime.fromISO(publication.publishedAt).setZone("UTC").toFormat("dd/MM/yyyy 'à' HH'h'mm")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {publication.content && (
          <div className="mt-4 px-6">
            <LinkedinBody content={publication.content ?? ""} />
          </div>
        )}

        {publication.pictures.length > 0 && (
          <div className="mt-4 px-6">
            <LinkedinImage pictures={publication.pictures ?? []} />
          </div>
        )}

        <div className="flex items-center justify-between text-sm text-gray-500 mt-4 px-6">
          <div className="flex items-center gap-1">
            <Image src={"/images/linkedin/like.svg"} alt="like" width={20} height={20} />
            <span>0</span>
          </div>
          <div className="flex gap-3">
            <span>0 comments</span>
            <span>0 reposts</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
