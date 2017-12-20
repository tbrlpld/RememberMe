// TODO: Create doc strings/comments for the functions.
// TODO: timer.
// TODO: Congratulations message showing moves, star rating and time.
// TODO: Vertically center the game in the body/borwser.
// TODO: function to destroy the card deck.
// TODO: function to create the card deck.
// TODO: restart button, which destorys the current deck, builds a new one and resets the counters.
// TODO: Congratulations pop-up. A more obvious way to display the final message. Also includes a restart/play-again button.
// TODO: Welcome message. Shows name of game and a button to start the game.
// TODO: Add card animations for flipping the card, rejecting and accepting the pair.
// TODO: Add animations for welcome screen, transition to game view, build of game, build of card deck, destruction of card deck, destruction of game, transition to congratulations message, congratulations message itself.
// TODO: (Optional) Add option in welcome message to select game size (16, 32)

//-------------------------------------------------------------------------------------------------
//
// Random Symbol Array
//
//-------------------------------------------------------------------------------------------------

/**
 * @description: Return an array of 8 (unique) html symbol strings.
 * @returns: Array of 8 (unique) html symbol strings.
 */
function getArrayOfSymbols(){
	const symbols = ['&#9728;',
				   	 '&#9729;',
				   	 '&#9730;',
				   	 '&#9733;',
				   	 '&#9752;',
				   	 '&#9774;',
				   	 '&#9786;',
				   	 '&#9822;'
	];
	return symbols
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
	return symbolsDoubled
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
	return inputArray
}

/**
 * @description: Create an array of 16 symbols in random order. Each symbol occurs twice.
 * @returns: Array of 16 symbols in random order. Each symbol occurs twice.
 */
function getRandomSymbolArray(){
	const symbols = getArrayOfSymbols();
	const symbolsDoubled = doubleArrayOfSymbols(symbols);
	const symbolsShuffled = shuffleArray(symbolsDoubled);
	return symbolsShuffled
}

//-------------------------------------------------------------------------------------------------
//
// Create Cards
//
//-------------------------------------------------------------------------------------------------

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
			$('.card-area').append('<div class="card-spacer"><div class="card-content unselectable"><div class="card-symbol">' + currentSymbol + '</div></div></div>');
		}
	}
}

//-------------------------------------------------------------------------------------------------
//
// Move Counter
//
//-------------------------------------------------------------------------------------------------

/**
 * @description: Get currently shown number of moves.
 * @returns: {number} Number of current moves.
 */
function getCurrentMovesCount(){
	const moves = Number($('.counter-number').text());
	console.log('Current number of moves = ' + moves);
	return moves
}

/**
 * @description: Increase the currently shown number of moves by one.
 */
function increaseMovesCount(){
	let moves = getCurrentMovesCount();
	moves += 1;
	$('.counter-number').text(moves);
	console.log('New number of moves = ' + moves);
}

//-------------------------------------------------------------------------------------------------
//
// Star Rating
//
//-------------------------------------------------------------------------------------------------

/**
 * @description: Get currently shown number of stars.
 * @returns: {number} Number of current stars.
 */
function getCurrentStarRating(){
	const stars = $('.star-area').find('.star-active').length;
	console.log('Current star rating = ' + stars + ' stars');
	return stars
}

/**
 * @description: Change class of last active star to dead. Dead stars don't count in rating.
 */
function removeOneStar(){
	const lastActiveStar = $('.star-area').find('.star-active').last();
	console.log(lastActiveStar);
	lastActiveStar.addClass('star-dead');
	lastActiveStar.removeClass('star-active');
}

/**
 * @description: Update star rating based on current star rating and number of moves. Removes star if maximum number of moves for that star rating was reached.
 */
function updateStarRating(){
	const maxMovesThreeStarRating = 10;
	const maxMovesTwoStarRating = 20;
	const currentStarRating = getCurrentStarRating();
	const currentMovesCount = getCurrentMovesCount();

	if ((currentStarRating == 3 && currentMovesCount == maxMovesThreeStarRating)
		||(currentStarRating == 2 && currentMovesCount == maxMovesTwoStarRating)) {
		removeOneStar();
	};
}

//-------------------------------------------------------------------------------------------------
//
// Card Selection
//
//-------------------------------------------------------------------------------------------------

/**
 * @description: Check if game is finished (all 16 cards are matched). If so, display congratulations message.
 */
function checkGameStatus() {
	console.log('Checking game status.')
	const numberOfMatchedCards = $('.matched').length;
	console.log('Cards matched: ' + numberOfMatchedCards);
	if (numberOfMatchedCards == 16){
		$('body').append('<div>YOU WIN!</div>');
	}
}

/**
 * @description: Check if picked cards match and execute according response.
 */
function checkPickedCards() {
	const pickedCards = $('.picked');
	console.log('The picked cards are the following:');
	console.log(pickedCards);

	const pickedCardsSymbols = pickedCards.find('.card-symbol');
	// Delay to allow user observation of picked symbols
	pickedCardsSymbols.delay(800);

	console.log('Comparing picked cards.');

	const firstSymbol = pickedCardsSymbols.first().html();
	console.log('First symbol = ' + firstSymbol);
	const secondSymbol = pickedCardsSymbols.last().html();
	console.log('Second symbol = ' + secondSymbol);

	if (firstSymbol != undefined && firstSymbol === secondSymbol){
		console.log('Cards are equal!')
		pickedCards.addClass('matched');
	} else {
		console.log('Cards are NOT equal!')
		console.log('Hiding symbols.')
		pickedCardsSymbols.fadeOut('fast', function(){
			console.log('Symbol faded out.')
		});
	}

	// Remove selection
	console.log('Removing picks!')
	pickedCards.removeClass('picked');

	// Delay on all symbol animations to prevent selection of further cards
	// before animations are finished.
	$('.card-symbol').delay(1000);
}

/**
 * @description: Run all checks and actions after a card has been picked. If only one card is picked, nothing is done. If two cards are picked, the move counter is increased, the star rating updated, the cards are checked for equality and the game status is checked.
 */
function checksAndActionsAfterCardPick() {
	console.log('Staring checks.')
	const targetNumberOfPicksPerMove = 2;
	let numberOfPickedCards = $('.picked').length;
	console.log('numberOfPickedCards = ' + numberOfPickedCards);
	// Once two cards are selected, they need to be check for equality
	if (numberOfPickedCards == targetNumberOfPicksPerMove){
		console.log('Two are selected. Time to compare them.')
		increaseMovesCount();
		updateStarRating();
		// Check equality of selected cards and perform according response
		checkPickedCards();
		// TODO: Move check game status into checkPickedCards. Game can only be finished with a successful move.
		// Check game status
		checkGameStatus();
	} else {
		console.log('Only one card was selected. Waiting for next input.');
	}
	// Updating number of picked cards to check if removal has worked.
	numberOfPickedCards = $('.picked').length;
	console.log('numberOfPickedCards = ' + numberOfPickedCards);
	console.log('Checks finished.')
}

/**
 * @description: Add picked class and show card if card is allowed to be picked. Only two cards can be picked at a time. Matched and already picked cards can not be picked.
 * @param: {element} card - Object of the clicked card.
 */
function cardPick(card){
	console.log('Card was clicked.')
	// Only two cards are allowed to be picked at a time.
	const maximumNumberOfCardsPicked = 2;
	let numberOfPickedCards = $('.picked').length;

	if (numberOfPickedCards < maximumNumberOfCardsPicked){
		// A picked or matched card can not be selected again (or be unselected).
		if ($(card).hasClass('picked') == false && $(card).hasClass('matched') == false){
			$(card).addClass('picked');
			$(card).find('.card-symbol').fadeIn(function(){
				checksAndActionsAfterCardPick();
			});
		}
	}
	console.log('Card click processing is done.');
}

/**
 * @description: Create event lister for click on any card.
 */
function createCardClickEventListener(){
	$('.card-content').click(function(){
		cardPick(this);
	});
}

//-------------------------------------------------------------------------------------------------
//
// MAIN
//
//-------------------------------------------------------------------------------------------------

/**
 * @description: Main function of the application. Needs to be run after the DOM is build initially.
 */
function main(){
	createCards();
	createCardClickEventListener();
}


//-------------------------------------------------------------------------------------------------
//
// RUN
//
//-------------------------------------------------------------------------------------------------

// This is running the DOM manipulation after the DOM is initially created.
$(main);

