export class ATMError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ATMError";
    }
}