export type StatusCode = 'CLIENT_ERROR' | 'SERVER_ERROR' | 'SUCCESS';

export type FormRequestSuccessResponse = {
    statusCode: 'SUCCESS',
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
    statusCode: 'CLIENT_ERROR';
    errors: Errors;
}

export type FormRequestResponse = FormRequestSuccessResponse | FormRequestErrorResponse;

export type SessionResponse = {
    session_id: string;
    merchant_id: string;
    lifetime_minutes: number;
}