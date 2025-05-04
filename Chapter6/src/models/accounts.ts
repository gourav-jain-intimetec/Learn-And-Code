export class Account {
    private balance: number;
    private dailyLimit: number;
    private todaysWithdrawnAmmount: number = 0;
    private pin: string;
    private invalidPinAttempts: number = 0;
    private isBlocked: boolean = false;

    constructor(
        private accountId: string,
        balance: number,
        dailyLimit: number,
        pin: string
    ) {
        this.balance = balance;
        this.dailyLimit = dailyLimit;
        this.pin = pin;
    }

    getAccountId(): string {
        return this.accountId;
    }

    validatePin(inputPin: string): boolean {
        if (this.isBlocked) throw new Error("Card is blocked due to invalid PIN attempts.");

        if (this.pin === inputPin) {
            this.invalidPinAttempts = 0;
            return true;
        }

        this.invalidPinAttempts++;
        if (this.invalidPinAttempts >= 3) {
            this.isBlocked = true;
            throw new Error("Card blocked after 3 invalid PIN attempts.");
        }

        throw new Error(`Invalid PIN. Attempt ${this.invalidPinAttempts}/3.`);
    }

    withdraw(amount: number): void {
        if (this.todaysWithdrawnAmmount + amount > this.dailyLimit) {
            throw new Error("Daily withdrawal limit exceeded.");
        }

        if (amount > this.balance) {
            throw new Error("Insufficient account balance.");
        }

        this.balance -= amount;
        this.todaysWithdrawnAmmount += amount;
    }

    getBalance(): number {
        return this.balance;
    }

    resetDailyLimit(): void {
        this.todaysWithdrawnAmmount = 0;
    }
}
