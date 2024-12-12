import { GetSocialNetworks } from "@/store/client/interface/GetSocialNetworks";
import { GetSocialNetworksConnect } from "@/store/client/interface/GetSocialNetworksConnect";
import { SetErrorAction, SetHttpInternalServerErrorAction, SetNotFoundErrorAction } from "../ActionErrorTypes";
import { SocialNetworksAction } from "./actions";

export type SetLoadingStartAction = {
  type: SocialNetworksAction.SOCIAL_NETWORKS_LOADING_START;
};
export type SetLoadingEndAction = {
  type: SocialNetworksAction.SOCIAL_NETWORKS_LOADING_END;
};

/// Get Social Networks

export type GetSocialNetworksSuccessAction = {
  type: SocialNetworksAction.GET_SOCIAL_NETWORKS_SUCCESS;
  payload: GetSocialNetworks;
};
export type GetSocialNetworksNotFoundAction = SetNotFoundErrorAction<SocialNetworksAction.GET_SOCIAL_NETWORKS_NOT_FOUND>;
export type GetSocialNetworksHttpInternalErrorAction = SetHttpInternalServerErrorAction<SocialNetworksAction.GET_SOCIAL_NETWORKS_HTTP_INTERNAL_ERROR>;
export type GetSocialNetworksErrorAction = SetErrorAction<SocialNetworksAction.GET_SOCIAL_NETWORKS_ERROR>;

/// Get Social Networks by Code

export type GetSocialNetworksByCodeSuccessAction = {
  type: SocialNetworksAction.GET_SOCIAL_NETWORKS_BY_CODE_SUCCESS;
  payload: GetSocialNetworks;
};
export type GetSocialNetworksByCodeNotFoundAction = SetNotFoundErrorAction<SocialNetworksAction.GET_SOCIAL_NETWORKS_BY_CODE_NOT_FOUND>;
export type GetSocialNetworksByCodeHttpInternalErrorAction =
  SetHttpInternalServerErrorAction<SocialNetworksAction.GET_SOCIAL_NETWORKS_BY_CODE_HTTP_INTERNAL_ERROR>;
export type GetSocialNetworksByCodeErrorAction = SetErrorAction<SocialNetworksAction.GET_SOCIAL_NETWORKS_BY_CODE_ERROR>;

/// Post Social Networks Validate

export type PostSocialNetworksValidateSuccessAction = {
  type: SocialNetworksAction.POST_SOCIAL_NETWORKS_VALIDATE_SUCCESS;
  payload: GetSocialNetworks;
};
export type PostSocialNetworksValidateNotFoundAction = SetNotFoundErrorAction<SocialNetworksAction.POST_SOCIAL_NETWORKS_VALIDATE_NOT_FOUND>;
export type PostSocialNetworksValidateHttpInternalErrorAction =
  SetHttpInternalServerErrorAction<SocialNetworksAction.POST_SOCIAL_NETWORKS_VALIDATE_HTTP_INTERNAL_ERROR>;
export type PostSocialNetworksValidateErrorAction = SetErrorAction<SocialNetworksAction.POST_SOCIAL_NETWORKS_VALIDATE_ERROR>;

/// Get Social Networks Connect

export type GetSocialNetworksConnectSuccessAction = {
  type: SocialNetworksAction.GET_SOCIAL_NETWORKS_CONNECT_SUCCESS;
  payload: GetSocialNetworksConnect;
};
export type GetSocialNetworksConnectNotFoundAction = SetNotFoundErrorAction<SocialNetworksAction.GET_SOCIAL_NETWORKS_CONNECT_NOT_FOUND>;
export type GetSocialNetworksConnectHttpInternalErrorAction =
  SetHttpInternalServerErrorAction<SocialNetworksAction.GET_SOCIAL_NETWORKS_CONNECT_HTTP_INTERNAL_ERROR>;
export type GetSocialNetworksConnectErrorAction = SetErrorAction<SocialNetworksAction.GET_SOCIAL_NETWORKS_CONNECT_ERROR>;

export type SocialNetworksActionTypes =
  | SetLoadingStartAction
  | SetLoadingEndAction
  | GetSocialNetworksSuccessAction
  | GetSocialNetworksNotFoundAction
  | GetSocialNetworksHttpInternalErrorAction
  | GetSocialNetworksErrorAction
  | GetSocialNetworksByCodeSuccessAction
  | GetSocialNetworksByCodeNotFoundAction
  | GetSocialNetworksByCodeHttpInternalErrorAction
  | GetSocialNetworksByCodeErrorAction
  | PostSocialNetworksValidateSuccessAction
  | PostSocialNetworksValidateNotFoundAction
  | PostSocialNetworksValidateHttpInternalErrorAction
  | PostSocialNetworksValidateErrorAction
  | GetSocialNetworksConnectSuccessAction
  | GetSocialNetworksConnectNotFoundAction
  | GetSocialNetworksConnectHttpInternalErrorAction
  | GetSocialNetworksConnectErrorAction;
