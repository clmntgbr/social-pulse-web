import { SetErrorAction, SetHttpInternalServerErrorAction, SetNotFoundErrorAction } from "../ActionErrorTypes";
import { AnalysisAction } from "./actions";

export type SetLoadingStartAction = {
  type: AnalysisAction.ANALYSIS_LOADING_START;
};
export type SetLoadingEndAction = {
  type: AnalysisAction.ANALYSIS_LOADING_END;
};

/// Get Analyses Recents

export type GetAnalysesRecentsSuccessAction = {
  type: AnalysisAction.GET_ANALYSES_RECENTS_SUCCESS;
  payload: GetAnalysesRecents;
};
export type GetAnalysesRecentsNotFoundAction = SetNotFoundErrorAction<AnalysisAction.GET_ANALYSES_RECENTS_NOT_FOUND>;
export type GetAnalysesRecentsHttpInternalErrorAction = SetHttpInternalServerErrorAction<AnalysisAction.GET_ANALYSES_RECENTS_HTTP_INTERNAL_ERROR>;
export type GetAnalysesRecentsErrorAction = SetErrorAction<AnalysisAction.GET_ANALYSES_RECENTS_ERROR>;

/// Get Analyses Favorites

export type GetAnalysesFavoritesSuccessAction = {
  type: AnalysisAction.GET_ANALYSES_FAVORITES_SUCCESS;
  payload: GetAnalysesFavorites;
};
export type GetAnalysesFavoritesNotFoundAction = SetNotFoundErrorAction<AnalysisAction.GET_ANALYSES_FAVORITES_NOT_FOUND>;
export type GetAnalysesFavoritesHttpInternalErrorAction = SetHttpInternalServerErrorAction<AnalysisAction.GET_ANALYSES_FAVORITES_HTTP_INTERNAL_ERROR>;
export type GetAnalysesFavoritesErrorAction = SetErrorAction<AnalysisAction.GET_ANALYSES_FAVORITES_ERROR>;

export type AnalysisActionTypes =
  | SetLoadingStartAction
  | SetLoadingEndAction
  | GetAnalysesRecentsSuccessAction
  | GetAnalysesRecentsNotFoundAction
  | GetAnalysesRecentsHttpInternalErrorAction
  | GetAnalysesRecentsErrorAction
  | GetAnalysesFavoritesSuccessAction
  | GetAnalysesFavoritesNotFoundAction
  | GetAnalysesFavoritesHttpInternalErrorAction
  | GetAnalysesFavoritesErrorAction;
