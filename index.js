let Word = require('./word.js');
let inquirer = require('inquirer');

const wordListing = ["STRENGTH", "DEXTERITY", "CONSTITUTION", "INTELLIGENCE", "WISDOM", "CHARISMA", "BARBARIAN", "BARD", "CLERIC", "DRUID",
 "FIGHTER", "MONK", "PALADIN", "RANGER", "ROGUE", "SORCERER", "WARLOCK", "WIZARD"];

 let selectWord = 0;
 let chosenWord = "";
 let gameWord = "";
 let counter = 0;

 function runGame() {
     if (wordListing.length < 1)
 }
