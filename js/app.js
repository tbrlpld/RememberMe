

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

	var cardsPerRow = 4;
	var cardsPerColumn = 4;

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
			$(".card-area").append('<div class="card-spacer"><div class="card-content unselectable"><div class="card-symbol">' + currentSymbol + '</div></div></div>');
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
	console.log("Checking game status.")
	matchedCards = $(".matched").length;
	console.log("Cards matched: " + matchedCards);
	if (matchedCards == 16){
		$('body').append('<div>YOU WIN!</div>');
	}
}

function checkSelectedCards() {
	var selectedCards = $(".picked");
	console.log("The selected cards are the following:");
	console.log(selectedCards);

	console.log("Comparing selected cards.");

	firstCard = selectedCards.first();
	secondCard = selectedCards.last();

	var firstSymbol = firstCard.contents().html();
	console.log("First symbol = " + firstSymbol);
	var secondSymbol = secondCard.contents().html();
	console.log("Second symbol = " + secondSymbol);

	if (firstSymbol != undefined && firstSymbol === secondSymbol){
		console.log("Cards are equal!")
		$(".picked").addClass("matched");
	} else {
		console.log("Cards are NOT equal!")
		console.log("Hiding symbols.")
		firstCard.find(".card-symbol").fadeOut("fast",function(){
			console.log("Symbol of first card hidden.");
		});
		secondCard.find(".card-symbol").fadeOut("fast",function(){
			console.log("Symbol of second card hidden.");
		});
	}

	// Remove selection
	console.log("Removing selection!")
	$(".picked").removeClass("picked");
}

function checksAfterSelection() {
	console.log("Staring checks.")
	console.log("numberOfSelectedCards = " + $(".picked").length);
	// Once two cards are selected, they need to be check for equality
	if ($(".picked").length == 2){
		console.log("Two are selected. Time to compare them.")
		checkSelectedCards();
		// Check game status
		checkGameStatus();
	} else {
		console.log("Only one card was selected. Waiting for next input.")
	}
	console.log("numberOfSelectedCards = " + $(".picked").length);
	console.log("Checks finished.")
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
		// var numberOfSelectedCards = $(".picked").length;
		// console.log("numberOfSelectedCards = " + numberOfSelectedCards);

		console.log("Card was clicked.")
		// Only two cards are allowed to be selected at a time.
		if ($(".picked").length < 2){
			// A selected card can not be selected again (or be unselected).
			if ($(this).hasClass("picked") == false && $(this).hasClass("matched") == false){
				// var symbol = $(this).contents().html();
				// console.log("Clicked card contains: " + symbol);
				$(this).addClass("picked");
				// $(this).first().find(".card-symbol").css("visibility", "visible");
				// $(this).find(".card-symbol").fadeIn("slow", checksAfterSelection());
				$(this).find(".card-symbol").fadeIn();
				$(this).find(".card-symbol").queue(checksAfterSelection());
			}
		}
		console.log("Card click processing is done.");
	});
}

// This is running the DOM manipulation after the DOM is initially created.
$(runAfterDOMIsBuild);

