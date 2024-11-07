import { WorkspacesAction } from "@/contexts/workspaces/actions";
import { WorkspacesActionTypes } from "@/contexts/workspaces/types";
import { Dispatch } from "react";
import { Default } from "../client/interface/Default";
import { PromiseResponse } from "../client/interface/PromiseResponse";
import SocialPulseClient from "../client/SocialPulseClient";
import { HTTP_STATUS } from "../enums/HTTP_STATUS";
import { HttpInternalServerError, HttpNotFoundError } from "../HttpErrors";

export async function leaveWorkspace(token: string, workspaceUuid: string, dispatch: Dispatch<WorkspacesActionTypes>): Promise<PromiseResponse> {
  try {
    dispatch({ type: WorkspacesAction.LOADING_START });

    const client = new SocialPulseClient(token);
    const response = await client.leaveWorkspace(workspaceUuid);

    console.log("", response);

    if (response === null) {
      dispatch({
        type: WorkspacesAction.LEAVE_WORKSPACE_HTTP_INTERNAL_ERROR,
        payload: new HttpInternalServerError("Get plans failed"),
      });
      return Promise.reject({ status: false, message: null, data: null });
    }

    switch (response.status) {
      case HTTP_STATUS.OK:
        dispatch({
          type: WorkspacesAction.LEAVE_WORKSPACE_SUCCESS,
          payload: response.data as Default,
        });
        return Promise.resolve({ status: true, message: null, data: response.data });

      case HTTP_STATUS.NOT_FOUND:
        dispatch({
          type: WorkspacesAction.LEAVE_WORKSPACE_NOT_FOUND,
          payload: new HttpNotFoundError("Get plans not found"),
        });
        return Promise.reject({ status: false, message: response.response.data.message ?? null, data: null });

      default:
        dispatch({
          type: WorkspacesAction.LEAVE_WORKSPACE_HTTP_INTERNAL_ERROR,
          payload: new HttpInternalServerError(`Unexpected status: ${response.status}`),
        });
        return Promise.reject({ status: false, message: response.response.data.message ?? null, data: null });
    }
  } catch (error) {
    dispatch({
      type: WorkspacesAction.LEAVE_WORKSPACE_ERROR,
      payload: error instanceof Error ? error : new Error("Get plans failed"),
    });
    return Promise.reject({ status: false, message: null, data: null });
  } finally {
    dispatch({ type: WorkspacesAction.LOADING_END });
  }
}
