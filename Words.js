var initialLetters = "abcdefghijklmnopqrstuvwxyz";

// import for initialLives (see initialize method in Words Constructor); Single source for lives
var initialLives = require("./game.js");

var Words = function(wordList) {
	// initial word list passed , which get's spliced, until all words are removed for duplication purposes
	this.wordList = wordList;
	// currentWord selected during the "hangman" game
	this.currentWord = "";
	// stores each word that is used for potential user validation
	this.selectedWords = [];
	// letters that is spliced and placed in used Letters array
	this.letters = initialLetters;
	// the hidden word displayed as a part of the title block
	this.hiddenWord = [];
	// letters that have been removed from the this.letters property
	this.usedLetters = [];
	// Method that selects a word
	this.selectWord = () => {
		var tempIndex = Math.floor(Math.random() * this.wordList.length);
		var tempWord = this.wordList.splice(tempIndex,1);
		this.currentWord = tempWord.join("").toLowerCase();
		// I don't recall the reason for the creation of the following commented code
		//   but will just comment this out, possible fix for something I found previously
		//-----------------------------------------------------------------------------------
		// if(this.selectedWords.indexOf(this.currentWord) === -1) {
		// 	this.selectedWords.push(this.currentWord);	
		// }
		//-----------------------------------------------------------------------------------
		for (var i = 0; i < this.currentWord.length;i++){
			this.hiddenWord.push("_");
		};	
	};
	// checks the userInput using the input from the inquirer.prompt for user guess and passing the player object for lives
	this.checkguess = (userInput, obj) => {
		if(this.currentWord.indexOf(userInput) === -1) {
			obj.lives--;
		};
		for(var i = 0; i < this.currentWord.length; i++) {
			if(this.currentWord[i] === userInput.toLowerCase()) {
				this.hiddenWord[i] = userInput.toLowerCase();
			};
		};
	};
	// method to increment wins
	this.youWin = (obj) => {
		obj.wins++;
	};
	// method to increment losses and the word spliced out of the wordList is placed back in if user losses on the current word
	this.youLose = (obj) => {
		this.wordList.push(this.currentWord);
		obj.losses++;
	};
	// method that determines the remaining letters
	this.remainingLetters = () => {
		var remLttrs = (this.hiddenWord).length - ((this.hiddenWord).join("")).replace(/_/g,"").length;
		if (remLttrs === 0) {
			return 0;
		}
	};
	// initializes the initial values
	this.initialize = (playerObj) => {
		this.currentWord = "";
		this.hiddenWord = [];
		this.usedLetters = [];
		this.selectWord();
		this.letters = initialLetters;
		playerObj.lives = initialLives;
	};
};

// exports the Words constructor
module.exports = Words;