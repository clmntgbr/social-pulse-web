import { WorkspacesAction } from "@/contexts/workspaces/actions";
import { WorkspacesActionTypes } from "@/contexts/workspaces/types";
import { Dispatch } from "react";
import { GetWorkspaceInvitations } from "../client/interface/GetWorkspaceInvitations";
import SocialPulseClient from "../client/SocialPulseClient";
import { HTTP_STATUS } from "../enums/HTTP_STATUS";
import { HttpInternalServerError, HttpNotFoundError } from "../HttpErrors";

export async function getWorkspaceInvitations(token: string, dispatch: Dispatch<WorkspacesActionTypes>): Promise<boolean> {
  try {
    dispatch({ type: WorkspacesAction.LOADING_START });

    const client = new SocialPulseClient(token);
    const response = await client.getWorkspaceInvitations();

    if (response === null) {
      dispatch({
        type: WorkspacesAction.GET_WORKSPACE_INVITATIONS_HTTP_INTERNAL_ERROR,
        payload: new HttpInternalServerError("Get plans failed"),
      });
      return Promise.reject(false);
    }

    switch (response.status) {
      case HTTP_STATUS.OK:
        dispatch({
          type: WorkspacesAction.GET_WORKSPACE_INVITATIONS_SUCCESS,
          payload: response.data as GetWorkspaceInvitations,
        });
        return Promise.resolve(true);

      case HTTP_STATUS.NOT_FOUND:
        dispatch({
          type: WorkspacesAction.GET_WORKSPACE_INVITATIONS_NOT_FOUND,
          payload: new HttpNotFoundError("Get plans not found"),
        });
        return Promise.reject(false);

      default:
        dispatch({
          type: WorkspacesAction.GET_WORKSPACE_INVITATIONS_HTTP_INTERNAL_ERROR,
          payload: new HttpInternalServerError(`Unexpected status: ${response.status}`),
        });
        return Promise.reject(false);
    }
  } catch (error) {
    dispatch({
      type: WorkspacesAction.GET_WORKSPACE_INVITATIONS_ERROR,
      payload: error instanceof Error ? error : new Error("Get plans failed"),
    });
    return Promise.reject(false);
  } finally {
    dispatch({ type: WorkspacesAction.LOADING_END });
  }
}
