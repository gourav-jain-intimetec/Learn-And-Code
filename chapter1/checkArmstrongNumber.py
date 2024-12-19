def calculateDigitPowerSum(enteredNumber):
    sumOfDigits = 0
    noOfDigits = 0

    tempEnteredNumber = enteredNumber
    while tempEnteredNumber > 0:
        noOfDigits += 1
        tempEnteredNumber //= 10

    tempEnteredNumber = enteredNumber
    for n in range(1, tempEnteredNumber + 1):
        currentDigit = tempEnteredNumber % 10
        sumOfDigits = sumOfDigits + (currentDigit ** noOfDigits)
        tempEnteredNumber //= 10
    return sumOfDigits

enteredNumber = int(input("\nPlease Enter the Number to Check for Armstrong: "))

if (enteredNumber == calculateDigitPowerSum(enteredNumber)):
    print("\n %d is Armstrong Number.\n" % enteredNumber)
else:
    print("\n %d is Not a Armstrong Number.\n" % enteredNumber)