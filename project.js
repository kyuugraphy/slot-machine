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

// 2. determine number of lines to bet

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

// 3. collecta bet amount

const getBet = (balance, lines) => {
    
        while (true) {
            const bet = prompt ("Enter a bet per line: ");
            //now we need to convert it to a number, bcs input is default in string
            const numberBet = parseFloat(bet);
    
            if (isNaN(numberBet) || numberBet <=0 || numberBet > (balance / lines)) {
                console.log("Invalid bet, try again.");
            } else {
                return numberBet;
            }
        }
    
    
}



let balance = deposit(); // adjusts value of the variable
const betLines = getNumberOfLines(); //constant is immutable after being assigned the value
const bet = getBet(balance, betLines);