import { VerificationStrategy } from "./verificationStrategy";
import { authorizationService } from "@src/infrastructure/authorization/authorizationService";

export class SmsStrategy implements VerificationStrategy {
    async init(phoneNumber: string) {
        console.log('SmsStrategy init');
        return authorizationService.sendSms(phoneNumber);
    }

    async sendCode(phoneNumber: string, value: string) {
        console.log('SmsStrategy sendCode', value);
        return authorizationService.verifySms(phoneNumber, value);
    }
}

export const smsStrategy = new SmsStrategy();
