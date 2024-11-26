import { AnalysisAction } from "@/contexts/analyses/actions";
import { AnalysisActionTypes } from "@/contexts/analyses/types";
import { Dispatch } from "react";
import ApiClient from "../client/ApiClient";
import { GetAnalysisInsights } from "../client/interface/GetAnalysisInsights";
import { HttpStatus } from "../enums/HttpStatus";
import { HttpInternalServerError, HttpNotFoundError } from "../HttpErrors";

interface GetAnalysisInsightsPromiseResponse {
  status: boolean;
  message: string | null;
  data: GetAnalysisInsights | null;
}

export async function getAnalysisInsights(
  token: string,
  uuid: string,
  dispatch: Dispatch<AnalysisActionTypes>
): Promise<GetAnalysisInsightsPromiseResponse> {
  try {
    dispatch({ type: AnalysisAction.ANALYSIS_LOADING_START });

    const client = new ApiClient(token);
    const response = await client.getAnalysisInsights(uuid);

    if (response === null) {
      dispatch({
        type: AnalysisAction.GET_ANALYSIS_INSIGHTS_ERROR,
        payload: new HttpInternalServerError(AnalysisAction.GET_ANALYSIS_INSIGHTS_ERROR),
      });
      return Promise.reject({ status: false, message: null, data: null });
    }

    switch (response.status) {
      case HttpStatus.OK:
        dispatch({
          type: AnalysisAction.GET_ANALYSIS_INSIGHTS_SUCCESS,
          payload: response.data.data,
        });
        return Promise.resolve({ status: true, message: null, data: response.data });

      case HttpStatus.NOT_FOUND:
        dispatch({
          type: AnalysisAction.GET_ANALYSIS_INSIGHTS_NOT_FOUND,
          payload: new HttpNotFoundError(AnalysisAction.GET_ANALYSIS_INSIGHTS_NOT_FOUND),
        });
        return Promise.reject({ status: false, message: response.data.message ?? null, data: null });

      default:
        dispatch({
          type: AnalysisAction.GET_ANALYSIS_INSIGHTS_HTTP_INTERNAL_ERROR,
          payload: new HttpInternalServerError(AnalysisAction.GET_ANALYSIS_INSIGHTS_HTTP_INTERNAL_ERROR),
        });
        return Promise.reject({ status: false, message: response.data.message ?? null, data: null });
    }
  } catch (error) {
    dispatch({
      type: AnalysisAction.GET_ANALYSIS_INSIGHTS_ERROR,
      payload: error instanceof Error ? error : new Error(AnalysisAction.GET_ANALYSIS_INSIGHTS_ERROR),
    });
    return Promise.reject({ status: false, message: null, data: null });
  } finally {
    dispatch({ type: AnalysisAction.ANALYSIS_LOADING_END });
  }
}
