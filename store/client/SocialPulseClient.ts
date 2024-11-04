import axios, { AxiosResponse, type AxiosInstance } from "axios";
import { PatchUserWorkspace } from "./interface/body/PatchUserWorkspace";
import { PatchWorkspaceBody } from "./interface/body/PatchWorkspace";
import { PatchWorkspaceInvitation } from "./interface/body/PatchWorkspaceInvitation";
import { PostLogin } from "./interface/body/PostLogin";
import { PostWorkspaceInvitationBody } from "./interface/body/PostWorkspaceInvitation";
import { PostWorkspaces } from "./interface/body/PostWorkspaces";
import { Default } from "./interface/Default";
import { GetLogin } from "./interface/GetLogin";
import { GetLoginUrl } from "./interface/GetLoginUrl";
import { GetSocialAccounts } from "./interface/GetSocialAccounts";
import { GetUser } from "./interface/GetUser";
import { GetWorkspace } from "./interface/GetWorkspace";
import { GetWorkspaceInvitation } from "./interface/GetWorkspaceInvitation";
import { GetWorkspaceInvitations } from "./interface/GetWorkspaceInvitations";
import { GetWorkspaces } from "./interface/GetWorkspaces";
import { PostWorkspaceInvitation } from "./interface/PostWorkspaceInvitation";
import { SOCIAL_ACCOUNTS, USERS, WORKSPACES } from "./RoutesEnum";

export default class SocialPulseClient {
  private httpClient: AxiosInstance;

  constructor(token?: string | null) {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    this.httpClient = axios.create({
      baseURL: "http://localhost:9000/api",
      timeout: 1000,
      headers,
    });
  }

  public async getWorkspaces(): Promise<AxiosResponse<GetWorkspaces> | null> {
    try {
      return await this.httpClient.get(WORKSPACES.GET_WORKSPACES);
    } catch {
      return null;
    }
  }

  public async getFullWorkspaces(): Promise<AxiosResponse<GetWorkspaces> | null> {
    try {
      return await this.httpClient.get(WORKSPACES.GET_WORKSPACES.concat("?groups=workspaces:full"));
    } catch {
      return null;
    }
  }

  public async postWorkspaces(requestBody: PostWorkspaces): Promise<AxiosResponse<GetWorkspaces> | null> {
    try {
      return await this.httpClient.post(WORKSPACES.POST_WORKSPACES, requestBody);
    } catch {
      return null;
    }
  }

  public async deleteWorkspaceUser(workspaceUuid: string, userUuid: string): Promise<AxiosResponse<Default> | any> {
    try {
      return await this.httpClient.delete(WORKSPACES.DELETE_WORKSPACE_USER.replace("%workspaceUuid%", workspaceUuid).replace("%userUuid%", userUuid));
    } catch (response: any) {
      return response;
    }
  }

  public async postWorkspacePromote(workspaceUuid: string, userUuid: string): Promise<AxiosResponse<Default> | any> {
    try {
      return await this.httpClient.post(WORKSPACES.POST_WORKSPACE_PROMOTE.replace("%workspaceUuid%", workspaceUuid).replace("%userUuid%", userUuid));
    } catch (response: any) {
      return response;
    }
  }

  public async getWorkspace(): Promise<AxiosResponse<GetWorkspace> | null> {
    try {
      return await this.httpClient.get(WORKSPACES.GET_WORKSPACE);
    } catch {
      return null;
    }
  }

  public async getSocialAccounts(): Promise<AxiosResponse<GetSocialAccounts> | null> {
    try {
      return await this.httpClient.get(SOCIAL_ACCOUNTS.GET_SOCIAL_ACCOUNTS);
    } catch {
      return null;
    }
  }

  public async getFacebookLoginUrl(callback: string): Promise<AxiosResponse<GetLoginUrl> | null> {
    try {
      return await this.httpClient.get(SOCIAL_ACCOUNTS.GET_FACEBOOK_LOGIN_URL.replace("%s", callback));
    } catch {
      return null;
    }
  }

  public async getTwitterLoginUrl(callback: string): Promise<AxiosResponse<GetLoginUrl> | null> {
    try {
      return await this.httpClient.get(SOCIAL_ACCOUNTS.GET_TWITTER_LOGIN_URL.replace("%s", callback));
    } catch {
      return null;
    }
  }

  public async getLinkedinLoginUrl(callback: string): Promise<AxiosResponse<GetLoginUrl> | null> {
    try {
      return await this.httpClient.get(SOCIAL_ACCOUNTS.GET_LINKEDIN_LOGIN_URL.replace("%s", callback));
    } catch {
      return null;
    }
  }

  public async getUser(): Promise<AxiosResponse<GetUser> | null> {
    try {
      return await this.httpClient.get(USERS.GET_USER);
    } catch {
      return null;
    }
  }

  public async postLogin(requestBody: PostLogin): Promise<AxiosResponse<GetLogin> | null> {
    return await this.httpClient.post(USERS.POST_LOGIN, requestBody);
  }

  public async patchUserWorkspace(requestBody: PatchUserWorkspace): Promise<AxiosResponse<GetWorkspace> | null> {
    try {
      return await this.httpClient.patch(USERS.PATCH_USER_WORKSPACE, requestBody);
    } catch {
      return null;
    }
  }

  public async postWorkspaceInvitation(requestBody: PostWorkspaceInvitationBody): Promise<AxiosResponse<PostWorkspaceInvitation> | any> {
    try {
      return await this.httpClient.post(WORKSPACES.WORKSPACE_INVITATION, requestBody);
    } catch (response: any) {
      return response;
    }
  }

  public async patchWorkspace(workspaceUuid: string, requestBody: PatchWorkspaceBody): Promise<AxiosResponse<Default> | any> {
    try {
      return await this.httpClient.patch(WORKSPACES.PATCH_WORKSPACE.concat("/", workspaceUuid), requestBody);
    } catch (response: any) {
      return response;
    }
  }

  public async patchWorkspaceInvitation(workspaceInvitationUuid: string, requestBody: PatchWorkspaceInvitation): Promise<AxiosResponse<GetWorkspaceInvitation> | null> {
    try {
      return await this.httpClient.patch(WORKSPACES.WORKSPACE_INVITATION.concat("/", workspaceInvitationUuid), requestBody);
    } catch {
      return null;
    }
  }

  public async getWorkspaceInvitations(): Promise<AxiosResponse<GetWorkspaceInvitations> | null> {
    try {
      return await this.httpClient.get(WORKSPACES.WORKSPACE_INVITATION);
    } catch {
      return null;
    }
  }
}
