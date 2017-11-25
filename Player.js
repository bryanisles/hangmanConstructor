var initialLives = require("./game.js"); 


// Takes a string and makes the first letter of the string uppercase
var toTitleCase = (str) => {
	var strArray = str.split("");
	strArray[0] = strArray[0].toUpperCase();
	str = strArray.join("");
	return str; 
}

// Player Constructor
var Player = function() {
	this.lives = initialLives;
	this.wins = 0;
	this.losses = 0;
	this.getAll = () => {
		for(key in this) {
			if(typeof this[key] != 'function') {
				console.log("",toTitleCase(key) +":",this[key]);
			};
		};
	};
};

// exports the Player Constructor
module.exports = Player;