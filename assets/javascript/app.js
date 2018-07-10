let colorSchemes = [
    {
        name: "Basic",
        colors: ["radial-gradient(circle, red, #800000)", "radial-gradient(circle, orange, #B35900)", "radial-gradient(circle, yellow, goldenrod)", "radial-gradient(circle, lime, green)", "radial-gradient(circle, blue, darkBlue)", "radial-gradient(circle, blueViolet, rebeccaPurple)"]
    },
    {
        name: "Ocean",
        colors: ["radial-gradient(circle, lightcyan, cyan)",
        "radial-gradient(circle, khaki, darkkhaki)", "radial-gradient(circle, deepskyblue, dodgerblue)", "radial-gradient(circle, cornsilk, navajowhite)",
        "radial-gradient(circle, blue, darkBlue)",  "radial-gradient(circle, sandybrown, coral)"]
    },
    {
        name: "Forest",
        colors: ["radial-gradient(circle, lime, green)", "radial-gradient(circle, palegreen, springgreen)", "radial-gradient(circle, yellowgreen, olivedrab)", "radial-gradient(circle, chocolate, saddlebrown)", "radial-gradient(circle, sandybrown, peru)", "radial-gradient(circle, forestgreen, darkgreen)"]
    },
    {
        name: "Bright",
        colors: ["radial-gradient(circle, lime, green)", "radial-gradient(circle, deeppink, mediumvioletred)", "radial-gradient(circle, tomato, orangered)", "radial-gradient(circle, yellow, goldenrod)", "radial-gradient(circle, cyan, darkturquoise)", "radial-gradient(circle, magenta, darkmagenta)"]
    },
    {
        name: "Greyscale",
        colors: ["lightgrey", "slategrey", "darkslategrey", "darkgrey", "grey", "white"]
    }
];

let game = {
    colors: colorSchemes[0].colors,
    mastermind: [],
    playerGuess: ["", "", ""],
    state: "selectNum",
    selectValue: -1,
    colorCorrect: 0,
    placeCorrect: 0,
    numGuesses: 12,
    reset: function () {
        $("#player-guess").empty();
        $("#player-select").empty();
        game.selectValue = -1;
        game.playerGuess = ["", "", ""];
        game.createSequence();
        game.colorOptions();
    },
    easyGame: function () {
        $("#player-guess").empty();
        game.selectValue = -1;
        game.playerGuess = ["", "", "", ""];
        game.createSequence(3);
        game.colorGame(3);
    },
    mediumGame: function () {
        $("#player-guess").empty();
        game.selectValue = -1;
        game.playerGuess = ["", "", "", "", ""];
        game.createSequence(4);
        game.colorGame(4);
    },
    hardGame: function () {
        $("#player-guess").empty();
        selectValue = -1;
        game.createSequence(5);
        game.colorGame(5);
    },
    createSequence: function (num) {
        game.mastermind = [];
        for (let i = 0; i < num; i++) {
            let rand = Math.floor(Math.random() * game.colors.length);
            game.mastermind.push(game.colors[rand]);
        }
        console.log("Mastermind: " + game.mastermind)
    },
    colorOptions: function () {
        $("#player-select").empty();
        for (let i = 0; i < game.colors.length; i++) {
            let temp = $("<div>").addClass("color-option").attr("css-color", game.colors[i]).css("background", game.colors[i]);
            $("#player-select").append(temp);
        }
    },
    //Change the color scheme
    changeColorScheme: function () {
        //Get the index of the color scheme
        let numb = $(this).attr("place");
        //Only convert if color scheme exists
        if (numb < colorSchemes.length) {
            //Convert mastermind to new color scheme
            for (let i=0; i<game.mastermind.length; i++) {
                game.mastermind[i] = colorSchemes[numb].colors[game.colors.indexOf(game.mastermind[i])];
            }
            //Update color scheme in code and on screen
            game.colors = colorSchemes[numb].colors;
            game.colorOptions();
        } else {
            console.log("Not a valid location");
        }
    },
    //Place the appropriate number of circles based on the level the player wants to play at
    colorGame: function (num) {
        for (let j = 0; j < num; j++) {
            let idName = "guess" + j;
            let temp2 = $("<div>").addClass("player-guess").attr("css-color", "").attr("id", idName).attr("i-value", j);
            $("#player-guess").append(temp2);
        }
    },
    //Change the color of a circle
    changeColor: function () {
        if (game.selectValue >= 0 && game.selectValue < game.mastermind.length) {
            let color = $(this).attr("css-color");
            $("#guess" + game.selectValue).css("background", color).attr("css-color", color).css("border", "2px solid black");
            game.playerGuess[game.selectValue] = color;
            $(".player-guess-highlight").addClass("player-guess").removeClass("player-guess-highlight");
            game.selectValue = -1;
        }
    },
    //Select a circle to be able to change its color
    selectCircle: function () {
        let iValue = $(this).attr("i-value")
        if (iValue >= 0 && iValue < game.mastermind.length) {
            game.selectValue = iValue;
            $(".player-guess-highlight").addClass("player-guess").removeClass("player-guess-highlight");
            $(this).addClass("player-guess-highlight").removeClass("player-guess");
        }
    },
    displayThemes: function () {
        for (let i=0; i<colorSchemes.length; i++) {
            let themeBtn = $("<button>").text(colorSchemes[i].name).addClass("color-scheme").attr("place", i);
            $("#themes").append(themeBtn);
        }
    },
    checkGuess: function () {
        $(".player-guess-highlight").addClass("player-guess").removeClass("player-guess-highlight");
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
        if (game.placeCorrect === game.mastermind.length) {
            //Player Won!
            console.log("YOU WON!!");
            $("#player-guess").empty();
            let winMessage = $("<h1>").text("You Won!");
            $("#player-guess").append(winMessage);
        } else if (game.placeCorrect > game.colorCorrect) {
            console.log("ALL MESSED UP");
        }
    },
    colorCorrectCheck: function () {
        let masterTemp = game.copyArray(game.mastermind);
        for (let i = 0; i < game.playerGuess.length; i++) {
            if (masterTemp.includes(game.playerGuess[i])) {
                delete masterTemp[masterTemp.indexOf(game.playerGuess[i])];
                game.colorCorrect++;
            }
        }
    },
    placeCorrectCheck: function () {
        for (let i = 0; i < game.playerGuess.length; i++) {
            if (game.playerGuess[i] === game.mastermind[i]) {
                game.placeCorrect++;
            }
        }
    },
    copyArray: function (array) {
        let temp = [];
        for (let i = 0; i < array.length; i++) {
            temp[i] = array[i];
        }
        return temp;
    }
};

$(document).on("click", "#easy-game", game.easyGame);
$(document).on("click", "#medium-game", game.mediumGame);
$(document).on("click", "#hard-game", game.hardGame);
$(document).on("click", ".color-option", game.changeColor);
$(document).on("click", ".player-guess", game.selectCircle);
$(document).on("click", "#submit-guess", game.checkGuess);
$(document).on("click", ".color-scheme", game.changeColorScheme);
window.onload = function () {
    game.colorOptions();
    game.displayThemes();   
};
