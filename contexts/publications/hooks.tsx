import { useContext } from "react";
import { PublicationsContext, PublicationsContextType } from "./context";

export default function usePublicationsContext(): PublicationsContextType {
  const publicationsContext = useContext(PublicationsContext);

  if (publicationsContext === undefined) {
    // @ts-expect-error: Log error instead of throw
    return;
  }

  return publicationsContext;
}
