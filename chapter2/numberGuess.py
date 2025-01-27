import random
import constants

def getRandomNumber():
    return random.randint(constants.STARTING_NUMBER,constants.ENDING_NUMBER)

def getValidUserInput():
    userInput = input("Please enter a number between"+ constants.STARTING_NUMBER+"and"+constants.ENDING_NUMBER)
    if not validateUserInput(userInput):
        userInput = getValidUserInput()
    return int(userInput)

def validateUserInput(userInput):
    return userInput.isdigit() and constants.STARTING_NUMBER <= int(userInput) <= constants.ENDING_NUMBER

def main():
    generatedRandomNumber = getRandomNumber()
    didGuessedCorrect = False
    guessedNumber = getValidUserInput()
    numberOfGuessesTillNow = 0
    while not didGuessedCorrect:
        numberOfGuessesTillNow += 1
        
        if guessedNumber < generatedRandomNumber:
            guessedNumber = input("Too low. Guess again")
        elif guessedNumber > generatedRandomNumber:
            guessedNumber = input("Too High. Guess again")
        else:
            print("You guessed it in",numberOfGuessesTillNow,"guesses!")
            didGuessedCorrect = True

main()
