var playerStats = function() {
	this.playerGuess = 0;
	this.winningNumber = 0;
	this.guessList = [];
	this.numGuesses = 0;
	this.correctGuess = false;
};

playerStats.prototype.generateWinningNumber = function() {
	this.winningNumber = Math.floor(Math.random() * 100) + 1;
	console.log("winning number: " + this.winningNumber);
};

playerStats.prototype.playersGuessSubmission = function(){
	this.playerGuess = Number($('#guess').val());
	console.log("guess value : " + this.playerGuess);
	$('#guess').val('');
};

//player feedback message + lowerOrHigher function 
playerStats.prototype.guessMessage = function () {
	if (this.correctGuess) {
		$('#notification').text('Congrats, you won! A simple guessing game! ' +
			'You had 1 in a 100 chance, so in a way, you\'re the 1%. Nice going. Someone has something to say about this');
		$('#winnerGif').animate({opacity:'toggle',height:'toggle'});
	}
	else {
		var directionality = '';
		if (this.playerGuess > this.winningNumber) {
			directionality = 'above';
		}
		else {
			directionality = 'below';
		}
		var guessRange = Math.abs(Number(this.playerGuess) - 
		Number(this.winningNumber)) + Math.floor(Math.random() * 15) + 1;
		var playerNote = 'And that\'s a bad miss.\n Your guess is ' 
			+ directionality + ' and is within ' + guessRange + ' of the actual number.';
		
		if (this.playerGuess == this.guessList[this.guessList.length - 2] && this.numGuesses > 1 ) {
			playerNote += '<br> Really? Again? What did you think would happen?';
		}
		$('#notification').html(playerNote);
		
		$('#previousGuesses').text(this.guessList.join(', '));
		$('#remaining').text(5 - this.numGuesses);
		
		if (this.numGuesses >= 5) {
			$('#notification').text('And it looks like you are out of the game! \n' +
				'Hit Reset to play again.');
		}
	}

};

playerStats.prototype.checkGuess = function() {
	this.playersGuessSubmission();
	if (this.winningNumber == 0) {
		this.generateWinningNumber();
	}
	if (this.playerGuess == 0) {
		alert("Valid number between 1-100, c'mon man!");
		this.numGuesses--;
	}
	if (this.numGuesses >= 5) {
		alert("No more guesses!");
	}
	else {
		if (this.playerGuess == this.winningNumber) {
			this.correctGuess = true;
		}
		else {
			this.guessList.push(this.playerGuess);
			this.numGuesses++;
		}
		this.guessMessage();	
	}
};

playerStats.prototype.provideHint = function(){
	if (this.winningNumber == 0) {
		$('#notification').text("You haven't even guessed! C'mon man");
	}
	else {
		$('#notification').text('the number you\'re looking for is ' + 
		this.winningNumber + ', are you happy now? ');	
	}	
};

playerStats.prototype.numberWang = function() {
	if (this.winningNumber == 0 || this.numGuesses > 5) {
		$('#notification').text("No no, no numberWang-ing for you. " + 
			"Something is not right, you must be mid game to numberWang!");
	}
	else {
		//wrapping the reversal code block in a function express causes game 
		// to freeze.
		var forward = this.winningNumber;
		var reverse = 0;
		while (forward !== 0) {
			reverse = reverse * 10 + forward % 10;
			forward = Math.floor(forward / 10);
		}
		this.winningNumber = reverse;
		alert("The winning number is now reversed!");
		console.log("The winning number is now reversed!");
	}
};


playerStats.prototype.playAgain = function() {
	alert("Jeez, you like this game that much? Really? Well.. ok then ")	
	this.playerGuess = 0;
	this.guessList = [];
	this.numGuesses = 0;
	this.correctGuess = false;
	this.generateWinningNumber();
	$('#guess').val('');
	$('#notification').html('Enter a number between 1-100!<br/>'
			+ 'Exclamation points!!!');
	$('#previousGuesses').text('');
	$('#remaining').text('5');
	$('#winnerGif').animate({opacity:'toggle',height:'toggle'});
};
	
// int main()

var player1 = new playerStats();

/* **** Event Listeners/Handlers ****  */
$(document).ready(function() {
	console.log("DOM is loaded");
 	$('#submit').on('click',player1.checkGuess.bind(player1));
 	$('#hint').on('click', player1.provideHint.bind(player1));
 	$('#reset').on('click', player1.playAgain.bind(player1));
 	$('#numberwang').on('click', player1.numberWang.bind(player1));
});


