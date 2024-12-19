import random
def validateUserInput(userInput):
    if userInput.isdigit() and 1<= int(userInput) <=100:
        return True
    else:
        return False

def main():
    currectNumber=random.randint(1,100)
    didGuessedCorrectly=False
    guessedNumber=input("Guess a number between 1 and 100:")
    noOfGusses=0
    while not didGuessedCorrectly:
        if not validateUserInput(guessedNumber):
            guessedNumber=input("I wont count this one Please enter a number between 1 to 100")
            continue
        else:
            noOfGusses+=1
            guessedNumber=int(guessedNumber)

        if guessedNumber<currectNumber:
            guessedNumber=input("Too low. Guess again")
        elif guessedNumber>currectNumber:
            guessedNumber=input("Too High. Guess again")
        else:
            print("You guessed it in",noOfGusses,"guesses!")
            didGuessedCorrectly=True


main()