import { UserAction } from "@/contexts/users/actions";
import { UserActionTypes } from "@/contexts/users/types";
import { Dispatch } from "react";
import ApiClient from "../client/ApiClient";
import { HttpStatus } from "../enums/HttpStatus";
import { HttpInternalServerError, HttpNotFoundError } from "../HttpErrors";

export async function patchUserActiveOrganization(token: string, uuid: string, dispatch: Dispatch<UserActionTypes>): Promise<void> {
  try {
    dispatch({ type: UserAction.USER_LOADING_START });

    const client = new ApiClient(token);
    const response = await client.patchUserActiveOrganization(uuid);

    if (response === null) {
      dispatch({
        type: UserAction.PATCH_USERS_ACTIVE_ORGANIZATION_HTTP_INTERNAL_ERROR,
        payload: new HttpInternalServerError(UserAction.PATCH_USERS_ACTIVE_ORGANIZATION_HTTP_INTERNAL_ERROR),
      });
      return;
    }

    switch (response.status) {
      case HttpStatus.OK:
        dispatch({
          type: UserAction.PATCH_USERS_ACTIVE_ORGANIZATION_SUCCESS,
          payload: response.data,
        });
        break;

      case HttpStatus.NOT_FOUND:
        dispatch({
          type: UserAction.PATCH_USERS_ACTIVE_ORGANIZATION_NOT_FOUND,
          payload: new HttpNotFoundError(UserAction.PATCH_USERS_ACTIVE_ORGANIZATION_NOT_FOUND),
        });
        break;

      default:
        dispatch({
          type: UserAction.PATCH_USERS_ACTIVE_ORGANIZATION_HTTP_INTERNAL_ERROR,
          payload: new HttpInternalServerError(UserAction.PATCH_USERS_ACTIVE_ORGANIZATION_HTTP_INTERNAL_ERROR),
        });
    }
  } catch {
    dispatch({
      type: UserAction.PATCH_USERS_ACTIVE_ORGANIZATION_ERROR,
      payload: new Error(UserAction.PATCH_USERS_ACTIVE_ORGANIZATION_ERROR),
    });
  } finally {
    dispatch({ type: UserAction.USER_LOADING_END });
  }
}
