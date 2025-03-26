import { API_URL_V2 } from "@src/const";
import { ApiResponse } from "@src/infrastructure/types";
import { TryCodeResponse } from "./types";

const routes = {
    requestCode: '/auth/request_code',
    verifyCode: '/auth/try_code',
    sendSms: '/send-sms',
    verifySms: '/verify-sms-code',
};

class AuthorizationService {
    private readonly apiUrl = API_URL_V2;

    async sendCode(phone: string) {
        const response = await fetch(`${this.apiUrl}${routes.requestCode}`, {
            method: 'POST',
            body: JSON.stringify({
                phone,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result: ApiResponse<unknown> = await response.json();

        if (!result.success) {
            throw new Error('Fetch error');
        };

        return result.data as unknown;
    }

    async sendSms(phone: string) {
        const response = await fetch(`${this.apiUrl}${routes.sendSms}`, {
            method: 'POST',
            body: JSON.stringify({
                phone,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result: ApiResponse<unknown> = await response.json();

        if (!result.success) {
            throw new Error('Fetch error');
        };

        return result.data as unknown;
    }

    async verifyCode(phone: string, code: string) {
        const response = await fetch(`${this.apiUrl}${routes.verifyCode}`, {
            method: 'POST',
            body: JSON.stringify({
                phone,
                code,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        const result: TryCodeResponse = await response.json();

        if (!result.access_token) {
            throw new Error('Fetch error');
        };

        return result;
    }

    async verifySms(phone: string, code: string) {
        const response = await fetch(`${this.apiUrl}${routes.verifySms}`, {
            method: 'POST',
            body: JSON.stringify({
                phone,
                code,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result: TryCodeResponse = await response.json();

        if (!result.access_token) {
            throw new Error('Fetch error');
        };

        return result;
    }    
}

export const authorizationService = new AuthorizationService();
