import { GetUser } from "@/store/client/interface/GetUser";
import { SetErrorAction, SetHttpInternalServerErrorAction, SetNotFoundErrorAction } from "../ActionErrorTypes";
import { UserAction } from "./actions";

export type SetLoadingStartAction = {
  type: UserAction.USER_LOADING_START;
};
export type SetLoadingEndAction = {
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

export type PatchUserActiveOrganizationSuccessAction = {
  type: UserAction.PATCH_USERS_ACTIVE_ORGANIZATION_SUCCESS;
  payload: GetUser;
};
export type PatchUserActiveOrganizationNotFoundAction = SetNotFoundErrorAction<UserAction.PATCH_USERS_ACTIVE_ORGANIZATION_NOT_FOUND>;
export type PatchUserActiveOrganizationHttpInternalErrorAction =
  SetHttpInternalServerErrorAction<UserAction.PATCH_USERS_ACTIVE_ORGANIZATION_HTTP_INTERNAL_ERROR>;
export type PatchUserActiveOrganizationErrorAction = SetErrorAction<UserAction.PATCH_USERS_ACTIVE_ORGANIZATION_ERROR>;

export type UserActionTypes =
  | SetLoadingStartAction
  | SetLoadingEndAction
  | GetUserSuccessAction
  | GetUserNotFoundAction
  | GetUserHttpInternalErrorAction
  | GetUserErrorAction
  | PatchUserActiveOrganizationSuccessAction
  | PatchUserActiveOrganizationNotFoundAction
  | PatchUserActiveOrganizationHttpInternalErrorAction
  | PatchUserActiveOrganizationErrorAction;
