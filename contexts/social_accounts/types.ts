import { Default } from "@/store/client/interface/Default";
import { GetLoginUrl } from "@/store/client/interface/GetLoginUrl";
import { GetSocialAccounts } from "@/store/client/interface/GetSocialAccounts";
import { SetErrorAction, SetHttpInternalServerErrorAction, SetNotFoundErrorAction } from "../ActionErrorTypes";
import { SocialAccountsAction } from "./actions";

export type SetSocialAccountsLoadingStartAction = {
  type: SocialAccountsAction.SOCIAL_ACCOUNTS_LOADING_START;
};
export type SetSocialAccountsLoadingEndAction = {
  type: SocialAccountsAction.SOCIAL_ACCOUNTS_LOADING_END;
};

export type SetLoginUrlLoadingStartAction = {
  type: SocialAccountsAction.LOGIN_URL_LOADING_START;
};
export type SetLoginUrlLoadingEndAction = {
  type: SocialAccountsAction.LOGIN_URL_LOADING_END;
};

export type SetLoadingStartAction = {
  type: SocialAccountsAction.LOADING_START;
};
export type SetLoadingEndAction = {
  type: SocialAccountsAction.LOADING_END;
};

// Get Social Accounts

export type GetSocialAccountsSuccessAction = {
  type: SocialAccountsAction.GET_SOCIAL_ACCOUNTS_SUCCESS;
  payload: GetSocialAccounts;
};
export type GetSocialAccountsNotFoundAction = SetNotFoundErrorAction<SocialAccountsAction.GET_SOCIAL_ACCOUNTS_NOT_FOUND>;
export type GetSocialAccountsHttpInternalErrorAction = SetHttpInternalServerErrorAction<SocialAccountsAction.GET_SOCIAL_ACCOUNTS_HTTP_INTERNAL_ERROR>;
export type GetSocialAccountsErrorAction = SetErrorAction<SocialAccountsAction.GET_SOCIAL_ACCOUNTS_ERROR>;

// Delete Social Account

export type DeleteSocialAccountSuccessAction = {
  type: SocialAccountsAction.DELETE_SOCIAL_ACCOUNT_SUCCESS;
  payload: Default;
};
export type DeleteSocialAccountNotFoundAction = SetNotFoundErrorAction<SocialAccountsAction.DELETE_SOCIAL_ACCOUNT_NOT_FOUND>;
export type DeleteSocialAccountHttpInternalErrorAction = SetHttpInternalServerErrorAction<SocialAccountsAction.DELETE_SOCIAL_ACCOUNT_HTTP_INTERNAL_ERROR>;
export type DeleteSocialAccountErrorAction = SetErrorAction<SocialAccountsAction.DELETE_SOCIAL_ACCOUNT_ERROR>;

// Get Facebook Login Url

export type GetFacebookLoginUrlSuccessAction = {
  type: SocialAccountsAction.GET_FACEBOOK_LOGIN_URL_SUCCESS;
  payload: GetLoginUrl;
};
export type GetFacebookLoginUrlNotFoundAction = SetNotFoundErrorAction<SocialAccountsAction.GET_FACEBOOK_LOGIN_URL_NOT_FOUND>;
export type GetFacebookLoginUrlHttpInternalErrorAction = SetHttpInternalServerErrorAction<SocialAccountsAction.GET_FACEBOOK_LOGIN_URL_HTTP_INTERNAL_ERROR>;
export type GetFacebookLoginUrlErrorAction = SetErrorAction<SocialAccountsAction.GET_FACEBOOK_LOGIN_URL_ERROR>;

// Get Twitter Login Url

export type GetTwitterLoginUrlSuccessAction = {
  type: SocialAccountsAction.GET_TWITTER_LOGIN_URL_SUCCESS;
  payload: GetLoginUrl;
};
export type GetTwitterLoginUrlNotFoundAction = SetNotFoundErrorAction<SocialAccountsAction.GET_TWITTER_LOGIN_URL_NOT_FOUND>;
export type GetTwitterLoginUrlHttpInternalErrorAction = SetHttpInternalServerErrorAction<SocialAccountsAction.GET_TWITTER_LOGIN_URL_HTTP_INTERNAL_ERROR>;
export type GetTwitterLoginUrlErrorAction = SetErrorAction<SocialAccountsAction.GET_TWITTER_LOGIN_URL_ERROR>;

// Get Facebook Login Url

export type GetLinkedinLoginUrlSuccessAction = {
  type: SocialAccountsAction.GET_LINKEDIN_LOGIN_URL_SUCCESS;
  payload: GetLoginUrl;
};
export type GetLinkedinLoginUrlNotFoundAction = SetNotFoundErrorAction<SocialAccountsAction.GET_LINKEDIN_LOGIN_URL_NOT_FOUND>;
export type GetLinkedinLoginUrlHttpInternalErrorAction = SetHttpInternalServerErrorAction<SocialAccountsAction.GET_LINKEDIN_LOGIN_URL_HTTP_INTERNAL_ERROR>;
export type GetLinkedinLoginUrlErrorAction = SetErrorAction<SocialAccountsAction.GET_LINKEDIN_LOGIN_URL_ERROR>;

export type SocialAccountsActionTypes =
  | SetSocialAccountsLoadingStartAction
  | SetSocialAccountsLoadingEndAction
  | SetLoadingStartAction
  | SetLoadingEndAction
  | SetLoginUrlLoadingStartAction
  | SetLoginUrlLoadingEndAction
  | GetSocialAccountsSuccessAction
  | GetSocialAccountsNotFoundAction
  | GetSocialAccountsHttpInternalErrorAction
  | GetSocialAccountsErrorAction
  | DeleteSocialAccountSuccessAction
  | DeleteSocialAccountNotFoundAction
  | DeleteSocialAccountHttpInternalErrorAction
  | DeleteSocialAccountErrorAction
  | GetFacebookLoginUrlSuccessAction
  | GetFacebookLoginUrlNotFoundAction
  | GetFacebookLoginUrlHttpInternalErrorAction
  | GetFacebookLoginUrlErrorAction
  | GetLinkedinLoginUrlSuccessAction
  | GetLinkedinLoginUrlNotFoundAction
  | GetLinkedinLoginUrlHttpInternalErrorAction
  | GetLinkedinLoginUrlErrorAction
  | GetTwitterLoginUrlSuccessAction
  | GetTwitterLoginUrlNotFoundAction
  | GetTwitterLoginUrlHttpInternalErrorAction
  | GetTwitterLoginUrlErrorAction;
