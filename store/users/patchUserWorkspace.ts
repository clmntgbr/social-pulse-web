import { UserAction } from "@/contexts/users/actions";
import { UserActionTypes } from "@/contexts/users/types";
import { Dispatch } from "react";
import { PatchUserWorkspace } from "../client/interface/body/PatchUserWorkspace";
import { GetWorkspace } from "../client/interface/GetWorkspace";
import SocialPulseClient from "../client/SocialPulseClient";
import { HTTP_STATUS } from "../enums/HTTP_STATUS";
import { HttpInternalServerError, HttpNotFoundError } from "../HttpErrors";

export async function patchUserWorkspace(token: string, body: PatchUserWorkspace, dispatch: Dispatch<UserActionTypes>): Promise<boolean> {
  try {
    dispatch({ type: UserAction.USER_LOADING_START });

    const client = new SocialPulseClient(token);
    const response = await client.patchUserWorkspace(body);

    if (response === null) {
      dispatch({
        type: UserAction.PATCH_USER_WORKSPACE_HTTP_INTERNAL_ERROR,
        payload: new HttpInternalServerError("Get plans failed"),
      });
      return Promise.reject(false);
    }

    switch (response.status) {
      case HTTP_STATUS.OK:
        dispatch({
          type: UserAction.PATCH_USER_WORKSPACE_SUCCESS,
          payload: response.data as GetWorkspace,
        });
        return Promise.resolve(true);

      case HTTP_STATUS.NOT_FOUND:
        dispatch({
          type: UserAction.PATCH_USER_WORKSPACE_NOT_FOUND,
          payload: new HttpNotFoundError("Get plans not found"),
        });
        return Promise.reject(false);

      default:
        dispatch({
          type: UserAction.PATCH_USER_WORKSPACE_HTTP_INTERNAL_ERROR,
          payload: new HttpInternalServerError(`Unexpected status: ${response.status}`),
        });
        return Promise.reject(false);
    }
  } catch (error) {
    dispatch({
      type: UserAction.PATCH_USER_WORKSPACE_ERROR,
      payload: error instanceof Error ? error : new Error("Get plans failed"),
    });
    return Promise.reject(false);
  } finally {
    dispatch({ type: UserAction.USER_LOADING_END });
  }
}
