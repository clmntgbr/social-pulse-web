import { AnalysisAction } from "./actions";
import { AnalysisActionTypes } from "./types";

export type AnalysisState = {
  error: boolean;
  loading: boolean;
  favorites: GetAnalysesFavorites | [];
  recents: GetAnalysesRecents | [];
};

export const initialAnalysisState: AnalysisState = {
  error: false,
  loading: true,
  recents: [],
  favorites: [],
};

export function analysisReducer(state: AnalysisState, action: AnalysisActionTypes): AnalysisState {
  switch (action.type) {
    case AnalysisAction.ANALYSIS_LOADING_START: {
      return {
        ...state,
        loading: true,
        error: false,
      };
    }

    case AnalysisAction.ANALYSIS_LOADING_END: {
      return {
        ...state,
        loading: false,
      };
    }

    case AnalysisAction.GET_ANALYSES_FAVORITES_SUCCESS: {
      return {
        ...state,
        favorites: action.payload,
      };
    }

    case AnalysisAction.GET_ANALYSES_RECENTS_SUCCESS: {
      return {
        ...state,
        recents: action.payload,
      };
    }

    case AnalysisAction.GET_ANALYSES_FAVORITES_ERROR:
    case AnalysisAction.GET_ANALYSES_FAVORITES_HTTP_INTERNAL_ERROR:
    case AnalysisAction.GET_ANALYSES_FAVORITES_NOT_FOUND:

    case AnalysisAction.GET_ANALYSES_RECENTS_ERROR:
    case AnalysisAction.GET_ANALYSES_RECENTS_HTTP_INTERNAL_ERROR:
    case AnalysisAction.GET_ANALYSES_RECENTS_NOT_FOUND: {
      return {
        ...state,
        error: true,
      };
    }

    default:
      return state;
  }
}
