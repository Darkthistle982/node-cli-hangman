//constructor to build out the letters for the game.
function Letter(letterGuessed) {
    this.letterGuessed = letterGuessed;
    this.isGuessed = false;
}
//functions to verify the letters being guessed and substituting underscores for letters in the display
Letter.prototype = {
    guessDisplay: function () {
        if (this.letterGuessed === " ") {
            return " "
        }
        else if (!this.isGuessed) {
            return "_";
        } else {
            return this.letterGuessed;
        }
    },
    //function to compare the userinput letter to the chosen words letters and if there is a match the isGuessed to true
    userGuessCheck: function (userGuess) {
        if (userGuess === this.letterGuessed) {
            this.isGuessed = true;
        }
    }
}

module.exports = Letter;