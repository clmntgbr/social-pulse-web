import { WorkspacesAction } from "@/contexts/workspaces/actions";
import { WorkspacesActionTypes } from "@/contexts/workspaces/types";
import { Dispatch } from "react";
import { PatchWorkspaceInvitation } from "../client/interface/body/PatchWorkspaceInvitation";
import { GetWorkspaceInvitation } from "../client/interface/GetWorkspaceInvitation";
import SocialPulseClient from "../client/SocialPulseClient";
import { HTTP_STATUS } from "../enums/HTTP_STATUS";
import { HttpInternalServerError, HttpNotFoundError } from "../HttpErrors";

export async function patchWorkspaceInvitation(token: string, workspaceInvitationUuid: string, body: PatchWorkspaceInvitation, dispatch: Dispatch<WorkspacesActionTypes>): Promise<boolean> {
  try {
    dispatch({ type: WorkspacesAction.LOADING_START });

    const client = new SocialPulseClient(token);
    const response = await client.patchWorkspaceInvitation(workspaceInvitationUuid, body);

    if (response === null) {
      dispatch({
        type: WorkspacesAction.PATCH_WORKSPACE_INVITATION_HTTP_INTERNAL_ERROR,
        payload: new HttpInternalServerError("Get plans failed"),
      });
      return Promise.reject(false);
    }

    switch (response.status) {
      case HTTP_STATUS.OK:
        dispatch({
          type: WorkspacesAction.PATCH_WORKSPACE_INVITATION_SUCCESS,
          payload: response.data as GetWorkspaceInvitation,
        });
        return Promise.resolve(true);

      case HTTP_STATUS.NOT_FOUND:
        dispatch({
          type: WorkspacesAction.PATCH_WORKSPACE_INVITATION_NOT_FOUND,
          payload: new HttpNotFoundError("Get plans not found"),
        });
        return Promise.reject(false);

      default:
        dispatch({
          type: WorkspacesAction.PATCH_WORKSPACE_INVITATION_HTTP_INTERNAL_ERROR,
          payload: new HttpInternalServerError(`Unexpected status: ${response.status}`),
        });
        return Promise.reject(false);
    }
  } catch (error) {
    dispatch({
      type: WorkspacesAction.PATCH_WORKSPACE_INVITATION_ERROR,
      payload: error instanceof Error ? error : new Error("Get plans failed"),
    });
    return Promise.reject(false);
  } finally {
    dispatch({ type: WorkspacesAction.LOADING_END });
  }
}
