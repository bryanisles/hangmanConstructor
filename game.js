// InitialValues
var initialLives = 6;
module.exports = initialLives;

// inserts the required npm modules
var inquirer = require("inquirer");
var fs = require("fs");

// inserts the required constructors
var Player = require("./Player.js");
var Words = require("./Words.js");

// Definition of words
var myWords = ["Bootcamp", "Northwestern", "Coding", "Programming","Javascript","HTML","CSS","Bootstrap","JQuery", "Materialize", "SASS"];

// creates an object using a Constructor
var game = new Words(myWords);
var me = new Player();

// temporary assignment for the letters property in the Words Constructor / game object
var letArr;

// console to clear terminal window
console.reset = function () {
	process.stdout.write('\033c');
};

// Provides a title block for the game containing Title, players lives, wins, losses, and the word to guess
var mainDisplay = () => {
	console.reset();
	console.log("\n ██╗███╗   ██╗ ██████╗ ██████╗  ██████╗ ███╗   ██╗██╗██╗████████╗ ██████╗ ");
	console.log(" ██║████╗  ██║██╔════╝██╔═══██╗██╔════╝ ████╗  ██║██║██║╚══██╔══╝██╔═══██╗");
	console.log(" ██║██╔██╗ ██║██║     ██║   ██║██║  ███╗██╔██╗ ██║██║██║   ██║   ██║   ██║");
	console.log(" ██║██║╚██╗██║██║     ██║   ██║██║   ██║██║╚██╗██║██║██║   ██║   ██║   ██║");
	console.log(" ██║██║ ╚████║╚██████╗╚██████╔╝╚██████╔╝██║ ╚████║██║██║   ██║   ╚██████╔╝");
	console.log(" ╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝╚═╝╚═╝   ╚═╝    ╚═════╝ ");
	console.log("                                                      A quasi-Hangman Game");
	//ASCII Art Generated from http://patorjk.com/software/taag/
	console.log(" -------------------------------------------------------------------------");
	me.getAll();
	console.log(" Used Letters:",game.usedLetters.join(" "),"\n");
	console.log("",game.hiddenWord.join(" "));
	console.log("\n -------------------------------------------------------------------------");
};

// intializes/reinitializes the game object (see Words.js for more details on the Constructor)
game.initialize(me);

var startGame = function() {
	mainDisplay();
	if(me.lives > 0){
		inquirer.prompt(
		[
			{
				type: "input",
				name: "letter",
				message: "Guess a letter",
				validate: (letter) => {
					switch(true) {
						case (letter === ""):
							return "Please select a letter";
						case ((game.usedLetters).indexOf(letter.toLowerCase()) > -1):
							return letter + " has already been selected";
						case ((game.letters).indexOf(letter.toLowerCase()) == -1 || letter.length > 1):
							return letter + " is not an applicable entry";
						default:
							return true;
					};
				}
			}
		]).then(answers => {
			game.checkguess(answers.letter, me);
			game.remainingLetters();
			var letIndex = game.letters.indexOf(answers.letter);
			var tempHold;
			letArr = game.letters.split("");
			tempHold = letArr.splice(letIndex, 1); // stores a single value array
			game.usedLetters.push(tempHold.join(""));  // collapse array to a string using join
			game.letters = letArr.join("");
			if(game.remainingLetters() === 0 || me.lives === 0) {
				if(me.lives === 0){
					game.youLose(me);
					mainDisplay();
					console.log(" You Lose");
				} else {
					game.youWin(me);
					mainDisplay();
					if(game.wordList.length === 0) {
						return console.log(" All words have been guessed successfully");	
					} else {
						console.log(" You Win");
					}
				}
				inquirer.prompt([
					{
						type: "confirm",
						name: "confirm",
						message: "Do you want to play again?",
					}
				]).then(answers => {
					if(answers.confirm) {
						game.initialize(me);
						startGame()	
					} else {
						return console.log(" Thanks for Playing");
					};
				});
			} else {
				startGame();
			};
		});
	};
};

// initial start
startGame();


