import { OrganizationsAction } from "@/contexts/organizations/actions";
import { OrganizationsActionTypes } from "@/contexts/organizations/types";
import { Dispatch } from "react";
import ApiClient from "../client/ApiClient";
import { PostOrganizations } from "../client/interface/body/PostOgarnizations";
import { HttpStatus } from "../enums/HttpStatus";
import { HttpInternalServerError, HttpNotFoundError } from "../HttpErrors";

export async function postOrganizations(token: string, body: PostOrganizations, dispatch: Dispatch<OrganizationsActionTypes>): Promise<void> {
  try {
    dispatch({ type: OrganizationsAction.ORGANIZATIONS_LOADING_START });

    const client = new ApiClient(token);
    const response = await client.postOrganizations(body);

    if (response === null) {
      dispatch({
        type: OrganizationsAction.POST_ORGANIZATIONS_ERROR,
        payload: new HttpInternalServerError(OrganizationsAction.POST_ORGANIZATIONS_ERROR),
      });
      return;
    }

    switch (response.status) {
      case HttpStatus.CREATED:
        dispatch({
          type: OrganizationsAction.POST_ORGANIZATIONS_SUCCESS,
          payload: response.data,
        });
        break;

      case HttpStatus.NOT_FOUND:
        dispatch({
          type: OrganizationsAction.POST_ORGANIZATIONS_NOT_FOUND,
          payload: new HttpNotFoundError(OrganizationsAction.POST_ORGANIZATIONS_NOT_FOUND),
        });
        break;

      default:
        dispatch({
          type: OrganizationsAction.POST_ORGANIZATIONS_HTTP_INTERNAL_ERROR,
          payload: new HttpInternalServerError(OrganizationsAction.POST_ORGANIZATIONS_HTTP_INTERNAL_ERROR),
        });
    }
  } catch {
    dispatch({
      type: OrganizationsAction.POST_ORGANIZATIONS_ERROR,
      payload: new Error(OrganizationsAction.POST_ORGANIZATIONS_ERROR),
    });
  } finally {
    dispatch({ type: OrganizationsAction.ORGANIZATIONS_LOADING_END });
  }
}
