// //require statements to make sure we can access the word.js file and the inquirer npm
const Word = require('./word.js');
const inquirer = require('inquirer');
// //array containing all the possible words for the game
const wordListing = ["STRENGTH", "DEXTERITY", "CONSTITUTION", "INTELLIGENCE", "WISDOM", "CHARISMA", "BARBARIAN", "BARD", "CLERIC", "DRUID",
    "FIGHTER", "MONK", "PALADIN", "RANGER", "ROGUE", "SORCERER", "WARLOCK", "WIZARD"];
// //variable to hold the starting state data for the game
let selectWord = 0;
let chosenWord = "";
let gameWord = "";
let counter = 0;
// // function to run the game which will also refill the wordListing array if it is down to the last word
function runGame() {
    if (wordListing.length < 2) {
        wordListing = ["STRENGTH", "DEXTERITY", "CONSTITUTION", "INTELLIGENCE", "WISDOM", "CHARISMA", "BARBARIAN", "BARD", "CLERIC", "DRUID",
            "FIGHTER", "MONK", "PALADIN", "RANGER", "ROGUE", "SORCERER", "WARLOCK", "WIZARD"];
    }
    selectWord = Math.floor(Math.random() * wordListing.length);
    chosenWord = wordListing[selectWord];
    gameWord = new Word(chosenWord);
    gameWord.createWord();
    if (selectWord > -1) {
        wordListing.splice(selectWord, 1);
    }
    console.log("You have 8 guesses to find the D&D themed word!");
    askUserInput();
};
// // function to prompt the user with inquirer and gather their data
function askUserInput() {
    if (counter < 8) {
        console.log(gameWord.displayWord());
        inquirer.prompt([
            {
                type: "input",
                message: "Pick a single letter and press enter.",
                name: "letter"
            }
        ]).then(function (data) {
            checkAnswer(data);
        })
    } else {
        console.log("Sorry, you are out of guesses.");
        console.log("The Word was " + chosenWord);
        resetGameStats();
        runGame();
    }
};
//function to convert the chosen character, and check if it is a letter for validity using a regular expression. 
// it also makes it uppercase to make the match logic easier to manage.
function checkAnswer(data) {
    if (/^[a-z]$/i.test(data.letter)) {
        let makeUpper = data.letter.toUpperCase();
        let checkForCompare = gameWord.displayWord();
        gameWord.checkGuess(makeUpper);
        if (checkForCompare === gameWord.displayWord()) {
            console.log("Sorry, wrong letter!");
            counter++;
            console.log((8 - counter) + " guesses remaining.");
            askUserInput();
        } else {
            correctGuess();
        }
    } else {
        console.log("Please enter a letter, one at a time.");
        askUserInput();
    }
};
// //function to manage the correct guess, and if the whole word is solved, reset the starting state, and run the game
function correctGuess() {
    console.log("You guessed correctly! Good Job!");
    if (chosenWord.replace(/ /g, "") == (gameWord.displayWord()).replace(/ /g, "")) {
        console.log(gameWord.displayWord());
        console.log("You Won!");
        resetGameStats();
        runGame();
    } else {
        askUserInput();
    }
};
// //function used to reset the game stats upon either a win or loss.
function resetGameStats() {
    chosenWord = "";
    gameWord = "";
    selectWord = 0;
    counter = 0;
};
// //initial call to make sure as soon as the node index.js command is given in the console, the game is started.
runGame();