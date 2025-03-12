import { API_URL } from "@src/const";
import { ApiResponse } from "@src/infrastructure/types";

const routes = {
    sendCode: '/send-code',
    verifyCode: '/verify-code',
    sendSms: '/send-sms',
    verifySms: '/verify-sms-code',
};

class AuthorizationService {
    private readonly apiUrl = API_URL;

    async sendCode(phone: string) {
        const response = await fetch(`${this.apiUrl}${routes.sendCode}`, {
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

        const result: ApiResponse<unknown> = await response.json();

        if (!result.success) {
            throw new Error('Fetch error');
        };

        return result.data as unknown;
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

        const result: ApiResponse<unknown> = await response.json();

        if (!result.success) {
            throw new Error('Fetch error');
        };

        return result.data as unknown;
    }    
}

export const authorizationService = new AuthorizationService();
