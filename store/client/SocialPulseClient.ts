import axios, { AxiosResponse, type AxiosInstance } from "axios";
import { GetWorkspace } from "./interface/GetWorkspace";
import { GetWorkspaces } from "./interface/GetWorkspaces";

export default class SocialPulseClient {
  private httpClient: AxiosInstance;

  constructor(token: string) {
    this.httpClient = axios.create({
      baseURL: "http://localhost:9000",
      timeout: 1000,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }

  public async getWorkspaces(): Promise<AxiosResponse<GetWorkspaces> | null> {
    try {
      return await this.httpClient.get("/api/workspaces");
    } catch {
      return null;
    }
  }

  public async getWorkspace(): Promise<AxiosResponse<GetWorkspace> | null> {
    try {
      return await this.httpClient.get("/api/workspace");
    } catch {
      return null;
    }
  }
}
