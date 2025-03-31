import axios, { AxiosResponse } from 'axios';
import { RequestArgs, StatusData } from './types';
import { axiosInstance } from '../axiosService/axiosService';
import { validateResponse } from '../validateResponse';

export class RestService {
  private async request<R>(
    requestConfig: Promise<AxiosResponse<R>>
  ): Promise<StatusData<R>> {
    try {
      const response = await requestConfig;

      validateResponse(response.data);

      return {
        response: response.data as R,
        originalResponse: response,
      };
    } catch (error) {
      validateResponse(error);
      // @ts-ignore
      if (error?.response?.data?.message) {
        // @ts-ignore
        throw new Error(error.response.data.message);
      }

      if (axios.isAxiosError(error)) {
        throw new Error(error.message);
      } else {
        const _error = error as Error;
        throw _error;
      }
    }
  }

  async get<R>({ url, params, headers, baseURL }: RequestArgs): Promise<StatusData<R>> {
    const requestConfig = axiosInstance.get<R>(url, { params, headers, baseURL });
    return this.request<R>(requestConfig);
  }

  async post<R>({ url, data }: RequestArgs): Promise<StatusData<R>> {
    const requestConfig = axiosInstance.post<R>(url, data);
    return this.request<R>(requestConfig);
  }

  async put<R>({ url, data, headers }: RequestArgs): Promise<StatusData<R>> {
    const requestConfig = axiosInstance.put<R>(url, data, {
      headers,
      data,
    });

    return this.request<R>(requestConfig);
  }
}
