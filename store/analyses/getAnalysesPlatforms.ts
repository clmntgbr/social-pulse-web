import { AnalysisAction } from "@/contexts/analyses/actions";
import { AnalysisActionTypes } from "@/contexts/analyses/types";
import { Dispatch } from "react";
import ApiClient from "../client/ApiClient";
import { HttpStatus } from "../enums/HttpStatus";
import { HttpInternalServerError, HttpNotFoundError } from "../HttpErrors";

export async function getAnalysesPlatforms(token: string, dispatch: Dispatch<AnalysisActionTypes>): Promise<void> {
  try {
    dispatch({ type: AnalysisAction.ANALYSIS_LOADING_START });

    const client = new ApiClient(token);
    const response = await client.getAnalysesPlatforms();

    if (response === null) {
      dispatch({
        type: AnalysisAction.GET_ANALYSES_PLATFORMS_ERROR,
        payload: new HttpInternalServerError(AnalysisAction.GET_ANALYSES_PLATFORMS_ERROR),
      });
      return;
    }

    switch (response.status) {
      case HttpStatus.OK:
        dispatch({
          type: AnalysisAction.GET_ANALYSES_PLATFORMS_SUCCESS,
          payload: response.data,
        });
        return;

      case HttpStatus.NOT_FOUND:
        dispatch({
          type: AnalysisAction.GET_ANALYSES_PLATFORMS_NOT_FOUND,
          payload: new HttpNotFoundError(AnalysisAction.GET_ANALYSES_PLATFORMS_NOT_FOUND),
        });
        return;

      default:
        dispatch({
          type: AnalysisAction.GET_ANALYSES_PLATFORMS_HTTP_INTERNAL_ERROR,
          payload: new HttpInternalServerError(AnalysisAction.GET_ANALYSES_PLATFORMS_HTTP_INTERNAL_ERROR),
        });
        return;
    }
  } catch (error) {
    dispatch({
      type: AnalysisAction.GET_ANALYSES_PLATFORMS_ERROR,
      payload: error instanceof Error ? error : new Error(AnalysisAction.GET_ANALYSES_PLATFORMS_ERROR),
    });
    return;
  } finally {
    dispatch({ type: AnalysisAction.ANALYSIS_LOADING_END });
  }
}
