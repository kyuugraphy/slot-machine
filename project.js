// 1. deposit money
// 2. determine number of lines to bet
// 3. collecta bet amount
// 4. spin the slot machine
// 5. check the winning
// 6. give user their winnings
// 7. play again (?)

//getting the user input -> use the installed package
// "we require input and make it a function"
const prompt = require("prompt-sync")();

const deposit = () => {
    while (true) {
        const depositAmount = prompt ("Enter a deposit amount: ");
        //now we need to convert it to a number, bcs input is default in string
        const numberDepositAmout = parseFloat(depositAmount);

        if (isNaN(numberDepositAmout) || numberDepositAmout <= 0) {
            console.log("Invalid deposit amount, try again.");
        } else {
            return numberDepositAmout;
        }
    }
};

const getNumberOfLines = () => {
    while (true) {
        const lines = prompt ("Enter a number of lines to bet on (1-3): ");
        //now we need to convert it to a number, bcs input is default in string
        const numberOfLines = parseFloat(lines);

        if (isNaN(numberOfLines) || numberOfLines >= 4 || numberOfLines <=0) {
            console.log("Invalid betting number of lines, try again.");
        } else {
            return numberOfLines;
        }
    }
}

const depositAmount = deposit();
const betLines = getNumberOfLines();
