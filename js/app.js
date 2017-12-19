// TODO: the whole code needs some cleaning up!

//-------------------------------------------------------------------------------------------------
//
// Random Symbol Array
//
//-------------------------------------------------------------------------------------------------

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

function doubleArrayOfSymbols(symbols){
	let symbolsDoubled = [];
	symbols.forEach(function(item){
		symbolsDoubled.push(item);
		symbolsDoubled.push(item);
	});
	return symbolsDoubled
}

// source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

// Based on Dustenfeld algorithm: https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
function shuffleArray(array){
	const maxIndex = array.length - 1;
	let currentIndex = 0;
	let randomIndex = 0;
	let tempValue;

	while (currentIndex <= maxIndex){
		randomIndex = getRandomIntInclusive(currentIndex, maxIndex);
		tempValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = tempValue;
		currentIndex += 1;
	}
	return array
}

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

function getCurrentMovesCount(){
	const moves = Number($('.counter-number').text());
	console.log("Current number of moves = " + moves);
	return moves
}

function increaseMovesCount(){
	let moves = getCurrentMovesCount();
	moves += 1;
	$('.counter-number').text(moves);
	console.log("New number of moves = " + moves);
}

//-------------------------------------------------------------------------------------------------
//
// Card Selection
//
//-------------------------------------------------------------------------------------------------


function checkGameStatus() {
	console.log('Checking game status.')
	const numberOfMatchedCards = $('.matched').length;
	console.log('Cards matched: ' + numberOfMatchedCards);
	if (numberOfMatchedCards == 16){
		$('body').append('<div>YOU WIN!</div>');
	}
}

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

function checksAfterCardPick() {
	console.log('Staring checks.')
	const targetNumberOfPicksPerMove = 2;
	let numberOfPickedCards = $('.picked').length;
	console.log('numberOfPickedCards = ' + numberOfPickedCards);
	// Once two cards are selected, they need to be check for equality
	if (numberOfPickedCards == targetNumberOfPicksPerMove){
		console.log('Two are selected. Time to compare them.')
		increaseMovesCount();
		// Check equility of selected cards and perform according response
		checkPickedCards();
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
				checksAfterCardPick();
			});
		}
	}
	console.log('Card click processing is done.');
}

//-------------------------------------------------------------------------------------------------
//
// MAIN
//
//-------------------------------------------------------------------------------------------------

function runAfterDOMIsBuild(){
	createCards();

	// Event listener for click on any card.
	$('.card-content').click(function(){
		cardPick(this);
	});
}

// This is running the DOM manipulation after the DOM is initially created.
$(runAfterDOMIsBuild);

