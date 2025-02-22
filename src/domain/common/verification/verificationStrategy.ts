export interface VerificationStrategy {
    init: () => void;
    sendCode: (value: string) => void;
}
