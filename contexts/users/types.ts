import { GetSocialAccounts } from "@/store/client/interface/GetSocialAccounts";
import { GetUser } from "@/store/client/interface/GetUser";
import { GetWorkspace } from "@/store/client/interface/GetWorkspace";
import { GetWorkspaces } from "@/store/client/interface/GetWorkspaces";
import {
  SetErrorAction,
  SetHttpInternalServerErrorAction,
  SetNotFoundErrorAction,
} from "../ActionErrorTypes";
import { UserAction } from "./actions";

// Get Workspaces

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

/// Get Workspace

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

/// Get Social Accounts

export type GetSocialAccountsSuccessAction = {
  type: UserAction.GET_SOCIAL_ACCOUNTS_SUCCESS;
  payload: GetSocialAccounts;
};

export type GetSocialAccountsNotFoundAction =
  SetNotFoundErrorAction<UserAction.GET_SOCIAL_ACCOUNTS_NOT_FOUND>;

export type GetSocialAccountsHttpInternalErrorAction =
  SetHttpInternalServerErrorAction<UserAction.GET_SOCIAL_ACCOUNTS_HTTP_INTERNAL_ERROR>;

export type GetSocialAccountsErrorAction =
  SetErrorAction<UserAction.GET_SOCIAL_ACCOUNTS_ERROR>;

/// Get User

export type GetUserSuccessAction = {
  type: UserAction.GET_USER_SUCCESS;
  payload: GetUser;
};

export type GetUserNotFoundAction =
  SetNotFoundErrorAction<UserAction.GET_USER_NOT_FOUND>;

export type GetUserHttpInternalErrorAction =
  SetHttpInternalServerErrorAction<UserAction.GET_USER_HTTP_INTERNAL_ERROR>;

export type GetUserErrorAction = SetErrorAction<UserAction.GET_USER_ERROR>;

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
  | GetWorkspaceErrorAction
  | GetSocialAccountsSuccessAction
  | GetSocialAccountsNotFoundAction
  | GetSocialAccountsHttpInternalErrorAction
  | GetSocialAccountsErrorAction
  | GetUserSuccessAction
  | GetUserNotFoundAction
  | GetUserHttpInternalErrorAction
  | GetUserErrorAction;
