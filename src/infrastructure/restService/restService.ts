import axios, { AxiosResponse } from "axios";
import { RequestArgs, StatusData } from "./types";

export class RestService {
    private async request<R>(requestConfig: Promise<AxiosResponse>): Promise<StatusData<R>> {
        try {
            const response = await requestConfig;

            return {
                response: response.data as R,
                originalResponse: response,
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.message);
            } else {
                const _error = error as Error;
                throw _error;
            }
        }
    }

    async get<R>({
        url,
        params,
        headers,
        baseURL,
    }: RequestArgs): Promise<StatusData<R>> {
        const requestConfig = axios.get<R>(url, { params, headers, baseURL });

        return this.request<R>(requestConfig);
    }

    async post<R>({
        url,
        data,
        headers,
        baseURL,
        params,
    }: RequestArgs): Promise<StatusData<R>> {
        const requestConfig = axios.post<R>(url, data, { params, headers, baseURL });

        return this.request<R>(requestConfig);
    }

    async put<R>({ url, data, headers }: RequestArgs): Promise<StatusData<R>> {
        const requestConfig = axios.put<R>(url, data, {
            headers,
            data,
        });

        return this.request<R>(requestConfig);
    }
    
    
}
