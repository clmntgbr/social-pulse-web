import { useContext } from "react";
import { WorkspacesContext, WorkspacesContextType } from "./context";

export default function useWorkspacesContext(): WorkspacesContextType {
  const workspacesContext = useContext(WorkspacesContext);

  if (workspacesContext === undefined) {
    // @ts-expect-error: Log error instead of throw
    return;
  }

  return workspacesContext;
}
