import { API_URL_V2 } from "@src/const";
import { SessionResponse } from "./types";
import { VerificationStore, verificationStore } from "@src/application/store/verificationStore";

const routes = {
    getSession: '/payments/get_session',
    addNewCard: '/payments/add_card',
    tokens: '/payments/customer/tokens',
};

class PaymentService {
    private readonly apiUrl = API_URL_V2;
    private readonly verificationStore: VerificationStore;

    constructor() {
        this.verificationStore = verificationStore;
    }

    async getSession() {
        const response = await fetch(`${this.apiUrl}${routes.getSession}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.verificationStore.accessToken}`,
            },
        });

        const result: SessionResponse = await response.json();

        if (!result.session_id) {
            throw new Error('Session error');
        }

        return result;
    }

    async addNewCard(token: string, sessionId: string) {
        const response = await fetch(`${this.apiUrl}${routes.addNewCard}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.verificationStore.accessToken}`,
            },
            body: JSON.stringify({
                session_id: sessionId,
                token: token,
            }),
        });

        console.log(response);
    }

    async getTokens() {
        const response = await fetch(`${this.apiUrl}${routes.tokens}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.verificationStore.accessToken}`,
            },
        });

        console.log(response);
    }
}

export const paymentService = new PaymentService();
