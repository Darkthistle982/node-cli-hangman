function Letter(letterGuessed) {
    this.letterGuessed = letterGuessed;
    this.isGuessed = false;
}

Letter.prototype = {
    guessDisplay: function () {
        if (!this.letterGuessed) {
            return "_";
        } else {
            return this.letterGuessed;
        }
    },
    userGuessCheck: function (userGuess) {
        if (userGuess === this.letterGuessed) {
            this.isGuessed = true;
        }
    }
}

module.exports = Letter;