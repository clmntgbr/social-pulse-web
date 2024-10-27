import { GetUser } from "@/store/client/interface/GetUser";
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
  | GetUserSuccessAction
  | GetUserNotFoundAction
  | GetUserHttpInternalErrorAction
  | GetUserErrorAction;
