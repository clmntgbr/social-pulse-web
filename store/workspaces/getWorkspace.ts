import { UserAction } from "@/contexts/users/actions";
import { UserActionTypes } from "@/contexts/users/types";
import { Dispatch } from "react";
import { GetWorkspace } from "../client/interface/GetWorkspace";
import SocialPulseClient from "../client/SocialPulseClient";
import { HTTP_STATUS } from "../enums/HTTP_STATUS";
import { HttpInternalServerError, HttpNotFoundError } from "../HttpErrors";

export async function getWorkspace(
  token: string,
  dispatch: Dispatch<UserActionTypes>
): Promise<void> {
  try {
    dispatch({ type: UserAction.USER_LOADING_START });

    const client = new SocialPulseClient(token);
    const response = await client.getWorkspace();

    if (response === null) {
      dispatch({
        type: UserAction.GET_WORKSPACE_HTTP_INTERNAL_ERROR,
        payload: new HttpInternalServerError("Get plans failed"),
      });
      return;
    }

    switch (response.status) {
      case HTTP_STATUS.OK:
        dispatch({
          type: UserAction.GET_WORKSPACE_SUCCESS,
          payload: response.data as GetWorkspace,
        });
        break;

      case HTTP_STATUS.NOT_FOUND:
        dispatch({
          type: UserAction.GET_WORKSPACE_NOT_FOUND,
          payload: new HttpNotFoundError("Get plans not found"),
        });
        break;

      default:
        dispatch({
          type: UserAction.GET_WORKSPACE_HTTP_INTERNAL_ERROR,
          payload: new HttpInternalServerError(
            `Unexpected status: ${response.status}`
          ),
        });
    }
  } catch (error) {
    dispatch({
      type: UserAction.GET_WORKSPACE_ERROR,
      payload: error instanceof Error ? error : new Error("Get plans failed"),
    });
  } finally {
    dispatch({ type: UserAction.USER_LOADING_END });
  }
}
