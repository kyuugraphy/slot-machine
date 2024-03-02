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

// (4) define how big the slot machine is and how many symbols we potentially have in earch row (= number of rows (*) and columns (*) (=reels) and number (*) of symbols appearing in each reel)
// then we need to know how many (*) symbols we have in total
// and what is the value (*) of each symbol -> defines a payout structure

const ROWS = 3; //global constances in CAPS LOCK
const COLS = 3;
const SYMBOLS_COUNT = { // symbols you can have in each reel / column
    A: 2,
    B: 4,
    C: 6,
    D: 8
};
const SYMBOL_VALUES = {
    A: 5,
    B: 4,
    C: 3,
    D: 2
};


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
};

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
    
    
};

// 4. spinning
const spin = () => {
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)){
        for (let i = 0; i < count; i++) {
            symbols.push(symbol);
        }
    }
    const reels = [];
    for (let i =0; i < COLS; i++){
        reels.push([]);
        const reelSymbols = [...symbols]; // copies the symbols we have available to choose for each reel into another array "reelSymbols"
        for (let j = 0; j < ROWS; j++) {
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol); // we need to add to the reel in the correct row
            reelSymbols.splice(randomIndex, 1); // 1 - remove 1 element, randomIndex = position where we're removing the element

        }
    }
    return reels;
};


/*
5. check if the player won anything
--> we need to transpose a matrix/array [A B] [C D] -> [A C] [B D]
*/

const transpose = (reels) => {
    const rows = [];

    for (let i = 0; i < ROWS; i++) {
        rows.push([]);
        for (let j = 0; j < COLS; j++) {
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
};


const printRows = (rows) => {
    for (const row of rows){
        let rowString = "";
        for (const[i, symbol] of row.entries()){
            rowString += symbol; // concatenating / adding element into the string
            if (i != row.length - 1){
                rowString += " | "
            }
        }
        console.log(rowString);
    }
};


const getWinnings = (rows, bet, lines) => {
    let winnings = 0;
    for (let row = 0; row < lines; row++) {
        const symbols = rows[row];
        let allSame = true;

        for (const symbol of symbols) {
            if (symbol != symbols[0]){ //compares all the symbols to the 1st and has to be the same
                allSame = false;
                break; // exits the for loop -> we did not win in this specific row
            }
        }

        if (allSame) {
            winnings += bet * SYMBOL_VALUES[symbols[0]]; // grab 1st symbol, take the value and multiply it by bet
        }
    }
    return winnings;
};

// 6. give user their winnings

const game = () => {

    let balance = deposit(); // adjusts value of the variable
    while (true){
        console.log("You have a balance $ " + balance.toString())
        const betLines = getNumberOfLines(); //constant is immutable after being assigned the value
        const bet = getBet(balance, betLines);
        balance -= bet * betLines;
        const reels = spin();
        const rows = transpose(reels);
        console.log(reels);
        console.log(rows);
        printRows(rows);
        const winning = getWinnings(rows, bet, betLines)
        balance += winning;
        console.log("You won, $" + winning.toString())

        if (balance <= 0) {
            console.log("You ran out of money!");
            break;
        }
        const playAgain = prompt("Do you want to play again (y/n)? ");
        if (playAgain != "y") break;
    }
}

game();

