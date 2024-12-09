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
  | GetSocialNetworksConnectSuccessAction
  | GetSocialNetworksConnectNotFoundAction
  | GetSocialNetworksConnectHttpInternalErrorAction
  | GetSocialNetworksConnectErrorAction;
