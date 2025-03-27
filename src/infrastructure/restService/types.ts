import { AxiosResponse } from "axios";

export enum RESTMethod {
    post = 'post',
    get = 'get',
    put = 'put',
    patch = 'patch',
    delete = 'delete',
}

export type SuccessStatusData<R> = {
    response: R;
    originalResponse: AxiosResponse<R>;
}

export type StatusData<R> = SuccessStatusData<R> | never;

export type RequestArgs = {
    url: string;
    params?: URLSearchParams;
    data?: unknown;
    headers?: Record<string, string>;
    baseURL?: string;
}