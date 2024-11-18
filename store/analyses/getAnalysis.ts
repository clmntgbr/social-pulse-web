import { AnalysisAction } from "@/contexts/analyses/actions";
import { AnalysisActionTypes } from "@/contexts/analyses/types";
import { Dispatch } from "react";
import ApiClient from "../client/ApiClient";
import { GetAnalysis } from "../client/interface/GetAnalysis";
import { HttpStatus } from "../enums/HttpStatus";
import { HttpInternalServerError, HttpNotFoundError } from "../HttpErrors";

interface GetAnalysisPromiseResponse {
  status: boolean;
  message: string | null;
  data: GetAnalysis | null;
}

export async function getAnalysis(token: string, uuid: string, dispatch: Dispatch<AnalysisActionTypes>): Promise<GetAnalysisPromiseResponse> {
  try {
    dispatch({ type: AnalysisAction.ANALYSIS_LOADING_START });

    const client = new ApiClient(token);
    const response = await client.getAnalysis(uuid);

    if (response === null) {
      dispatch({
        type: AnalysisAction.GET_ANALYSIS_ERROR,
        payload: new HttpInternalServerError(AnalysisAction.GET_ANALYSIS_ERROR),
      });
      return Promise.reject({ status: false, message: null, data: null });
    }

    switch (response.status) {
      case HttpStatus.OK:
        dispatch({
          type: AnalysisAction.GET_ANALYSIS_SUCCESS,
          payload: response.data.data,
        });
        return Promise.resolve({ status: true, message: null, data: response.data });

      case HttpStatus.NOT_FOUND:
        dispatch({
          type: AnalysisAction.GET_ANALYSIS_NOT_FOUND,
          payload: new HttpNotFoundError(AnalysisAction.GET_ANALYSIS_NOT_FOUND),
        });
        return Promise.reject({ status: false, message: response.data.message ?? null, data: null });

      default:
        dispatch({
          type: AnalysisAction.GET_ANALYSIS_HTTP_INTERNAL_ERROR,
          payload: new HttpInternalServerError(AnalysisAction.GET_ANALYSIS_HTTP_INTERNAL_ERROR),
        });
        return Promise.reject({ status: false, message: response.data.message ?? null, data: null });
    }
  } catch (error) {
    dispatch({
      type: AnalysisAction.GET_ANALYSIS_ERROR,
      payload: error instanceof Error ? error : new Error(AnalysisAction.GET_ANALYSIS_ERROR),
    });
    return Promise.reject({ status: false, message: null, data: null });
  } finally {
    dispatch({ type: AnalysisAction.ANALYSIS_LOADING_END });
  }
}
