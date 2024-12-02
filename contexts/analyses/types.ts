import { GetAnalysesFavorites } from "@/store/client/interface/GetAnalysesFavorites";
import { GetAnalysesPlatforms } from "@/store/client/interface/GetAnalysesPlatforms";
import { GetAnalysesRecents } from "@/store/client/interface/GetAnalysesRecents";
import { GetAnalysis } from "@/store/client/interface/GetAnalysis";
import { GetAnalysisInsights } from "@/store/client/interface/GetAnalysisInsights";
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

/// Get Analysis

export type GetAnalysisSuccessAction = {
  type: AnalysisAction.GET_ANALYSIS_SUCCESS;
  payload: GetAnalysis;
};
export type GetAnalysisNotFoundAction = SetNotFoundErrorAction<AnalysisAction.GET_ANALYSIS_NOT_FOUND>;
export type GetAnalysisHttpInternalErrorAction = SetHttpInternalServerErrorAction<AnalysisAction.GET_ANALYSIS_HTTP_INTERNAL_ERROR>;
export type GetAnalysisErrorAction = SetErrorAction<AnalysisAction.GET_ANALYSIS_ERROR>;

/// Get Analysis Insights

export type GetAnalysisInsightsSuccessAction = {
  type: AnalysisAction.GET_ANALYSIS_INSIGHTS_SUCCESS;
  payload: GetAnalysisInsights;
};
export type GetAnalysisInsightsNotFoundAction = SetNotFoundErrorAction<AnalysisAction.GET_ANALYSIS_INSIGHTS_NOT_FOUND>;
export type GetAnalysisInsightsHttpInternalErrorAction = SetHttpInternalServerErrorAction<AnalysisAction.GET_ANALYSIS_INSIGHTS_HTTP_INTERNAL_ERROR>;
export type GetAnalysisInsightsErrorAction = SetErrorAction<AnalysisAction.GET_ANALYSIS_INSIGHTS_ERROR>;

/// Post Analyses

export type PostAnalysesSuccessAction = {
  type: AnalysisAction.POST_ANALYSES_SUCCESS;
  payload: GetAnalysis;
};
export type PostAnalysesNotFoundAction = SetNotFoundErrorAction<AnalysisAction.POST_ANALYSES_NOT_FOUND>;
export type PostAnalysesHttpInternalErrorAction = SetHttpInternalServerErrorAction<AnalysisAction.POST_ANALYSES_HTTP_INTERNAL_ERROR>;
export type PostAnalysesErrorAction = SetErrorAction<AnalysisAction.POST_ANALYSES_ERROR>;

/// Post Analysis

export type PostAnalysisToFavoritesSuccessAction = {
  type: AnalysisAction.POST_ANALYSIS_TO_FAVORITES_SUCCESS;
  payload: GetAnalysis;
};
export type PostAnalysisToFavoritesNotFoundAction = SetNotFoundErrorAction<AnalysisAction.POST_ANALYSIS_TO_FAVORITES_NOT_FOUND>;
export type PostAnalysisToFavoritesHttpInternalErrorAction =
  SetHttpInternalServerErrorAction<AnalysisAction.POST_ANALYSIS_TO_FAVORITES_HTTP_INTERNAL_ERROR>;
export type PostAnalysisToFavoritesErrorAction = SetErrorAction<AnalysisAction.POST_ANALYSIS_TO_FAVORITES_ERROR>;

/// Get Analyses Platforms

export type GetAnalysesPlatformsSuccessAction = {
  type: AnalysisAction.GET_ANALYSES_PLATFORMS_SUCCESS;
  payload: GetAnalysesPlatforms;
};
export type GetAnalysesPlatformsNotFoundAction = SetNotFoundErrorAction<AnalysisAction.GET_ANALYSES_PLATFORMS_NOT_FOUND>;
export type GetAnalysesPlatformsHttpInternalErrorAction = SetHttpInternalServerErrorAction<AnalysisAction.GET_ANALYSES_PLATFORMS_HTTP_INTERNAL_ERROR>;
export type GetAnalysesPlatformsErrorAction = SetErrorAction<AnalysisAction.GET_ANALYSES_PLATFORMS_ERROR>;

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
  | GetAnalysesFavoritesErrorAction
  | GetAnalysisSuccessAction
  | GetAnalysisNotFoundAction
  | GetAnalysisHttpInternalErrorAction
  | GetAnalysisErrorAction
  | GetAnalysisInsightsSuccessAction
  | GetAnalysisInsightsNotFoundAction
  | GetAnalysisInsightsHttpInternalErrorAction
  | GetAnalysisInsightsErrorAction
  | PostAnalysesSuccessAction
  | PostAnalysesNotFoundAction
  | PostAnalysesHttpInternalErrorAction
  | PostAnalysesErrorAction
  | PostAnalysisToFavoritesSuccessAction
  | PostAnalysisToFavoritesNotFoundAction
  | PostAnalysisToFavoritesHttpInternalErrorAction
  | PostAnalysisToFavoritesErrorAction
  | GetAnalysesPlatformsSuccessAction
  | GetAnalysesPlatformsErrorAction
  | GetAnalysesPlatformsNotFoundAction
  | GetAnalysesPlatformsHttpInternalErrorAction;
