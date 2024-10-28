import axios, { AxiosResponse, type AxiosInstance } from "axios";
import { GetSocialAccounts } from "./interface/GetSocialAccounts";
import { GetUser } from "./interface/GetUser";
import { GetWorkspace } from "./interface/GetWorkspace";
import { GetWorkspaces } from "./interface/GetWorkspaces";
import { PostWorkspaces } from "./interface/PostWorkspaces";
import { PostWorkspacesBody } from "./interface/PostWorkspacesBody";
import { SOCIAL_ACCOUNTS, USERS, WORKSPACES } from "./RoutesEnum";

export default class SocialPulseClient {
  private httpClient: AxiosInstance;

  constructor(token: string) {
    this.httpClient = axios.create({
      baseURL: "http://localhost:9000/api",
      timeout: 1000,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }

  public async getWorkspaces(): Promise<AxiosResponse<GetWorkspaces> | null> {
    try {
      return await this.httpClient.get(WORKSPACES.GET_WORKSPACES);
    } catch {
      return null;
    }
  }

  public async postWorkspaces(
    requestBody: PostWorkspacesBody
  ): Promise<AxiosResponse<PostWorkspaces> | null> {
    try {
      return await this.httpClient.post(
        WORKSPACES.POST_WORKSPACES,
        requestBody
      );
    } catch {
      return null;
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

  public async getUser(): Promise<AxiosResponse<GetUser> | null> {
    try {
      return await this.httpClient.get(USERS.GET_USER);
    } catch {
      return null;
    }
  }
}
