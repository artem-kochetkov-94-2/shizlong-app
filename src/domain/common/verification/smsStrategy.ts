import { VerificationStrategy } from "./verificationStrategy";

export class SmsStrategy implements VerificationStrategy {
    init() {
        console.log('SmsStrategy init');
    }

    sendCode(value: string) {
        console.log('SmsStrategy sendCode', value);
        throw new Error('SmsStrategy sendCode');
    }
}

export const smsStrategy = new SmsStrategy();
