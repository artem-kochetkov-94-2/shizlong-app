import { PAYMENT_SANDBOX_URL } from "@src/const";
import { SessionResponse } from "./types";

const routes = {
    getSession: '/api/v4/payments/sessions',
};

class PaymentService {
    private readonly apiUrl = PAYMENT_SANDBOX_URL;

    async getSession() {
        const response = await fetch(`${this.apiUrl}${routes.getSession}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result: SessionResponse = await response.json();

        if (result.sessionId) {
            throw new Error('Session error');
        }

        return result;
    }

    async sendFormData(token: string, sessionId: string) {
        // const response = await fetch(`${this.apiUrl}${routes.sendFormData}`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        // });

        // const result: FormRequestResponse = await response.json();

        // return result;
    }
}

export const paymentService = new PaymentService();
