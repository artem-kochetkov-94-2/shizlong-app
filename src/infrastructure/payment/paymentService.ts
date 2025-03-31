import { API_URL_V2 } from "@src/const";
import { SessionResponse, TokenResponse } from "./types";
import { VerificationStore, verificationStore } from "@src/application/store/verificationStore";

const routes = {
    getSession: '/payments/get_session',
    addNewCard: '/payments/add_card',
    tokens: '/payments/customer/tokens',
    processPayment: '/payments/process_payment',
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
                'Accept': 'application/json',
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
                'Accept': 'application/json',
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
                'Accept': 'application/json',
                'Authorization': `Bearer ${this.verificationStore.accessToken}`,
            },
        });

        return await response.json() as TokenResponse;
    }

    async processPayment(bookingId: number, tokenId: number) {
        const response = await fetch(`${this.apiUrl}${routes.processPayment}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${this.verificationStore.accessToken}`,
            },
            body: JSON.stringify({
                booking_id: bookingId,
                token_id: tokenId,
            }),
        });

        console.log(response);
    }
}

export const paymentService = new PaymentService();
