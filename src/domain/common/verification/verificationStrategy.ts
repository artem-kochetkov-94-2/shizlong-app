import { TryCodeResponse } from "@src/infrastructure/authorization/types";

export interface VerificationStrategy {
    init: (phoneNumber: string) => Promise<unknown>;
    sendCode: (phoneNumber: string, value: string) => Promise<TryCodeResponse>;
}
