"use client";

import { TwitterChild } from "@/components/library/(twitter)/TwitterChild";
import { TwitterParent } from "@/components/library/(twitter)/TwitterParent";
import { Error } from "@/components/library/Error";
import usePostsContext from "@/contexts/posts/hooks";
import useSocialAccountsContext from "@/contexts/social_accounts/hooks";
import { Post } from "@/store/client/interface/post";
import { getPost } from "@/store/posts/getPost";
import { useSession } from "next-auth/react";
import { use, useEffect, useState } from "react";

export default function Page({ params }: { params: Promise<{ uuid: string }> }) {
  const { uuid } = use(params);
  const { data: session } = useSession();
  const { posts, postsDispatch } = usePostsContext();
  const { socialAccounts, socialAccountsDispatch } = useSocialAccountsContext();
  const [twitterParent, setTwitterParent] = useState<Post | null>(null);
  const [twitterChilds, setTwitterChilds] = useState<Post[] | null>(null);
  const [noAccess, setNoAccess] = useState(false);

  useEffect(() => {
    if (session?.accessToken && socialAccounts.socialAccounts?.member) {
      getPost(`${session?.accessToken}`, uuid, postsDispatch).then((response) => {
        if (response.data && response.data) {
          setTwitterParent(response.data);

          if (!socialAccounts.socialAccounts?.member.find((member) => member.uuid === response.data?.socialAccount.uuid)) {
            setNoAccess(true);
            return;
          }

          if (response.data.children) {
            setTwitterChilds(response.data.children);
          }

          setNoAccess(false);
        }
      });
    }
  }, [uuid, postsDispatch, session?.accessToken, socialAccountsDispatch, socialAccounts, twitterParent?.socialAccount.uuid]);

  if (!posts.post) {
    return null;
  }

  if (noAccess) {
    return <Error label="error.post_not_found" />;
  }

  return (
    <div className="m-auto py-4">
      {twitterParent?.socialAccount.socialAccountType === "twitter_social_account" && twitterParent && (
        <>
          <TwitterParent post={twitterParent} />
          {twitterChilds && twitterChilds.map((post: Post) => <TwitterChild post={post} key={post.uuid} />)}
        </>
      )}
    </div>
  );
}
