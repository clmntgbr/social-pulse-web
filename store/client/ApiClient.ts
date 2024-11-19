import axios, { AxiosError, AxiosResponse, type AxiosInstance } from "axios";
import { LoginCredentials } from "./interface/body/LoginCredentials";
import { PostAnalyses } from "./interface/body/PostAnalyses";
import { GetToken } from "./interface/GetToken";
import { GetUser } from "./interface/GetUser";
import { ANALYSES, USERS } from "./RoutesEnum";

export default class ApiClient {
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
      timeout: 30000,
      headers,
    });
  }

  public async getUser(): Promise<AxiosResponse<GetUser> | null> {
    try {
      return await this.httpClient.get(USERS.GET_USER);
    } catch (error) {
      if (error instanceof AxiosError) {
        return error.response!;
      }
      return null;
    }
  }

  public async getToken(requestBody: LoginCredentials): Promise<AxiosResponse<GetToken> | null> {
    try {
      return await this.httpClient.post(USERS.GET_LOGIN, requestBody);
    } catch {
      return null;
    }
  }

  public async getAnalysesRecents(): Promise<AxiosResponse<any> | null> {
    try {
      return await this.httpClient.get(ANALYSES.GET_ANALYSES_RECENTS);
    } catch {
      return null;
    }
  }

  public async getAnalysesFavorites(): Promise<AxiosResponse<any> | null> {
    try {
      return await this.httpClient.get(ANALYSES.GET_ANALYSES_FAVORITES);
    } catch {
      return null;
    }
  }

  public async postAnalyses(requestBody: PostAnalyses): Promise<AxiosResponse | null> {
    try {
      return await this.httpClient.post(ANALYSES.POST_ANALYSIS, requestBody);
    } catch (error) {
      if (error instanceof AxiosError) {
        return error.response!;
      }
      return null;
    }
  }

  public async getAnalysis(uuid: string): Promise<AxiosResponse | null> {
    try {
      return await this.httpClient.get(ANALYSES.GET_ANALYSIS.replace("%uuid%", uuid));
    } catch (error) {
      if (error instanceof AxiosError) {
        return error.response!;
      }
      return null;
    }
  }
}
