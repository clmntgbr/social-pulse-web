import { useContext } from "react";
import { OrganizationsContext, OrganizationsContextType } from "./context";

export default function useOrganizationsContext(): OrganizationsContextType {
  const organizationsContext = useContext(OrganizationsContext);

  if (organizationsContext === undefined) {
    // @ts-expect-error: Log error instead of throw
    return;
  }

  return organizationsContext;
}
