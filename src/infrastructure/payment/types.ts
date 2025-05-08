export type StatusCode = 'CLIENT_ERROR' | 'SERVER_ERROR' | 'SUCCESS';

export type FormRequestSuccessResponse = {
    codeStatus: 'SUCCESS';
    statusCode: 'SUCCESS';
    token: string;
    cardUniqueIdentifier: string;
    cardExpirationDate: string;
    lastFourDigits: string;
}

type ErrorKey = 
    | 'invalid_pan'
    | 'invalid_expiry'
    | 'invalid_cvv'
    | 'invalid_cardholder_name'
    | 'invalid_agreement'
    | 'client_error'
    | 'server_error';

type Errors = Record<ErrorKey, string>;

export type FormRequestErrorResponse = {
    codeStatus: 'CLIENT_ERROR' | 'SERVER_ERROR';
    statusCode: 'CLIENT_ERROR' | 'SERVER_ERROR';
    errors: Errors;
}

export type FormRequestResponse = FormRequestSuccessResponse | FormRequestErrorResponse;

export type SessionResponse = {
    session_id: string;
    merchant_id: string;
    lifetime_minutes: number;
}

export type Token = {
    id: number;
    card_number: string;
    expiry_year: string;
    card_holder_name: string;
}

export type TokenResponse = Token[];

export type ProcessPaymentRequestBody = {
    booking_id: number;
    token_id: number;
} | {
    booking_id: number;
    session: string;
    token: string;
}

export type ProcessPaymentResponse = {
    id: number;
    sum: number;
    payed_sum: number;
    status: {
        name: 'COMPLETE' | string;
        description: string;
    }
}

