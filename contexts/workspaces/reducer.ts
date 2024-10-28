import { GetWorkspace } from "@/store/client/interface/GetWorkspace";
import { GetWorkspaces } from "@/store/client/interface/GetWorkspaces";
import { WorkspacesAction } from "./actions";
import { WorkspacesActionTypes } from "./types";

export type WorkspacesState = {
  error: boolean;
  loading: boolean;
  workspaces: GetWorkspaces | null;
  workspace: GetWorkspace | null;
};

export const initialWorkspacesState: WorkspacesState = {
  error: false,
  loading: false,
  workspaces: null,
  workspace: null,
};

export function workspacesReducer(
  state: WorkspacesState,
  action: WorkspacesActionTypes
): WorkspacesState {
  switch (action.type) {
    case WorkspacesAction.WORKSPACES_LOADING_START: {
      return {
        ...state,
        loading: true,
        error: false,
      };
    }

    case WorkspacesAction.WORKSPACES_LOADING_END: {
      return {
        ...state,
        loading: false,
      };
    }

    case WorkspacesAction.GET_WORKSPACES_SUCCESS: {
      return {
        ...state,
        workspaces: action.payload,
      };
    }

    case WorkspacesAction.GET_WORKSPACE_SUCCESS: {
      return {
        ...state,
        workspace: action.payload,
      };
    }

    case WorkspacesAction.GET_WORKSPACES_NOT_FOUND:
    case WorkspacesAction.GET_WORKSPACES_HTTP_INTERNAL_ERROR:
    case WorkspacesAction.GET_WORKSPACES_ERROR:

    case WorkspacesAction.GET_WORKSPACE_NOT_FOUND:
    case WorkspacesAction.GET_WORKSPACE_HTTP_INTERNAL_ERROR:
    case WorkspacesAction.GET_WORKSPACE_ERROR:

    case WorkspacesAction.POST_WORKSPACES_NOT_FOUND:
    case WorkspacesAction.POST_WORKSPACES_HTTP_INTERNAL_ERROR:
    case WorkspacesAction.POST_WORKSPACES_ERROR: {
      return {
        ...state,
        error: true,
        workspaces: state.workspaces,
        workspace: state.workspace,
      };
    }

    default:
      return state;
  }
}
