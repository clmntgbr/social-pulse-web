import { GetWorkspace } from "@/store/client/interface/GetWorkspace";
import { GetWorkspaces } from "@/store/client/interface/GetWorkspaces";
import { PostWorkspaces } from "@/store/client/interface/PostWorkspaces";
import {
  SetErrorAction,
  SetHttpInternalServerErrorAction,
  SetNotFoundErrorAction,
} from "../ActionErrorTypes";
import { WorkspacesAction } from "./actions";

// Get Workspaces

export type SetWorkspacesLoadingStartAction = {
  type: WorkspacesAction.WORKSPACES_LOADING_START;
};
export type SetWorkspacesLoadingEndAction = {
  type: WorkspacesAction.WORKSPACES_LOADING_END;
};

export type GetWorkspacesSuccessAction = {
  type: WorkspacesAction.GET_WORKSPACES_SUCCESS;
  payload: GetWorkspaces;
};

export type GetWorkspacesNotFoundAction =
  SetNotFoundErrorAction<WorkspacesAction.GET_WORKSPACES_NOT_FOUND>;

export type GetWorkspacesHttpInternalErrorAction =
  SetHttpInternalServerErrorAction<WorkspacesAction.GET_WORKSPACES_HTTP_INTERNAL_ERROR>;

export type GetWorkspacesErrorAction =
  SetErrorAction<WorkspacesAction.GET_WORKSPACES_ERROR>;

/// Get Workspace

export type GetWorkspaceSuccessAction = {
  type: WorkspacesAction.GET_WORKSPACE_SUCCESS;
  payload: GetWorkspace;
};

export type GetWorkspaceNotFoundAction =
  SetNotFoundErrorAction<WorkspacesAction.GET_WORKSPACE_NOT_FOUND>;

export type GetWorkspaceHttpInternalErrorAction =
  SetHttpInternalServerErrorAction<WorkspacesAction.GET_WORKSPACE_HTTP_INTERNAL_ERROR>;

export type GetWorkspaceErrorAction =
  SetErrorAction<WorkspacesAction.GET_WORKSPACE_ERROR>;

/// Post Workspaces

export type PostWorkspacesSuccessAction = {
  type: WorkspacesAction.POST_WORKSPACES_SUCCESS;
  payload: PostWorkspaces;
};

export type PostWorkspacesNotFoundAction =
  SetNotFoundErrorAction<WorkspacesAction.POST_WORKSPACES_NOT_FOUND>;

export type PostWorkspacesHttpInternalErrorAction =
  SetHttpInternalServerErrorAction<WorkspacesAction.POST_WORKSPACES_HTTP_INTERNAL_ERROR>;

export type PostWorkspacesErrorAction =
  SetErrorAction<WorkspacesAction.POST_WORKSPACES_ERROR>;

export type WorkspacesActionTypes =
  | SetWorkspacesLoadingStartAction
  | SetWorkspacesLoadingEndAction
  | GetWorkspacesSuccessAction
  | GetWorkspacesNotFoundAction
  | GetWorkspacesHttpInternalErrorAction
  | GetWorkspacesErrorAction
  | GetWorkspaceSuccessAction
  | GetWorkspaceNotFoundAction
  | GetWorkspaceHttpInternalErrorAction
  | GetWorkspaceErrorAction
  | PostWorkspacesSuccessAction
  | PostWorkspacesNotFoundAction
  | PostWorkspacesHttpInternalErrorAction
  | PostWorkspacesErrorAction;
