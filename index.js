let Word = require('./word.js');
let inquirer = require('inquirer');

const wordListing = ["STRENGTH", "DEXTERITY", "CONSTITUTION", "INTELLIGENCE", "WISDOM", "CHARISMA", "BARBARIAN", "BARD", "CLERIC", "DRUID",
    "FIGHTER", "MONK", "PALADIN", "RANGER", "ROGUE", "SORCERER", "WARLOCK", "WIZARD"];

let selectWord = 0;
let chosenWord = "";
let gameWord = "";
let counter = 0;

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
    console.log("You have 12 guesses to find the D&D themed word!");
    askUserInput();
};

function askUserInput () {
    if (counter < 12) {
        console.log(gameWord.displayWord());
        inquirer.prompt([
            {
                type: "input",
                message: "Pick a single letter and press enter.",
                name: "letter"
            }
        ]).then(function(data) {
            checkAnswer(data);
        });
    } else {
        console.log("Sorry, you are out of guesses.");
        console.log(chosenWord);
        chosenWord = "";
        gameWord = "";
        selectWord = 0;
        counter = 0;
        runGame();
    }
};

function checkAnswer (data) {
    if ((data.letter.length === 1) && /^[a-zA-Z]+$/.test(data.letter)) {
        let makeUpper = data.letter.toUpperCase();
        let checkForCompare = gameWord.displayWord();
        gameWord.checkGuess(makeUpper);
        if (checkForCompare === gameWord.displayWord()) {
            console.log("Sorry, wrong letter!");
            counter++; 
            console.log((12 - counter) + " guesses remaining.");
            askUserInput();
        } else {
            correctGuess();
        }
    } else {
        console.log("Please enter a letter, one at a time.");
        askUserInput();
    }
};



runGame();