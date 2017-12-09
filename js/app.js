var cardsPerRow = 4;
var cardsPerColumn = 4;

//-------------------------------------------------------------------------------------------------
//
// Random Symbol Array
//
//-------------------------------------------------------------------------------------------------

function getArrayOfSymbols(){
	var symbols = ['&#9728;',
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
		// console.log(symbolsDoubled)
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
	// console.log('maxIndex = ' + maxIndex);
	var tempValue;

	while (currentIndex <= maxIndex){
		// console.log('currentIndex = ' + currentIndex);
		randomIndex = getRandomIntInclusive(currentIndex, maxIndex);
		// console.log('randomIndex = ' + randomIndex);
		// console.log('Before change:');
		// console.log('array[currentIndex] = ' + array[currentIndex]);
		// console.log('array[randomIndex] = ' + array[randomIndex]);
		tempValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = tempValue;
		// console.log('After change:');
		// console.log('array[currentIndex] = ' + array[currentIndex]);
		// console.log('array[randomIndex] = ' + array[randomIndex]);
		// console.log('array = ' + array);
		currentIndex += 1;
	}
	return array
}

function getRandomSymbolArray(){
	var symbols = getArrayOfSymbols();
	// console.log(symbols);
	var symbolsDoubled = doubleArrayOfSymbols(symbols);
	// console.log(symbolsDoubled);
	var symbolsShuffled = shuffleArray(symbolsDoubled);
	// console.log(symbolsShuffled);
	return symbolsShuffled
}

//-------------------------------------------------------------------------------------------------
//
// Create Cards
//
//-------------------------------------------------------------------------------------------------


function createCards(){
	var symbols = getRandomSymbolArray();
	// console.log(symbols)

	var lastCardCreated;
	var currentCardNumber = 0;
	for (var row = 1; row <= cardsPerRow; row++) {
		// console.log('row = ' + row)
		for (var column = 1; column <= cardsPerColumn; column++) {
			// console.log('column = ' + column)
			currentCardNumber += 1;
			// console.log('currentCardNumber = ' + currentCardNumber)
			symbolIndex = currentCardNumber - 1;
			// console.log('symbolIndex = ' + symbolIndex)
			currentSymbol = symbols[symbolIndex];
			// console.log('Card ' + currentCardNumber + ' --> ' + currentSymbol);
			$(".card-area").append('<div class="card-spacer"><div class="card-content"><div class="card-symbol">' + currentSymbol + '</div></div></div>');
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
	matchedCards = $(".matched").length;
	console.log("Cards matched: " + matchedCards);
	if (matchedCards == 16){
		$('body').append('<div>YOU WIN!</div>');
	}
}

//-------------------------------------------------------------------------------------------------
//
// MAIN
//
//-------------------------------------------------------------------------------------------------

function runAfterDOMIsBuild(){
	createCards();
	// Select cards event listener
	// var numberOfSelectedCards;
	// var selectedCardsSymbols = [];
	$(".card-content").click(function(){
		// var numberOfSelectedCards = $(".selected").length;
		// console.log("numberOfSelectedCards = " + numberOfSelectedCards);

		// Only two cards are allowed to be selected at a time.
		if ($(".selected").length < 2){
			// A selected card can not be selected again (or be unselected).
			if ($(this).hasClass("selected") == false && $(this).hasClass("matched") == false){
				// var symbol = $(this).contents().html();
				// console.log("Clicked card contains: " + symbol);
				$(this).addClass("selected");
			}
		}

		numberOfSelectedCards = $(".selected").length;
		console.log("numberOfSelectedCards = " + numberOfSelectedCards);
		// Once two cards are selected, they need to be check for equality
		if ($(".selected").length == 2){
			// The reaction will be done with a time offset to allow for animation etc.
			setTimeout(function(){
				var firstSymbol = $(".selected").first().contents().html();
				console.log("First symbol = " + firstSymbol);
				var secondSymbol = $(".selected").last().contents().html();
				console.log("Second symbol = " + secondSymbol);
				if (firstSymbol != undefined && firstSymbol === secondSymbol){
					console.log("Cards are equal!")
					$(".selected").addClass("matched");
				} else {
					console.log("Cards are NOT equal!")
				}

				// Remove selection
				$(".selected").removeClass("selected");
				numberOfSelectedCards = $(".selected").length;
				console.log("numberOfSelectedCards = " + numberOfSelectedCards);

				// Check game status
				checkGameStatus();
			}, 500);
		}

	});
}

// This is running the DOM manipulation after the DOM is initially created.
$(runAfterDOMIsBuild);

