var lettersUsedHTML = document.getElementById("lettersUsed");
var winsHTML = document.getElementById("wins");
var limbsHTML = document.getElementById("limbs");
var gameNameHTML = document.getElementById("gameName");
var instructionsHTML = document.getElementById("instructions");
var mainElement = document.getElementById("main");

var zeldaMusic = document.getElementById("zeldaTheme");
var megamanMusic = document.getElementById("megamanTheme");
var metroidMusic = document.getElementById("metroidTheme");
console.log(zeldaMusic);
var levelUpMusic = document.getElementById("levelUp");
var gameOverMusic = document.getElementById("gameOver");
var letterRightMusic = document.getElementById("letterRight");
var letterWrongMusic = document.getElementById("letterWrong");

var game = {
  wins: 0,
  limbs: 6,
  gamesToGuess: ["zelda", "megaman", "metroid"],
  lettersCorrect: [],
  lettersUsed: ["#"],


  levelUp: function () {
    this.wins++;
    this.limbs = 6;
    winsHTML.innerHTML = this.wins;
    limbsHTML.innerHTML = this.limbs;
    this.lettersCorrect = [];
    this.lettersUsed = ["#"];
    lettersUsedHTML.innerHTML = this.lettersUsed;
    levelUpMusic.load();
    levelUpMusic.play();

    switch (this.wins) {
      case 1:
        zeldaMusic.pause();
        megamanMusic.load();
        megamanMusic.loop = true;
        megamanMusic.play();
        break;
      case 2:
        megamanMusic.pause();
        metroidMusic.load();
        metroidMusic.loop = true;
        metroidMusic.play();
    }

  },

  resetGAME: function () {

    this.wins = 0;
    this.limbs = 6;
    this.lettersUsed = ["#"];
    this.lettersCorrect = [];
    document.getElementById("lettersUsed");
    lettersUsedHTML.innerHTML = this.lettersUsed;
    winsHTML.innerHTML = this.wins;
    limbsHTML.innerHTML = this.limbs;
    mainElement.id = "zelda";
    zeldaMusic.volume = 0.03;
    megamanMusic.volume = 0.03;
    metroidMusic.volume = 0.03;
    gameOverMusic.volume = 0.03;
    levelUpMusic.volume = 0.03;
    letterRightMusic.volume = 0.03;
    letterWrongMusic.volume = 0.03;

    if (!megamanMusic.paused) {
      megamanMusic.pause();
    } else if (!metroidMusic.paused) {
      metroidMusic.pause();
    } else if (!zeldaMusic.pause) {
      zeldaMusic.pause();
    }
    zeldaMusic.load();
    zeldaMusic.play();

    this.updateGameName();
  },

  updateGameName: function () {
    var name = "";
    for (var i = 0; i < this.gamesToGuess[this.wins].length; i++) {
      if (this.lettersCorrect.includes(this.gamesToGuess[this.wins][i])) {
        name += this.gamesToGuess[this.wins][i].toUpperCase() + " ";
      } else {
        name += "_ ";
      }
    }
    gameNameHTML.innerHTML = name;
  },

  updateGame: function (key) {
    if (zeldaMusic.volume > 0.03) {
      zeldaMusic.volume = 0.03;
      megamanMusic.volume = 0.03;
      metroidMusic.volume = 0.03;
      gameOverMusic.volume = 0.03;
      levelUpMusic.volume = 0.03;
      letterRightMusic.volume = 0.03;
      letterWrongMusic.volume = 0.03;
    }

    switch (this.wins) {
      case 0:
      if(zeldaMusic.currentTime < 5){
        zeldaMusic.play();
      }
      break;
      case 1:
        mainElement.id = "megaman";
        break;
      case 2:
        mainElement.id = "metroid";
        break;
      default:
        break;

    }


    if (this.wins === this.gamesToGuess.length) {
      alert("YOU WON THE GAME!");
      if (confirm("Want to play again?")) {

        this.resetGAME();
      }
    }
    this.updateGameName();
    instructionsHTML.innerHTML = "Press ENTER when word is done."

    if (key.length === 1 && key.charCodeAt(0) > 96 && key.charCodeAt(0) < 123) {
      if (
        this.gamesToGuess[this.wins].includes(key) &&
        !this.lettersCorrect.includes(key)
      ) {
        this.lettersCorrect.push(key);
        letterRightMusic.load();
        letterRightMusic.play();
        this.updateGameName();
        if (gameNameHTML.innerHTML.replace(/ /g, "") == this.gamesToGuess[this.wins].toUpperCase()) {
          this.levelUp();
        }

      } else if (
        !this.lettersUsed.includes(key) &&
        !this.lettersCorrect.includes(key)
      ) {
        this.lettersUsed.push(key);
        letterWrongMusic.load();
        letterWrongMusic.play();
        this.limbs--;
        limbsHTML.innerHTML = this.limbs;
        lettersUsedHTML.innerHTML = this.lettersUsed.toString().toUpperCase().replace(/,/g, " ");
        if (this.limbs == 0) {
          gameOverMusic.load();
          gameOverMusic.play();
          this.resetGAME();
        }
      }
    }

    if (key.toLowerCase() === " ") {
      if (zeldaMusic.volume < 0.03) {
      zeldaMusic.volume = 0.03;
      megamanMusic.volume = 0.03;
      metroidMusic.volume = 0.03;
      gameOverMusic.volume = 0.03;
      levelUpMusic.volume = 0.03;
      letterRightMusic.volume = 0.03;
      letterWrongMusic.volume = 0.03;
      } else {
        zeldaMusic.volume = 0;
        megamanMusic.volume = 0;
        metroidMusic.volume = 0;
        gameOverMusic.volume = 0;
        levelUpMusic.volume = 0;
        letterRightMusic.volume = 0;
        letterWrongMusic.volume = 0;
      }
    }
  }


}

document.onkeyup = function (event) {
  var userKey = event.key.toLowerCase();
  game.updateGame(userKey);
};

game.resetGAME();
