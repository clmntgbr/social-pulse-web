import { Card, CardContent } from "@/components/ui/card";
import { Post } from "@/store/client/interface/post";
import { SocialAccount } from "@/store/client/interface/social-account";
import { DateTime } from "luxon";
import Image from "next/image";
import LinkedinArticle from "./Article";
import LinkedinBody from "./Body";
import LinkedinDocument from "./Document";
import ExpandableText from "./ExpandableText";
import LinkedinImage from "./Image";

interface Props {
  socialAccount: SocialAccount | null;
  index: number;
  post: Post;
}

export default function LinkedinDisplay({ socialAccount, post, index }: Props) {
  if (!socialAccount) {
    return <></>;
  }

  return (
    <Card className="shadow-none relative text-wrap">
      <CardContent className="p-6 px-0">
        <span className="absolute right-6 top-6 font-sans font-medium text-gray-400">#{index}</span>
        <div className="flex items-start gap-3 group px-6">
          <div className="font-semibold">
            <Image
              src={socialAccount.profilePicture ?? "https://ui.shadcn.com/avatars/01.png"}
              width={100}
              height={100}
              alt={socialAccount.username ?? ""}
              className="w-12 h-12 rounded-full object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <a href={`https://www.linkedin.com/in/${socialAccount.username}`} className="font-semibold hover:underline" target="_blank">
                  {socialAccount?.name}
                </a>
                <p className="text-sm text-gray-400 line-clamp-1">{socialAccount?.headline}</p>
                <p className="text-xs text-gray-300 font-extrabold">
                  Publié le {DateTime.fromISO(post.postAt).setZone("UTC").toFormat("dd/MM/yyyy 'à' HH'h'mm")}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 px-6">
          <ExpandableText>
            <LinkedinBody post={post} />
          </ExpandableText>
        </div>

        <div className="mt-4">
          <LinkedinImage post={post} />
        </div>

        <div className="mt-4">
          <LinkedinArticle post={post} />
        </div>

        <div className="mt-4">
          <LinkedinDocument post={post} />
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500 mt-4 px-6">
          <div className="flex items-center gap-1">
            <Image src={"/images/linkedin/like.svg"} alt="like" width={20} height={20} />
            <span>{post.likeCount ?? 0}</span>
          </div>
          <div className="flex gap-3">
            <span>{post.commentsCount ?? 0} comments</span>
            <span>{post.repostsCount ?? 0} reposts</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
