import { useContext } from "react";
import { SocialNetworksContext, SocialNetworksContextType } from "./context";

export default function useSocialNetworksContext(): SocialNetworksContextType {
  const socialNetworksContext = useContext(SocialNetworksContext);

  if (socialNetworksContext === undefined) {
    // @ts-expect-error: Log error instead of throw
    return;
  }

  return socialNetworksContext;
}
