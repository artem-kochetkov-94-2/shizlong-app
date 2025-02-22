import { VerificationStrategy } from "./verificationStrategy";

export class CallStrategy implements VerificationStrategy {
    init() {
        console.log('CallStrategy init');
    }

    sendCode(value: string) {
        console.log('CallStrategy sendCode', value);
        throw new Error('CallStrategy sendCode');
    }
}

export const callStrategy = new CallStrategy();
