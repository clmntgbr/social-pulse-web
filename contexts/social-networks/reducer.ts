import { GetSocialNetworks } from "@/store/client/interface/GetSocialNetworks";
import { SocialNetworksAction } from "./actions";
import { SocialNetworksActionTypes } from "./types";

export type SocialNetworksState = {
  error: boolean;
  loading: boolean;
  socialNetworks: GetSocialNetworks | null;
};

export const initialSocialNetworksState: SocialNetworksState = {
  error: false,
  loading: true,
  socialNetworks: [],
};

export function socialNetworksReducer(state: SocialNetworksState, action: SocialNetworksActionTypes): SocialNetworksState {
  switch (action.type) {
    case SocialNetworksAction.SOCIAL_NETWORKS_LOADING_START: {
      return {
        ...state,
        loading: true,
        error: false,
      };
    }

    case SocialNetworksAction.SOCIAL_NETWORKS_LOADING_END: {
      return {
        ...state,
        loading: false,
      };
    }

    case SocialNetworksAction.GET_SOCIAL_NETWORKS_SUCCESS: {
      return {
        ...state,
        socialNetworks: action.payload,
      };
    }

    case SocialNetworksAction.GET_SOCIAL_NETWORKS_ERROR:
    case SocialNetworksAction.GET_SOCIAL_NETWORKS_HTTP_INTERNAL_ERROR:
    case SocialNetworksAction.GET_SOCIAL_NETWORKS_NOT_FOUND:
    case SocialNetworksAction.GET_SOCIAL_NETWORKS_BY_CODE_ERROR:
    case SocialNetworksAction.GET_SOCIAL_NETWORKS_BY_CODE_HTTP_INTERNAL_ERROR:
    case SocialNetworksAction.GET_SOCIAL_NETWORKS_BY_CODE_NOT_FOUND:
    case SocialNetworksAction.GET_SOCIAL_NETWORKS_CONNECT_ERROR:
    case SocialNetworksAction.GET_SOCIAL_NETWORKS_CONNECT_HTTP_INTERNAL_ERROR:
    case SocialNetworksAction.GET_SOCIAL_NETWORKS_CONNECT_NOT_FOUND:
    case SocialNetworksAction.POST_SOCIAL_NETWORKS_VALIDATE_ERROR:
    case SocialNetworksAction.POST_SOCIAL_NETWORKS_VALIDATE_HTTP_INTERNAL_ERROR:
    case SocialNetworksAction.POST_SOCIAL_NETWORKS_VALIDATE_NOT_FOUND: {
      return {
        ...state,
        error: true,
      };
    }

    default:
      return state;
  }
}
