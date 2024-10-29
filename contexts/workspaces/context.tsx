"use client";

import { AuthSession } from "@/app/api/auth/session/route";
import { getWorkspace } from "@/store/workspaces/getWorkspace";
import { getWorkspaces } from "@/store/workspaces/getWorkspaces";
import { useSession } from "next-auth/react";
import React, { createContext, Dispatch, PropsWithChildren, useEffect, useReducer } from "react";
import { initialWorkspacesState, workspacesReducer, WorkspacesState } from "./reducer";
import { WorkspacesActionTypes } from "./types";

export type WorkspacesContextType = {
  workspaces: WorkspacesState;
  workspacesDispatch: Dispatch<WorkspacesActionTypes>;
};

export const WorkspacesContext = createContext<WorkspacesContextType | undefined>(undefined);

export const WorkspacesProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [workspaces, workspacesDispatch] = useReducer(workspacesReducer, initialWorkspacesState);
  const { data: session } = useSession();

  useEffect(() => {
    if (process.env.NODE_ENV === "development" && typeof window !== "undefined") {
      (window as { workspacesDispatch?: Dispatch<WorkspacesActionTypes> }).workspacesDispatch = workspacesDispatch;
    }
  }, [workspacesDispatch]);

  useEffect(() => {
    const fetchWorkspaces = async () => {
      if (session !== undefined && session !== null) {
        await getWorkspaces((session as AuthSession).token, workspacesDispatch);
        await getWorkspace((session as AuthSession).token, workspacesDispatch);
      }
    };

    fetchWorkspaces();
  }, [session]);

  return <WorkspacesContext.Provider value={{ workspaces, workspacesDispatch }}>{children}</WorkspacesContext.Provider>;
};
