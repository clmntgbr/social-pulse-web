import { AnalysisAction } from "@/contexts/analyses/actions";
import { AnalysisActionTypes } from "@/contexts/analyses/types";
import { Dispatch } from "react";
import ApiClient from "../client/ApiClient";
import { HttpStatus } from "../enums/HttpStatus";
import { HttpInternalServerError, HttpNotFoundError } from "../HttpErrors";

export async function getAnalysesRecents(token: string, dispatch: Dispatch<AnalysisActionTypes>): Promise<void> {
  try {
    dispatch({ type: AnalysisAction.ANALYSIS_LOADING_START });

    const client = new ApiClient(token);
    const response = await client.getAnalysesRecents();

    if (response === null) {
      dispatch({
        type: AnalysisAction.GET_ANALYSES_RECENTS_ERROR,
        payload: new HttpInternalServerError("Get plans failed"),
      });
      return;
    }

    switch (response.status) {
      case HttpStatus.OK:
        dispatch({
          type: AnalysisAction.GET_ANALYSES_RECENTS_SUCCESS,
          payload: response.data,
        });
        break;

      case HttpStatus.NOT_FOUND:
        dispatch({
          type: AnalysisAction.GET_ANALYSES_RECENTS_NOT_FOUND,
          payload: new HttpNotFoundError("Get plans not found"),
        });
        break;

      default:
        dispatch({
          type: AnalysisAction.GET_ANALYSES_RECENTS_HTTP_INTERNAL_ERROR,
          payload: new HttpInternalServerError(`Unexpected status: ${response.status}`),
        });
    }
  } catch (error) {
    dispatch({
      type: AnalysisAction.GET_ANALYSES_RECENTS_ERROR,
      payload: error instanceof Error ? error : new Error("Get plans failed"),
    });
  } finally {
    dispatch({ type: AnalysisAction.ANALYSIS_LOADING_END });
  }
}
