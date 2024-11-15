import { UserAction } from "@/contexts/users/actions";
import { UserActionTypes } from "@/contexts/users/types";
import { Dispatch } from "react";
import ApiClient from "../client/ApiClient";
import { GetUser } from "../client/interface/GetUser";
import { HttpStatus } from "../enums/HttpStatus";
import { HttpInternalServerError, HttpNotFoundError } from "../HttpErrors";

export async function getUser(token: string, dispatch: Dispatch<UserActionTypes>): Promise<void> {
  try {
    dispatch({ type: UserAction.USER_LOADING_START });

    const client = new ApiClient(token);
    const response = await client.getUser();

    if (response === null) {
      dispatch({
        type: UserAction.GET_USER_HTTP_INTERNAL_ERROR,
        payload: new HttpInternalServerError("Get plans failed"),
      });
      return;
    }

    switch (response.status) {
      case HttpStatus.OK:
        dispatch({
          type: UserAction.GET_USER_SUCCESS,
          payload: response.data as GetUser,
        });
        break;

      case HttpStatus.NOT_FOUND:
        dispatch({
          type: UserAction.GET_USER_NOT_FOUND,
          payload: new HttpNotFoundError("Get plans not found"),
        });
        break;

      default:
        dispatch({
          type: UserAction.GET_USER_HTTP_INTERNAL_ERROR,
          payload: new HttpInternalServerError(`Unexpected status: ${response.status}`),
        });
    }
  } catch (error) {
    dispatch({
      type: UserAction.GET_USER_ERROR,
      payload: error instanceof Error ? error : new Error("Get plans failed"),
    });
  } finally {
    dispatch({ type: UserAction.USER_LOADING_END });
  }
}
