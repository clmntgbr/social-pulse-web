import { GetWorkspace } from "@/store/client/interface/GetWorkspace";
import { GetWorkspaces } from "@/store/client/interface/GetWorkspaces";
import {
  SetErrorAction,
  SetHttpInternalServerErrorAction,
  SetNotFoundErrorAction,
} from "../ActionErrorTypes";
import { UserAction } from "./actions";

export type SetWorkspacesLoadingStartAction = {
  type: UserAction.USER_LOADING_START;
};
export type SetWorkspacesLoadingEndAction = {
  type: UserAction.USER_LOADING_END;
};

export type GetWorkspacesSuccessAction = {
  type: UserAction.GET_WORKSPACES_SUCCESS;
  payload: GetWorkspaces;
};

export type GetWorkspacesNotFoundAction =
  SetNotFoundErrorAction<UserAction.GET_WORKSPACES_NOT_FOUND>;

export type GetWorkspacesHttpInternalErrorAction =
  SetHttpInternalServerErrorAction<UserAction.GET_WORKSPACES_HTTP_INTERNAL_ERROR>;

export type GetWorkspacesErrorAction =
  SetErrorAction<UserAction.GET_WORKSPACES_ERROR>;

///

export type GetWorkspaceSuccessAction = {
  type: UserAction.GET_WORKSPACE_SUCCESS;
  payload: GetWorkspace;
};

export type GetWorkspaceNotFoundAction =
  SetNotFoundErrorAction<UserAction.GET_WORKSPACE_NOT_FOUND>;

export type GetWorkspaceHttpInternalErrorAction =
  SetHttpInternalServerErrorAction<UserAction.GET_WORKSPACE_HTTP_INTERNAL_ERROR>;

export type GetWorkspaceErrorAction =
  SetErrorAction<UserAction.GET_WORKSPACE_ERROR>;

export type UserActionTypes =
  | SetWorkspacesLoadingStartAction
  | SetWorkspacesLoadingEndAction
  | GetWorkspacesSuccessAction
  | GetWorkspacesNotFoundAction
  | GetWorkspacesHttpInternalErrorAction
  | GetWorkspacesErrorAction
  | GetWorkspaceSuccessAction
  | GetWorkspaceNotFoundAction
  | GetWorkspaceHttpInternalErrorAction
  | GetWorkspaceErrorAction;
