//require to make sure you can access the letter.js file
let Letter = require('./letter.js');

function Word(wordArray) {
    this.wordArray = wordArray;
    this.letterArray = [];
}

Word.prototype = {
    createWord: function () {
        for (let i = 0; i < this.wordArray.length; i++) {
            let lettersToGuess = new Letter(this.wordArray[i]);
            this.letterArray.push(lettersToGuess);
        }
    },
    displayWord: function () {
        let wordDisplay = [];
        for (let i = 0; i < this.letterArray.length; i++) {
            wordDisplay.push(this.letterArray[i].guessDisplay());
        }
        return wordDisplay.join(" ");
    },
    checkGuess: function (guess) {
        for (let i = 0; i < this.letterArray.length; i++) {
            this.letterArray[i].userGuessCheck(guess);
        }
    }
}

module.exports = Word;