import { Account } from "../models/accounts";
import { ATMError } from "../utils/exceptions";

export class ATMService {
    private atmCash: number;

    constructor(initialCash: number) {
        this.atmCash = initialCash;
    }

    withdrawFromATM(account: Account, pin: string, amount: number): void {

        if (amount > this.atmCash) {
            throw new ATMError("ATM has insufficient cash.");
        }

        account.validatePin(pin);
        account.withdraw(amount);
        this.atmCash -= amount;

        console.log(`Withdrawal successful. Dispensed: $${amount}`);
    }

    refillATM(amount: number): void {
        this.atmCash += amount;
    }

    getATMBalance(): number {
        return this.atmCash;
    }
}
