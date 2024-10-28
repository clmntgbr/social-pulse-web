import { GetUser } from "@/store/client/interface/GetUser";
import { GetWorkspace } from "@/store/client/interface/GetWorkspace";
import { SetErrorAction, SetHttpInternalServerErrorAction, SetNotFoundErrorAction } from "../ActionErrorTypes";
import { UserAction } from "./actions";

export type SetWorkspacesLoadingStartAction = {
  type: UserAction.USER_LOADING_START;
};
export type SetWorkspacesLoadingEndAction = {
  type: UserAction.USER_LOADING_END;
};

/// Get User

export type GetUserSuccessAction = {
  type: UserAction.GET_USER_SUCCESS;
  payload: GetUser;
};

export type GetUserNotFoundAction = SetNotFoundErrorAction<UserAction.GET_USER_NOT_FOUND>;

export type GetUserHttpInternalErrorAction = SetHttpInternalServerErrorAction<UserAction.GET_USER_HTTP_INTERNAL_ERROR>;

export type GetUserErrorAction = SetErrorAction<UserAction.GET_USER_ERROR>;

/// Post User Workspace

export type PatchUserWorkspaceSuccessAction = {
  type: UserAction.PATCH_USER_WORKSPACE_SUCCESS;
  payload: GetWorkspace;
};

export type PatchUserWorkspaceNotFoundAction = SetNotFoundErrorAction<UserAction.PATCH_USER_WORKSPACE_NOT_FOUND>;

export type PatchUserWorkspaceHttpInternalErrorAction = SetHttpInternalServerErrorAction<UserAction.PATCH_USER_WORKSPACE_HTTP_INTERNAL_ERROR>;

export type PatchUserWorkspaceErrorAction = SetErrorAction<UserAction.PATCH_USER_WORKSPACE_ERROR>;

export type UserActionTypes =
  | SetWorkspacesLoadingStartAction
  | SetWorkspacesLoadingEndAction
  | GetUserSuccessAction
  | GetUserNotFoundAction
  | GetUserHttpInternalErrorAction
  | GetUserErrorAction
  | PatchUserWorkspaceSuccessAction
  | PatchUserWorkspaceNotFoundAction
  | PatchUserWorkspaceHttpInternalErrorAction
  | PatchUserWorkspaceErrorAction;
