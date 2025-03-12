import { VerificationStrategy } from "./verificationStrategy";
import { authorizationService } from "@src/infrastructure/authorization/authorizationService";

export class CallStrategy implements VerificationStrategy {
    async init(phoneNumber: string) {
        console.log('CallStrategy init');
        return authorizationService.sendCode(phoneNumber);
    }

    async sendCode(phoneNumber: string, value: string) {
        console.log('CallStrategy sendCode', value);
        return authorizationService.verifyCode(phoneNumber, value);
    }
}

export const callStrategy = new CallStrategy();
