import { GetPublications } from "@/store/client/interface/GetPublications";
import { PublicationsAction } from "./actions";
import { PublicationsActionTypes } from "./types";

export type PublicationsState = {
  error: boolean;
  loading: boolean;
  publications: GetPublications | null;
};

export const initialPublicationsState: PublicationsState = {
  error: false,
  loading: true,
  publications: [],
};

export function publicationsReducer(state: PublicationsState, action: PublicationsActionTypes): PublicationsState {
  switch (action.type) {
    case PublicationsAction.PUBLICATIONS_LOADING_START: {
      return {
        ...state,
        loading: true,
        error: false,
      };
    }

    case PublicationsAction.PUBLICATIONS_LOADING_END: {
      return {
        ...state,
        loading: false,
      };
    }

    case PublicationsAction.GET_PUBLICATIONS_SUCCESS:
    case PublicationsAction.POST_PUBLICATIONS_SUCCESS: {
      return {
        ...state,
        publications: action.payload,
      };
    }

    case PublicationsAction.GET_PUBLICATIONS_ERROR:
    case PublicationsAction.GET_PUBLICATIONS_HTTP_INTERNAL_ERROR:
    case PublicationsAction.GET_PUBLICATIONS_NOT_FOUND:
    case PublicationsAction.POST_PUBLICATIONS_ERROR:
    case PublicationsAction.POST_PUBLICATIONS_HTTP_INTERNAL_ERROR:
    case PublicationsAction.POST_PUBLICATIONS_NOT_FOUND: {
      return {
        ...state,
        error: true,
      };
    }

    default:
      return state;
  }
}
