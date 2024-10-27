import { GetSocialAccounts } from "@/store/client/interface/GetSocialAccounts";
import {
  SetErrorAction,
  SetHttpInternalServerErrorAction,
  SetNotFoundErrorAction,
} from "../ActionErrorTypes";
import { SocialAccountsAction } from "./actions";

export type SetSocialAccountsLoadingStartAction = {
  type: SocialAccountsAction.SOCIAL_ACCOUNTS_LOADING_START;
};
export type SetSocialAccountsLoadingEndAction = {
  type: SocialAccountsAction.SOCIAL_ACCOUNTS_LOADING_END;
};

export type GetSocialAccountsSuccessAction = {
  type: SocialAccountsAction.GET_SOCIAL_ACCOUNTS_SUCCESS;
  payload: GetSocialAccounts;
};

export type GetSocialAccountsNotFoundAction =
  SetNotFoundErrorAction<SocialAccountsAction.GET_SOCIAL_ACCOUNTS_NOT_FOUND>;

export type GetSocialAccountsHttpInternalErrorAction =
  SetHttpInternalServerErrorAction<SocialAccountsAction.GET_SOCIAL_ACCOUNTS_HTTP_INTERNAL_ERROR>;

export type GetSocialAccountsErrorAction =
  SetErrorAction<SocialAccountsAction.GET_SOCIAL_ACCOUNTS_ERROR>;

export type SocialAccountsActionTypes =
  | SetSocialAccountsLoadingStartAction
  | SetSocialAccountsLoadingEndAction
  | GetSocialAccountsSuccessAction
  | GetSocialAccountsNotFoundAction
  | GetSocialAccountsHttpInternalErrorAction
  | GetSocialAccountsErrorAction;
