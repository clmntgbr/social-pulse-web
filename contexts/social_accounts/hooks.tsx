import { useContext } from "react";
import { SocialAccountsContext, SocialAccountsContextType } from "./context";

export default function useSocialAccountsContext(): SocialAccountsContextType {
  const socialAccountsContext = useContext(SocialAccountsContext);

  if (socialAccountsContext === undefined) {
    // @ts-expect-error: Log error instead of throw
    return;
  }

  return socialAccountsContext;
}
