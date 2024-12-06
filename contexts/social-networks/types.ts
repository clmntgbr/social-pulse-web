import { SetErrorAction, SetHttpInternalServerErrorAction, SetNotFoundErrorAction } from "../ActionErrorTypes";
import { SocialNetworksAction } from "./actions";

export type SetLoadingStartAction = {
  type: SocialNetworksAction.SOCIAL_NETWORKS_LOADING_START;
};
export type SetLoadingEndAction = {
  type: SocialNetworksAction.SOCIAL_NETWORKS_LOADING_END;
};

/// Get Analyses Recents

export type GetAnalysesRecentsSuccessAction = {
  type: SocialNetworksAction.GET_SOCIAL_NETWORKS_SUCCESS;
  payload: null;
};
export type GetAnalysesRecentsNotFoundAction = SetNotFoundErrorAction<SocialNetworksAction.GET_SOCIAL_NETWORKS_NOT_FOUND>;
export type GetAnalysesRecentsHttpInternalErrorAction =
  SetHttpInternalServerErrorAction<SocialNetworksAction.GET_SOCIAL_NETWORKS_HTTP_INTERNAL_ERROR>;
export type GetAnalysesRecentsErrorAction = SetErrorAction<SocialNetworksAction.GET_SOCIAL_NETWORKS_ERROR>;

export type SocialNetworksActionTypes =
  | SetLoadingStartAction
  | SetLoadingEndAction
  | GetAnalysesRecentsSuccessAction
  | GetAnalysesRecentsNotFoundAction
  | GetAnalysesRecentsHttpInternalErrorAction
  | GetAnalysesRecentsErrorAction;
