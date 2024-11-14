import { useContext } from "react";
import { PostsContext, PostsContextType } from "./context";

export default function usePostsContext(): PostsContextType {
  const socialAccountsContext = useContext(PostsContext);

  if (socialAccountsContext === undefined) {
    // @ts-expect-error: Log error instead of throw
    return;
  }

  return socialAccountsContext;
}
