//-------------------------------------------------------------------------------------------------
//
// Global Variables
//
//-------------------------------------------------------------------------------------------------

const maxStarsRating = 3;
let equalityResponseTimeout
let gameTimeSeconds = 0;
let gameMoves = 0;
let gameStars = 3;

//-------------------------------------------------------------------------------------------------
//
// DOM Creation
//
//-------------------------------------------------------------------------------------------------

//-------------------------------------------------------------------------------------------------
// Welcome
//-------------------------------------------------------------------------------------------------

/**
 * @description: Destroy the welcome modal.
 */
function destroyWelcome(){
	const welcomeModal = $('.welcome')
	welcomeModal.fadeOut(400, function(){
		welcomeModal.remove();		
	});
}

//-------------------------------------------------------------------------------------------------
// Build Game
//-------------------------------------------------------------------------------------------------

/**
 * @description: Build the game elements.
 */
function buildGame(){
	console.log('Building the game.')
	// Set global game variable values
	gameTimeSeconds = 0;
	gameMoves = 0;	
	gameStars = 3;
	// Build basic DOM
	$('body').append('<div class="game-container"></div>');
	const gameContainerObj = $('.game-container');
	gameContainerObj.append('<header><h1 class="header-text title-text">RememberMe!</h1></header>');
	gameContainerObj.append('<main></main>');
	$('main').append('<div class="main-inner"></div>');
	const mainInnerObj = $('.main-inner');
	mainInnerObj.append('<div class="menu"></div>');
	const menuObj = $('.menu');
	menuObj.append('<span id="moves-counter"></span>');
	menuObj.append('<span id="stars-display"></span>');
	menuObj.append('<span id="timer"></span>');
	menuObj.append('<span><button class="restart-button">Restart</button></span>');
	mainInnerObj.append('<div class="card-area"></div>');
	gameContainerObj.append('<footer></footer>');
	$('footer').append('<span>Created for the Udacity Nanodegree <a target="_blank" href="https://www.udacity.com/course/intro-to-programming-nanodegree--nd000">"Intro to Programming"</a></span>');
	// Fill DOM
	writeToTimer(createTimeString(gameTimeSeconds));
	writeToMovesCounter(createMovesString(gameMoves));
	writeToStarsDisplay(createStarsString(gameStars, maxStarsRating));	
	createCards();
	$('.card-area').fadeTo(400, 1.0);
	createGameStartEventListener();
}

/**
 * @description: Destroy the game elements.
 */
function destroyGame(){
	console.log('Destroying the game.');
	$('.game-container').remove();
	// destroyCards();
}

//-------------------------------------------------------------------------------------------------
// Cards Creation
//-------------------------------------------------------------------------------------------------

/**
 * @description: Return an array of 8 (unique) html symbol strings.
 * @returns: Array of 8 (unique) html symbol strings.
 */
function getArrayOfSymbols(){
	const symbols = ['&#9728;',
				   	 '&#9729;',
				   	 '&#9730;',
				   	 '&#9731;',
				   	 '&#9752;',
				   	 '&#9774;',
				   	 '&#9786;',
				   	 '&#9822;'
	];
	console.log('Symbols = ' + symbols);
	return symbols;
}

/**
 * @description: Duplicate every item of an array.
 * @param: {array} symbols - Array of unique symbols.
 * @returns: {array} Array with each item occurring twice.
 */
function doubleArrayOfSymbols(symbols){
	let symbolsDoubled = [];
	symbols.forEach(function(item){
		symbolsDoubled.push(item);
		symbolsDoubled.push(item);
	});
	return symbolsDoubled;
}

/**
 * @description: Create random integer in the range defined (range beginning and end are included).
 * @param: {number} min - beginning of range to create the integer from.
 * @param: {number} max - end of range to create the integer from.
 * @see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 */
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

/**
 * @description: Shuffle items of array into a random order. Shuffling is based on Dustenfeld algorithm.
 * @param: {array} inputArray - Array to be shuffled.
 * @returns: {array} Input array in a randomly shuffled order.
 * @see: : https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
 */
function shuffleArray(inputArray){
	const maxIndex = inputArray.length - 1;
	let currentIndex = 0;
	let randomIndex = 0;
	let tempValue;

	while (currentIndex <= maxIndex){
		randomIndex = getRandomIntInclusive(currentIndex, maxIndex);
		tempValue = inputArray[currentIndex];
		inputArray[currentIndex] = inputArray[randomIndex];
		inputArray[randomIndex] = tempValue;
		currentIndex += 1;
	}
	return inputArray;
}

/**
 * @description: Create an array of 16 symbols in random order. Each symbol occurs twice.
 * @returns: Array of 16 symbols in random order. Each symbol occurs twice.
 */
function getRandomSymbolArray(){
	const symbols = getArrayOfSymbols();
	const symbolsDoubled = doubleArrayOfSymbols(symbols);
	// const symbolsShuffled = shuffleArray(symbolsDoubled);
	const symbolsShuffled = symbolsDoubled;
	return symbolsShuffled;
}

/**
 * @description: Add 16 cards (8 symbols -- always two cards with same symbol) to card area.
 */
function createCards(){
	const symbols = getRandomSymbolArray();
	const cardsPerRow = 4;
	const cardsPerColumn = 4;
	let currentCardNumber = 0;
	let lastCardCreated;

	for (let row = 1; row <= cardsPerRow; row++) {
		for (let column = 1; column <= cardsPerColumn; column++){
			currentCardNumber += 1;
			symbolIndex = currentCardNumber - 1;
			currentSymbol = symbols[symbolIndex];
			// $('.card-area').append('<div class="card-spacer"><div class="card-content"><div class="card-face">' + currentSymbol + '</div><div class="card-back">Back</div></div></div>');
			$('.card-area').append('<div class="card-spacer"><div class="card-content card-face">' + currentSymbol + '</div><div class="card-content card-back">Back</div></div></div>');
		}
	}
}

/**
 * @description: Fade out the opacity of the card area
 */
function fadeOutCardArea(){
	$('.card-area').fadeTo(400, 0.0);
}

//-------------------------------------------------------------------------------------------------
// Congratulations
//-------------------------------------------------------------------------------------------------

/**
 * @description: Display congratulations message when game is won in a modal.
 */
function buildCongratulations(){
	// Create congratulations modal
	console.log("Creating the congratulations modal");
	$('body').append('<div class="congratulations"></div>');
	const congratulationsModal = $('.congratulations');
	congratulationsModal.append('<div class="congratulations-content"></div>');
	const congratulationsContentObj = $('.congratulations-content');
	congratulationsContentObj.append('<div class="congratulations-above-title">Congratulations</div>');
	congratulationsContentObj.append('<div class="congratulations-title title-text">YOU WIN!</div>');
	congratulationsContentObj.append('<table class="congratulations-stats"></table>');
	const congratulationsStatsObj = $('.congratulations-stats');
	congratulationsStatsObj.append('<tr><td>Stars</td><td>' + createStarsString(gameStars, maxStarsRating) + '</td></tr>');
	congratulationsStatsObj.append('<tr><td>Moves</td><td>' + gameMoves + '</td></tr>');
	congratulationsStatsObj.append('<tr><td>Time</td><td>' + createTimeString(gameTimeSeconds) + '</td></tr>');
	congratulationsContentObj.append('<button type="button" class="play-again-button">&#10226;</button>');
	// Fading in the opacity of the created congratulation modal
	congratulationsModal.fadeTo(400, 1.0, function (){
		console.log('Congratulation faded in.')
		createPlayAgainButtonEventListener();
	});
}

/**
 * @description: Destroy the congratulations modal.
 */
function destroyCongratulations(){
	console.log("Destroying the congratulations");
	const congratulationsModal = $('body').find('.congratulations');
	congratulationsModal.fadeOut(400, function(){
		congratulationsModal.remove();
	});
}

//-------------------------------------------------------------------------------------------------
//
// Statistics
//
//-------------------------------------------------------------------------------------------------

//-------------------------------------------------------------------------------------------------
// Timer
//-------------------------------------------------------------------------------------------------

/**
 * @description: Turn seconds into a more readable string.
 * @param: {number} seconds - Time in seconds.
 * @returns: {string} Time string of the game time.
 */
function createTimeString(seconds){
	const displayMinutes = Math.floor(seconds / 60);
	const displaySeconds = Math.floor(seconds % 60);
	displayTimeString = displaySeconds + '&thinsp;s';
	if (displayMinutes > 0){
		displayTimeString = displayMinutes + '&thinsp;m ' + displayTimeString;
	}
	return displayTimeString;
}

/**
 * @description: Writer string to the timer object.
 * @param: {string} timerString - String to be displayed in the timer.
 */
function writeToTimer(timerString){
	$('#timer').html(timerString);
}

/**
 * @description: Return time string of game timer
 * @returns: {string} Time string of game timer.
 */
function getGameTime(){
	return $('#timer').html();
}

/**
 * @description: Start a timer and display the time since the timer was started. Timer stops when "stopTimer" is triggered on document.
 */
function startTimer(){
	const startTime = Date.now();
	gameTimeSeconds = 0;

	const timer = setInterval(function(){
		let now = Date.now();
		// let deltaSeconds = Math.floor((now - startTime)/1000);
	 	gameTimeSeconds = Math.floor((now - startTime)/1000);		
		writeToTimer(createTimeString(gameTimeSeconds));
	}, 1000);

	// Event listener for timer to stop
	$(document).on('stopTimer', function(){
		clearInterval(timer);
	});
}

/**
 * @description: Send trigger to stop timer.
 */
function triggerStopTimer(){
	$(document).trigger('stopTimer');
}

//-------------------------------------------------------------------------------------------------
// Move Counter
//-------------------------------------------------------------------------------------------------

/**
 * @description: Transform given number of moves into a string for readability. The unit "Move" will be added to the number. If number not 1, the unit is for plural "Moves".
 * @param: {int} movesNumber - Number to be tranformed into the corresponding moves string.
 * @returns: {string} String showing moves number and unit.
 */
function createMovesString(movesNumber){
	movesString = " Move";
	if (movesNumber != 1){
		movesString = movesString + "s";
	}
	movesString = movesNumber + movesString;
	console.log("Moves string = " + movesString);
	return movesString;
}

/**
 * @description: Writer string to the moves counter object.
 * @param: {string} movesString - String to be displayed in the moves counter.
 */
function writeToMovesCounter(movesString){
	console.log('Setting moves counter display to = ' + movesString);
	$('#moves-counter').text(movesString);
}

/**
 * @description: Increase moves by 1 and updates the displayed counter.
 */
function increaseMovesCounter(){
	console.log('Increasing moves count.');
	gameMoves += 1;
	console.log('New number of moves = ' + gameMoves);
	writeToMovesCounter(createMovesString(gameMoves));
}

//-------------------------------------------------------------------------------------------------
// Star Rating
//-------------------------------------------------------------------------------------------------

/**
 * @description: Create string to represent the currrent star rating. Maximum will be represented by hollow/white stars, active rating will be represented by full/black stars. 
 * @param: {int} activeStars - Number of stars (star rating) to be tranformed into the corresponding stars string.
 * @param: {int} maxStarsRating - Maximum number of possible active stars.
 * @returns: {string} Representation string for the current star rating.
 */
function createStarsString(activeStars, maxStars){
	const fullStarString = '&#9733;';
	const hollowStarString = '&#9734;';
	// let currentStarString = hollowStarString;
	let starRatingString = '';
	for (var currentStar = 1; currentStar <= maxStars; currentStar++) {
		console.log('Current star = ' + currentStar);
		let currentStarString = hollowStarString;
		if (currentStar <= activeStars){
			currentStarString = fullStarString;
		}
		starRatingString = starRatingString + currentStarString;
	}
	console.log('Star rating string = ' + starRatingString);
	return starRatingString;
}

/**
 * @description: Writer string to the moves counter object.
 * @param: {string} movesString - String to be displayed in the moves counter.
 */
function writeToStarsDisplay(starsString){
	console.log('Setting stars display to = ' + starsString);
	$('#stars-display').html(starsString);
}

/**
 * @description: Update star rating based on current star rating and number of moves. The updated star rating is written into the stars display.
 */
function updateStarRating(){
	console.log('Updating star rating.')
	const maxMovesThreeStarRating = 3; //16;
	const maxMovesTwoStarRating = 5; //24;
	const currentMovesCount = gameMoves;

	gameStars = 1;
	if (currentMovesCount <= maxMovesTwoStarRating){
		gameStars = 2;
	}
	if (currentMovesCount <= maxMovesThreeStarRating){
		gameStars = 3;
	}	
	writeToStarsDisplay(createStarsString(gameStars, maxStarsRating));	
}

//-------------------------------------------------------------------------------------------------
//
// Events
//
//-------------------------------------------------------------------------------------------------

//-------------------------------------------------------------------------------------------------
// Button Events
//-------------------------------------------------------------------------------------------------

// Play -------------------------------------------------------------------------------------------

/**
 * @description: Create event lister for click on "play game" button.
 */
function createPlayGameButtonEventListener(){
	$('.play-game-button').on("click", function(){
		console.log('"Play Game" button clicked');
		destroyWelcome();
		// buildGame();
		triggerGameStart();
	});
}

// Restart ----------------------------------------------------------------------------------------

/**
 * @description: Create event lister for click on restart button.
 */
function createRestartButtonEventListener(){
	$('.restart-button').on("click", function(){
		console.log('"Restart" button clicked');
		triggerGameEnd();
		// Game has been ended and con not be won anymore.
		removeGameWonEventListener();
		// Because of the timeout set after two cards are clicked, before the response is performed
		// it can happen that the restart button is clicked during this delay. To prevent responses
		// that where triggered before restart button is clicked, being  performed after the
		// restart button was clicked (in the new game), the timeout has to be cleared. The
		// function defined in the timeout will not be performed.
		clearTimeout(equalityResponseTimeout);
		// Fading out the card area
		fadeOutCardArea();
		// The destruction and recreation of the game needs to be delayed by time it takes to fade out the card area.
		setTimeout(function() {
			destroyGame();
			buildGame();
			triggerGameStart();
		}, 400);
	});
}

/**
 * @description: Create event lister for click on restart button.
 */
function removeRestartButtonEventListener(){
	$('.restart-button').off("click");
}

// Play again -------------------------------------------------------------------------------------

/**
 * @description: Create event lister for click on play again button.
 */
function createPlayAgainButtonEventListener(){
	$('.play-again-button').on("click", function(){
		console.log('"Play Again" button clicked');
		destroyCongratulations();
		destroyGame();
		buildGame();
		triggerGameStart();
	});
}

//-------------------------------------------------------------------------------------------------
// Card Events
//-------------------------------------------------------------------------------------------------

// Card Logic -------------------------------------------------------------------------------------

/**
 * @description: Check if game is won (all cards are matched).
 * @returns: {boolean} true if all cards are matched, false otherwise.
 */
function allCardsMatched() {
	// console.log('Checking if game is won.')
	const numberOfCards = $('.card-content').length;
	const numberOfMatchedCards = $('.matched').length;
	// console.log('Cards matched: ' + numberOfMatchedCards);
	if (numberOfMatchedCards == 4){
		// $('body').append('<div>YOU WIN!</div>');
		// console.log('Game is won!!')
		// triggerGameEnd();
		return true;
	} else {
		// console.log('Game is not won yet.')
		return false;
	}
}

/**
 * @description: Checks if two cards are picked.
 * @returns: {boolean} true two cards picked, false otherwise.
 */
function twoCardsPicked(){
	console.log('Checking if two cards are picked.');
	const targetNumberOfPicksPerMove = 2;
	let numberOfPickedCards = $('.picked').length;
	if (numberOfPickedCards == targetNumberOfPicksPerMove){
		console.log('Two cards are picked.');
		return true;
		// triggerTwoCardsPicked();
	} else {
		console.log('Different number than 2 cards are picked.');
		return false;
	}
}

/**
 * @description: Check if picked cards match-.
 * @returns: {boolean} true if picked cards are equal, false otherwise.
 */
function pickedCardsEqual() {
	console.log('Checking equality of picked cards.');
	// The equality should ony be checked for two cards. Therefore, double checking that two cards are picked.
	if (twoCardsPicked() == true){
		const pickedCards = $('.picked');
		console.log('The picked cards are the following:');
		console.log(pickedCards);

		const pickedCardsSymbols = pickedCards.find('.card-face');

		const firstSymbol = pickedCardsSymbols.first().html();
		console.log('First symbol = ' + firstSymbol);
		const secondSymbol = pickedCardsSymbols.last().html();
		console.log('Second symbol = ' + secondSymbol);

		if (firstSymbol != undefined && firstSymbol === secondSymbol){
			console.log('Cards are equal!');
			// triggerCardsMatched();
			return true;
		} else {
			console.log('Cards are NOT equal!');
			// triggerCardsRejected();
			return false;
		}
	}
}

/**
 * @description: Add picked class and show card if card is allowed to be picked. Only two cards can be picked at a time. Matched and already picked cards can not be picked.
 * @param: {element} card - Object of the clicked card.
 */
function pickCard(card){
	// Only two cards are allowed to be picked at a time.
	const maximumNumberOfCardsPicked = 2;
	let numberOfPickedCards = $('.picked').length;

	if (numberOfPickedCards < maximumNumberOfCardsPicked){
		// A picked or matched card can not be selected again (or be unselected).
		if ($(card).hasClass('picked') == false && $(card).hasClass('matched') == false){
			$(card).addClass('picked');
			console.log('Card picked.');
			$(card).find('.card-back').css('animation-name', 'flip_back_down');
			$(card).find('.card-face').css('animation-name', 'flip_face_up');
			console.log('Card symbol visible.');
			// $(card).find('.card-symbol').fadeIn(function(){
			// 	checksAndActionsAfterCardPick();
			// });
		} else {
			console.warn('Card not picked. Card already picked or matched.');
		}
	} else {
		console.warn('Card not picked. Maximum number of cards picked.');
	}
}

// Card Click -------------------------------------------------------------------------------------

/**
 * @description: Remove event lister for click on any card.
 */
function removeCardClickEventListener(){
	console.log('Removing the "cardClick" event listener.');
	$('.card-spacer').off("click");
}

/**
 * @description: Create event lister for click on any card.
 */
function createCardClickEventListener(){
	console.log('Creating the "cardClick" event listener.');
	$('.card-spacer').on("click", function(){
		console.log('Card was clicked.');
		pickCard(this);
		if (twoCardsPicked() == true){
			triggerTwoCardsPicked();
		}
	});
}

// Two Cards Picked -------------------------------------------------------------------------------

/**
 * @description: Trigger event listener for two cards being picked
 */
function triggerTwoCardsPicked(){
	console.log('Trigger "twoCardsPicked".');
	$('.card-area').trigger('twoCardsPicked');
}

/**
 * @description: Remove event listener for two cards being picked
 */
function removeTwoCardsPickedEventListener(){
	console.log('Removing the "twoCardsPicked" event listener.');
	$('.card-area').off('twoCardsPicked');
}

/**
 * @description: Create event listener for two cards being picked
 */
function createTwoCardsPickedEventListener(){
	console.log('Creating the "twoCardsPicked" event listener.');
	$('.card-area').on('twoCardsPicked', function(){
		console.log('Starting processing after two cards are picked.');
		removeCardClickEventListener();
		removeTwoCardsPickedEventListener();
		increaseMovesCounter();
		updateStarRating();
		createCardsMatchedEventListener();
		createCardsRejectedEventListener();
		console.log('Delaying the check of the card equality for visibility.');
		equalityResponseTimeout = setTimeout(function(){
			if (pickedCardsEqual() == true){
				triggerCardsMatched();
			} else {
				triggerCardsRejected();
			};
		}, 2000);
	});
}

// Cards Matched ----------------------------------------------------------------------------------

/**
 * @description: Trigger event listener for the picked cards being matched
 */
function triggerCardsMatched(){
	console.log('Trigger "cardsMatched".');
	$('.card-area').trigger('cardsMatched');
}

/**
 * @description: Remove event listener for the picked cards being matched
 */
function removeCardsMatchedEventListener(){
	console.log('Removing the "cardsMatched" event listener.');
	$('.card-area').off('cardsMatched');
}

/**
 * @description: Create event listener for the picked cards being matched
 */
function createCardsMatchedEventListener(){
	console.log('Creating the "cardsMatched" event listener.');
	$('.card-area').on('cardsMatched', function(){
		console.log('Starting processing after two cards are matched.');
		removeCardsMatchedEventListener();
		removeCardsRejectedEventListener();
		// matchPickedCards();
		console.log('Adding "matched" class to picked cards.');
		const pickedCards = $('.picked');
		pickedCards.addClass('matched');
		console.log('Playing animation for matched cards.');		
		pickedCards.css('animation', 'pop 1s');
		// Delaying the following action to allow animation to play out
		setTimeout(function(){
				$('.matched').find('.card-face').addClass('matched-face');
				console.log('Removing picks!');
				pickedCards.removeClass('picked');
				console.log('Checking if all cards are matched.');
				if (allCardsMatched() == true){
					triggerGameEnd();
					triggerGameWon();
				} else {
					createCardClickEventListener();
					createTwoCardsPickedEventListener();
				}
		}, 1000);
	});
}

// Cards Rejected ---------------------------------------------------------------------------------

/**
 * @description: Trigger event listener for the picked cards being rejected
 */
function triggerCardsRejected(){
	console.log('Trigger "cardsRejected".');
	$('.card-area').trigger('cardsRejected');
}

/**
 * @description: Remove event listener for the picked cards being rejected
 */
function removeCardsRejectedEventListener(){
	console.log('Removing the "cardsRejected" event listener.');
	$('.card-area').off('cardsRejected');
}

/**
 * @description: Create event listener for the picked cards being rejected
 */
function createCardsRejectedEventListener(){
	console.log('Creating the "cardsRejected" event listener.');
	$('.card-area').on('cardsRejected', function(){
		console.log('Starting processing after picked cards are rejected.')
		removeCardsRejectedEventListener();
		removeCardsMatchedEventListener();
		// rejectPickedCards();
		console.log('Rejecting picked cards.');
		const pickedCards = $('.picked');
		console.log('Playing reject animation.');
		pickedCards.css('animation', 'shake 1s');
		setTimeout(function(){
			pickedCards.find('.card-back').css('animation-name', 'flip_back_up');
			pickedCards.find('.card-face').css('animation-name', 'flip_face_down');	
			// Removing animations to allow replay
			pickedCards.css('animation', '');			
			console.log('Removing picks!');
			pickedCards.removeClass('picked');
			createCardClickEventListener();
			createTwoCardsPickedEventListener();
		}, 1000);
	});
}

//-------------------------------------------------------------------------------------------------
// Game Events
//-------------------------------------------------------------------------------------------------

// Game start -------------------------------------------------------------------------------------

/**
 * @description: Trigger event listener for the game end
 */
function triggerGameStart(){
	console.log('Trigger "gameStart".');
	$(document).trigger('gameStart');
}

/**
 * @description: Remove event listener for the game end
 */
function removeGameStartEventListener(){
	console.log('Removing the "gameStart" event listener.');
	$(document).off('gameStart');
}

/**
 * @description: Create event listener for the game start
 */
function createGameStartEventListener(){
	console.log('Creating the "gameStart" event listener.');
	$(document).on('gameStart', function(){
		console.log('Game started!');
		// Game is already started. It can not be started again.
		removeGameStartEventListener();

		// Set moves, stars and time to initial (values)
		gameTimeSeconds = 0;
		gameStars = 0;
		gameMoves = 0;

		startTimer();

		createRestartButtonEventListener();

		createCardClickEventListener();
		createTwoCardsPickedEventListener();

		createGameEndEventListener();
		createGameWonEventListener();
	});
}

// Game end ---------------------------------------------------------------------------------------

/**
 * @description: Trigger event listener for the game end
 */
function triggerGameEnd(){
	console.log('Trigger "gameEnd".');
	$(document).trigger('gameEnd');
}

/**
 * @description: Remove event listener for the game end
 */
function removeGameEndEventListener(){
	console.log('Removing the "gameEnd" event listener.');
	$(document).off('gameEnd');
}

/**
 * @description: Create event listener for the game end
 */
function createGameEndEventListener(){
	console.log('Creating the "gameEnd" event listener.');
	$(document).on('gameEnd', function(){
		console.log('Game ended!');
		// Disable game end. Game is already ended and can not be ended again.
		removeGameEndEventListener();

		// stop timer
		triggerStopTimer();

		// Disable user interactions
		removeCardClickEventListener();
		removeRestartButtonEventListener();

		// Disable checks
		removeCardsRejectedEventListener();
		removeCardsMatchedEventListener();
	});
}

// Game won ---------------------------------------------------------------------------------------

/**
 * @description: Trigger event listener for the game being won
 */
function triggerGameWon(){
	console.log('Trigger "gameWon".');
	$(document).trigger('gameWon');
}

/**
 * @description: Remove event listener for the game being won
 */
function removeGameWonEventListener(){
	console.log('Removing the "gameWon" event listener.');
	$(document).off('gameWon');
}

/**
 * @description: Create event listener for the game being won
 */
function createGameWonEventListener(){
	console.log('Creating the "gameWon" event listener.');
	$(document).on('gameWon', function(){
		console.log('Game won!');
		// Game is already won. It can not be won again
		removeGameWonEventListener();
		buildCongratulations();
	});
}

//-------------------------------------------------------------------------------------------------
//
// RUN
//
//-------------------------------------------------------------------------------------------------

/**
 * @description: Main function of the application. Needs to be run after the DOM is build initially.
 */
function main(){
	// destroyWelcome();
	createPlayGameButtonEventListener();
	buildGame();
	// triggerGameStart();
	// triggerGameWon();
	// buildCongratulations();
}

// This is running the DOM manipulation after the DOM is initially created.
$(main);

