public class Customer {

    private final String firstName;
    private final String lastName;
    private final Wallet wallet;

    public Customer(String firstName, String lastName, float initialBalance) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.wallet = new Wallet(initialBalance);
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public boolean makePayment(float amount) {
        return wallet.debit(amount);
    }

    public float getBalance() {
        return wallet.getBalance();
    }
}


public class Wallet {

    private float balance;

    public Wallet(float initialBalance) {
        this.balance = Math.max(0, initialBalance);
    }

    public float getBalance() {
        return balance;
    }

    public void credit(float amount) {
        if (amount > 0) {
            balance += amount;
        }
    }

    public boolean debit(float amount) {
        if (amount > 0 && balance >= amount) {
            balance -= amount;
            return true;
        }
        return false;
    }
}

//Now this code follow law of demeter as object chaining is removed
//and client doesn't know internal structure of wallet
