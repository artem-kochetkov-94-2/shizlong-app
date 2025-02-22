import { VerificationStrategy } from "./verificationStrategy";

export class VerificationController {
    private strategy: VerificationStrategy | null = null;

    setStrategy(strategy: VerificationStrategy) {
        this.strategy = strategy;
    }

    getStrategy() {
        return this.strategy;
    }
}

export const verificationController = new VerificationController();
