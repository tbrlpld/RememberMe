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
	var symbolsDoubled = [];
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
	var currentIndex = 0;
	var randomIndex = 0;
	var maxIndex = array.length - 1;
	var tempValue;

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
	var symbols = getArrayOfSymbols();
	var symbolsDoubled = doubleArrayOfSymbols(symbols);
	var symbolsShuffled = shuffleArray(symbolsDoubled);
	return symbolsShuffled
}

//-------------------------------------------------------------------------------------------------
//
// Create Cards
//
//-------------------------------------------------------------------------------------------------


function createCards(){
	var symbols = getRandomSymbolArray();

	var cardsPerRow = 4;
	var cardsPerColumn = 4;

	var lastCardCreated;
	var currentCardNumber = 0;
	for (var row = 1; row <= cardsPerRow; row++) {
		for (var column = 1; column <= cardsPerColumn; column++){
			currentCardNumber += 1;
			symbolIndex = currentCardNumber - 1;
			currentSymbol = symbols[symbolIndex];
			$('.card-area').append('<div class="card-spacer"><div class="card-content unselectable"><div class="card-symbol">' + currentSymbol + '</div></div></div>');
			lastCardCreated = $('.memory-card').last();
			lastCardCreated.css('grid-row', String(row));
			lastCardCreated.css('grid-column', String(column));
		}
	}
}

//-------------------------------------------------------------------------------------------------
//
// Game Helper
//
//-------------------------------------------------------------------------------------------------



function checkGameStatus() {
	console.log('Checking game status.')
	matchedCards = $('.matched').length;
	console.log('Cards matched: ' + matchedCards);
	if (matchedCards == 16){
		$('body').append('<div>YOU WIN!</div>');
	}
}

function checkSelectedCards() {
	// TODO: This function needs some cleaning up!

	var selectedCards = $('.picked');
	console.log('The selected cards are the following:');
	console.log(selectedCards);

	// Delay to allow user observation of picked symbols
	$('.picked').find('.card-symbol').delay(800);

	console.log('Comparing selected cards.');

	firstCard = selectedCards.first();
	secondCard = selectedCards.last();

	var firstSymbol = firstCard.contents().html();
	console.log('First symbol = ' + firstSymbol);
	var secondSymbol = secondCard.contents().html();
	console.log('Second symbol = ' + secondSymbol);

	if (firstSymbol != undefined && firstSymbol === secondSymbol){
		console.log('Cards are equal!')
		$('.picked').addClass('matched');
	} else {
		console.log('Cards are NOT equal!')
		console.log('Hiding symbols.')
		$('.picked').find('.card-symbol').fadeOut('fast', function(){
			console.log('Symbol faded out.')
		});
	}

	// Remove selection
	console.log('Removing selection!')
	$('.picked').removeClass('picked');

	// Delay on all symbol animations to prevent selection of further cards
	// before animations are finished.
	$('.card-symbol').delay(1000);
}

function checksAfterSelection() {
	console.log('Staring checks.')
	console.log('numberOfSelectedCards = ' + $('.picked').length);
	// Once two cards are selected, they need to be check for equality
	if ($('.picked').length == 2){
		console.log('Two are selected. Time to compare them.')
		// Check equility of selected cards and perform according response
		checkSelectedCards();
		// Check game status
		checkGameStatus();
	} else {
		console.log('Only one card was selected. Waiting for next input.')
	}
	console.log('numberOfSelectedCards = ' + $('.picked').length);
	console.log('Checks finished.')
}

//-------------------------------------------------------------------------------------------------
//
// MAIN
//
//-------------------------------------------------------------------------------------------------

function runAfterDOMIsBuild(){
	createCards();

	// Select cards event listener
	$('.card-content').click(function(){
		console.log('Card was clicked.')
		// Only two cards are allowed to be selected at a time.
		if ($('.picked').length < 2){
			// A selected card can not be selected again (or be unselected).
			if ($(this).hasClass('picked') == false && $(this).hasClass('matched') == false){
				$(this).addClass('picked');
				$(this).find('.card-symbol').fadeIn(function(){
					checksAfterSelection();
				});
			}
		}
		console.log('Card click processing is done.');
	});
}

// This is running the DOM manipulation after the DOM is initially created.
$(runAfterDOMIsBuild);

