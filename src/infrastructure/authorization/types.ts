export interface TryCodeResponse {
    access_token: string;
    expires_in: number;
    token_type: "Bearer"
}

export interface RquestReverseCallResponse {
    success: boolean;;
    reverse_call_phone: string;
}

export interface CheckReverseCallVerificationSuccess {
    access_token: string;
    expires_in: number;
}

export interface CheckReverseCallVerificationError {
    success: boolean;
    verified: boolean;
}

export type CheckReverseCallVerification =
    | CheckReverseCallVerificationSuccess
    | CheckReverseCallVerificationError;