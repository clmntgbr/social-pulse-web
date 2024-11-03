import { WorkspacesAction } from "@/contexts/workspaces/actions";
import { WorkspacesActionTypes } from "@/contexts/workspaces/types";
import { Dispatch } from "react";
import { PostWorkspaceInvitationBody } from "../client/interface/body/PostWorkspaceInvitation";
import { PostWorkspaceInvitation } from "../client/interface/PostWorkspaceInvitation";
import { PromiseResponse } from "../client/interface/PromiseResponse";
import SocialPulseClient from "../client/SocialPulseClient";
import { HTTP_STATUS } from "../enums/HTTP_STATUS";
import { HttpInternalServerError, HttpNotFoundError } from "../HttpErrors";

export async function postWorkspaceInvitation(token: string, body: PostWorkspaceInvitationBody, dispatch: Dispatch<WorkspacesActionTypes>): Promise<PromiseResponse> {
  try {
    dispatch({ type: WorkspacesAction.LOADING_START });

    const client = new SocialPulseClient(token);
    const response = await client.postWorkspaceInvitation(body);

    if (response === null) {
      dispatch({
        type: WorkspacesAction.POST_WORKSPACE_INVITATION_ERROR,
        payload: new HttpInternalServerError("Get plans failed"),
      });
      return Promise.reject({ status: false, message: null, data: null });
    }

    switch (response.status) {
      case HTTP_STATUS.OK:
        dispatch({
          type: WorkspacesAction.POST_WORKSPACE_INVITATION_SUCCESS,
          payload: response.data as PostWorkspaceInvitation,
        });
        return Promise.resolve({ status: true, message: null, data: response.data });

      case HTTP_STATUS.NOT_FOUND:
        dispatch({
          type: WorkspacesAction.POST_WORKSPACE_INVITATION_NOT_FOUND,
          payload: new HttpNotFoundError("Get plans not found"),
        });
        return Promise.reject({ status: false, message: response.response.data.message ?? null, data: null });

      default:
        dispatch({
          type: WorkspacesAction.POST_WORKSPACE_INVITATION_HTTP_INTERNAL_ERROR,
          payload: new HttpInternalServerError(`Unexpected status: ${response.status}`),
        });
        return Promise.reject({ status: false, message: response.response.data.message ?? null, data: null });
    }
  } catch (error) {
    dispatch({
      type: WorkspacesAction.POST_WORKSPACE_INVITATION_ERROR,
      payload: error instanceof Error ? error : new Error("Get plans failed"),
    });
    return Promise.reject({ status: false, message: null, data: null });
  } finally {
    dispatch({ type: WorkspacesAction.LOADING_END });
  }
}