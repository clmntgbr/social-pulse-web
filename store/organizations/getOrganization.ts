import { OrganizationsAction } from "@/contexts/organizations/actions";
import { OrganizationsActionTypes } from "@/contexts/organizations/types";
import { Dispatch } from "react";
import ApiClient from "../client/ApiClient";
import { HttpStatus } from "../enums/HttpStatus";
import { HttpInternalServerError, HttpNotFoundError } from "../HttpErrors";

export async function getOrganization(token: string, dispatch: Dispatch<OrganizationsActionTypes>): Promise<void> {
  try {
    dispatch({ type: OrganizationsAction.ORGANIZATIONS_LOADING_START });

    const client = new ApiClient(token);
    const response = await client.getOrganization();

    if (response === null) {
      dispatch({
        type: OrganizationsAction.GET_ORGANIZATION_ERROR,
        payload: new HttpInternalServerError(OrganizationsAction.GET_ORGANIZATION_ERROR),
      });
      return;
    }

    switch (response.status) {
      case HttpStatus.OK:
        dispatch({
          type: OrganizationsAction.GET_ORGANIZATION_SUCCESS,
          payload: response.data,
        });
        break;

      case HttpStatus.NOT_FOUND:
        dispatch({
          type: OrganizationsAction.GET_ORGANIZATION_NOT_FOUND,
          payload: new HttpNotFoundError(OrganizationsAction.GET_ORGANIZATION_NOT_FOUND),
        });
        break;

      default:
        dispatch({
          type: OrganizationsAction.GET_ORGANIZATION_HTTP_INTERNAL_ERROR,
          payload: new HttpInternalServerError(OrganizationsAction.GET_ORGANIZATION_HTTP_INTERNAL_ERROR),
        });
    }
  } catch {
    dispatch({
      type: OrganizationsAction.GET_ORGANIZATION_ERROR,
      payload: new Error(OrganizationsAction.GET_ORGANIZATION_ERROR),
    });
  } finally {
    dispatch({ type: OrganizationsAction.ORGANIZATIONS_LOADING_END });
  }
}
