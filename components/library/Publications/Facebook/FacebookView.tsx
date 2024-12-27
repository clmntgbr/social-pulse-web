import { Card, CardContent } from "@/components/ui/card";
import { Publication } from "@/store/client/interface/publication";
import { Earth } from "lucide-react";
import { DateTime } from "luxon";
import Image from "next/image";
import FacebookBody from "./FacebookBody";

interface FacebookViewProps {
  publication: Publication;
  isSelected: boolean;
  onSelect: (publication: Publication) => void;
}

export default function FacebookView({ publication, onSelect, isSelected }: FacebookViewProps) {
  return (
    <Card
      className={`shadow-none relative text-wrap w-[500px] ${isSelected ? "border-dashed border-gray-400" : ""}`}
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
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs text-gray-400 font-normal">
                    {DateTime.fromISO(new Date().toISOString()).setZone("UTC").toFormat("dd/MM/yyyy 'à' HH'h'mm")}
                  </p>
                  <Earth size={15} strokeWidth={2} className="text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {publication.content && (
          <div className="mt-4 px-4">
            <FacebookBody content={publication.content ?? ""} />
          </div>
        )}

        {publication.pictures.length > 0 && <div className="mt-4 px-4">{/* <FacebookImage pictures={publication.pictures ?? []} /> */}</div>}

        <div className="flex items-center justify-between text-sm text-gray-500 mt-4 px-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center -space-x-1">
              <Image src={"/images/facebook/angry.png"} alt="angry" width={20} height={20} />
              <Image src={"/images/facebook/like.png"} alt="like" width={20} height={20} />
              <Image src={"/images/facebook/love.png"} alt="love" width={20} height={20} />
              <Image src={"/images/facebook/shocked.png"} alt="shocked" width={20} height={20} />
            </div>
            <span>0</span>
          </div>
          <div className="flex gap-3 items-center">
            <span>0 comments</span>
            <span>0 shares</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
