import random
def getRandomDiceDigit(maxDiceDigit):
    currentDiceDigit=random.randint(1, maxDiceDigit)
    return currentDiceDigit


def main():
    maxDiceDigit=6
    isGameContinue=True
    while isGameContinue:
        continueRolling = input("Ready to roll? Enter Q to Quit")
        if continueRolling.lower() !="q":
            currentDiceDigit=getRandomDiceDigit(maxDiceDigit)
            print("You have rolled a",currentDiceDigit)
        else:
            isGameContinue=False
