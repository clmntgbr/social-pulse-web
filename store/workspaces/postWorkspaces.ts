import { WorkspacesAction } from "@/contexts/workspaces/actions";
import { WorkspacesActionTypes } from "@/contexts/workspaces/types";
import { Dispatch } from "react";
import { PostWorkspaces } from "../client/interface/PostWorkspaces";
import { PostWorkspacesBody } from "../client/interface/PostWorkspacesBody";
import SocialPulseClient from "../client/SocialPulseClient";
import { HTTP_STATUS } from "../enums/HTTP_STATUS";
import { HttpInternalServerError, HttpNotFoundError } from "../HttpErrors";

export async function postWorkspaces(token: string, body: PostWorkspacesBody, dispatch: Dispatch<WorkspacesActionTypes>): Promise<boolean> {
  try {
    dispatch({ type: WorkspacesAction.WORKSPACES_LOADING_START });

    const client = new SocialPulseClient(token);
    const response = await client.postWorkspaces(body);

    console.log("", response?.status);

    if (response === null) {
      dispatch({
        type: WorkspacesAction.POST_WORKSPACES_HTTP_INTERNAL_ERROR,
        payload: new HttpInternalServerError("Get plans failed"),
      });
      return Promise.reject(false);
    }

    switch (response.status) {
      case HTTP_STATUS.CREATED:
        dispatch({
          type: WorkspacesAction.POST_WORKSPACES_SUCCESS,
          payload: response.data as PostWorkspaces,
        });
        return Promise.resolve(true);

      case HTTP_STATUS.NOT_FOUND:
        dispatch({
          type: WorkspacesAction.POST_WORKSPACES_NOT_FOUND,
          payload: new HttpNotFoundError("Get plans not found"),
        });
        return Promise.reject(false);

      default:
        dispatch({
          type: WorkspacesAction.POST_WORKSPACES_HTTP_INTERNAL_ERROR,
          payload: new HttpInternalServerError(`Unexpected status: ${response.status}`),
        });
        return Promise.reject(false);
    }
  } catch (error) {
    dispatch({
      type: WorkspacesAction.POST_WORKSPACES_ERROR,
      payload: error instanceof Error ? error : new Error("Get plans failed"),
    });
    return Promise.reject(false);
  } finally {
    dispatch({ type: WorkspacesAction.WORKSPACES_LOADING_END });
  }
}
