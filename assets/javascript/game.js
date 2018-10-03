var lettersUsedHTML = document.getElementById("lettersUsed");
var winsHTML = document.getElementById("wins");
var limbsHTML = document.getElementById("limbs");
var gameNameHTML = document.getElementById("gameName");

var game = {
  wins: 0,
  limbs: 6,
  gamesToGuess: ["zelda", "megaman", "metroid"],
  lettersCorrect: [],
  lettersUsed: ["#"],

  levelUp: function() {
    this.wins++;
    this.limbs = 6;
    winsHTML.innerHTML = this.wins;
    limbsHTML.innerHTML = this.limbs;
    this.lettersCorrect = [];
    this.lettersUsed = ["#"];
    lettersUsedHTML.innerHTML = this.lettersUsed;

    this.updateGameName();
  },

  resetGAME: function() {
    this.wins = 0;
    this.limbs = 6;
    this.lettersUsed = ["#"];
    this.lettersCorrect = [];
    document.getElementById("lettersUsed");
    lettersUsedHTML.innerHTML = this.lettersUsed;
    winsHTML.innerHTML = this.wins;
    limbsHTML.innerHTML = this.limbs;
    this.updateGameName();
  },

  updateGameName: function() {
    var name = "";
    console.log(this.gamesToGuess[this.wins].length);
    for (var i = 0; i < this.gamesToGuess[this.wins].length; i++) {
      if (this.lettersCorrect.includes(this.gamesToGuess[this.wins][i])) {
        name += this.gamesToGuess[this.wins][i];
      } else {
        name += "_ ";
      }
    }
    gameNameHTML.innerHTML = name;
  },

  updateGame: function(key) {
    if (key.length === 1 && key.charCodeAt(0) > 96 && key.charCodeAt(0) < 123) {
      if (
        this.gamesToGuess[this.wins].includes(key) &&
        !this.lettersCorrect.includes(key)
      ) {
        this.lettersCorrect.push(key);
        this.updateGameName();
        if (gameNameHTML.innerHTML.includes(this.gamesToGuess[this.wins])) {
          this.levelUp();
          if (this.wins === this.gamesToGuess.length) {
            alert("YOU WON!");
          }
        }
        this.updateGameName();
      } else if (
        !this.lettersUsed.includes(key) &&
        !this.lettersCorrect.includes(key)
      ) {
        this.lettersUsed.push(key);
        this.limbs--;
        limbsHTML.innerHTML = this.limbs;

        lettersUsedHTML.innerHTML = this.lettersUsed;
        if (this.limbs == 0) {
          this.resetGAME();
        }
      }
    }
  }
};

document.onkeyup = function(event) {
  var userKey = event.key.toLowerCase();
  game.updateGame(userKey);
};

game.resetGAME();
