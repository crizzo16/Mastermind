
let game = {
    colors: ["radial-gradient(circle, red, fireBrick)", "radial-gradient(circle, orange, orangeRed)", "radial-gradient(circle, yellow, goldenrod)", "radial-gradient(circle, lime, green)", "radial-gradient(circle, blue, darkBlue)", "radial-gradient(circle, blueViolet, rebeccaPurple)"],
    mastermind: [],
    playerGuess: ["", "", "", ""],
    state: "selectNum",
    selectValue: -1,
    colorCorrect: 0,
    placeCorrect: 0,
    numGuesses: 12,
    reset: function () {
        $("#player-guess").empty();
        $("#player-select").empty();
        selectValue = -1;
        game.createSequence();
        game.colorOptions();
    },
    createSequence: function () {
        game.mastermind = [];
        for (let i = 0; i < 4; i++) {
            let rand = Math.floor(Math.random() * game.colors.length);
            game.mastermind.push(game.colors[rand]);
        }
        console.log("Mastermind: " + game.mastermind)
    },
    colorOptions: function () {
        for (let i = 0; i < game.colors.length; i++) {
            let temp = $("<div>").addClass("color-option").attr("css-color", game.colors[i]).css("background", game.colors[i]);
            $("#player-select").append(temp);
        }

        for (let j = 0; j < 4; j++) {
            let idName = "guess" + j;
            let temp2 = $("<div>").addClass("player-guess").attr("css-color", "").attr("id", idName).attr("i-value", j);
            $("#player-guess").append(temp2);
        }
    },
    changeColor: function () {
        if (game.selectValue >= 0 && game.selectValue <= 4) {
            let color = $(this).attr("css-color");
            $("#guess" + game.selectValue).css("background", color).attr("css-color", color);
            game.playerGuess[game.selectValue] = color;
        }
    },
    selectCircle: function () {
        let iValue = $(this).attr("i-value")
        if (iValue >= 0 && iValue <= 4) {
            game.selectValue = iValue;
            $(".player-guess-highlight").addClass("player-guess").removeClass("player-guess-highlight");
            $(this).addClass("player-guess-highlight").removeClass("player-guess");
        }
    },
    checkGuess: function () {
        //console.log("mastermind: " + game.mastermind);
        //console.log("player guess: " + game.playerGuess);

        //Check to see how many are the correct color
        game.colorCorrect = 0;
        game.colorCorrectCheck();
        $("#correct-color").text(game.colorCorrect);
        //console.log("colorCorrect: " + game.colorCorrect);

        //Check to see how many are in the right place
        game.placeCorrect = 0;
        game.placeCorrectCheck();
        $("#correct-place").text(game.placeCorrect); 
        //console.log("placeCorrect: " + game.placeCorrect);

        //Check to see if won
        if (game.placeCorrect === 4) {
            //Player Won!
            console.log("YOU WON!!");
        } else if (game.placeCorrect > game.colorCorrect) {
            console.log("ALL MESSED UP");
        }
    },
    colorCorrectCheck: function () {
        let masterTemp = game.copyArray(game.mastermind);
        for (let i=0; i<game.playerGuess.length; i++) {
            if (masterTemp.includes(game.playerGuess[i])) {
                delete masterTemp[masterTemp.indexOf(game.playerGuess[i])];
                game.colorCorrect++;
            }
        }
    },
    placeCorrectCheck: function () {
        for (let i=0; i<game.playerGuess.length; i++) {
            if (game.playerGuess[i] === game.mastermind[i]) {
                game.placeCorrect++;
            }
        }
    },
    copyArray: function (array) {
        let temp = [];
        for (let i=0; i<array.length; i++) {
            temp[i] = array[i];
        }
        return temp;
    }
};

$(document).on("click", "#temp-button", game.reset);
$(document).on("click", ".color-option", game.changeColor);
$(document).on("click", ".player-guess", game.selectCircle);
$(document).on("click", "#submit-guess", game.checkGuess);
//$(document).ready(game.reset);
