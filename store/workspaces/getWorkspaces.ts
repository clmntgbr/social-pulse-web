import { WorkspacesAction } from "@/contexts/workspaces/actions";
import { WorkspacesActionTypes } from "@/contexts/workspaces/types";
import { Dispatch } from "react";
import { GetWorkspaces } from "../client/interface/GetWorkspaces";
import SocialPulseClient from "../client/SocialPulseClient";
import { HTTP_STATUS } from "../enums/HTTP_STATUS";
import { HttpInternalServerError, HttpNotFoundError } from "../HttpErrors";

export async function getWorkspaces(
  token: string,
  dispatch: Dispatch<WorkspacesActionTypes>
): Promise<void> {
  try {
    dispatch({ type: WorkspacesAction.WORKSPACES_LOADING_START });

    const client = new SocialPulseClient(token);
    const response = await client.getWorkspaces();

    if (response === null) {
      dispatch({
        type: WorkspacesAction.GET_WORKSPACES_HTTP_INTERNAL_ERROR,
        payload: new HttpInternalServerError("Get plans failed"),
      });
      return;
    }

    switch (response.status) {
      case HTTP_STATUS.OK:
        dispatch({
          type: WorkspacesAction.GET_WORKSPACES_SUCCESS,
          payload: response.data as GetWorkspaces,
        });
        break;

      case HTTP_STATUS.NOT_FOUND:
        dispatch({
          type: WorkspacesAction.GET_WORKSPACES_NOT_FOUND,
          payload: new HttpNotFoundError("Get plans not found"),
        });
        break;

      default:
        dispatch({
          type: WorkspacesAction.GET_WORKSPACES_HTTP_INTERNAL_ERROR,
          payload: new HttpInternalServerError(
            `Unexpected status: ${response.status}`
          ),
        });
    }
  } catch (error) {
    dispatch({
      type: WorkspacesAction.GET_WORKSPACES_ERROR,
      payload: error instanceof Error ? error : new Error("Get plans failed"),
    });
  } finally {
    dispatch({ type: WorkspacesAction.WORKSPACES_LOADING_END });
  }
}
