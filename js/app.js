var cardsPerRow = 4;
var cardsPerColumn = 4;
var gapSizeBetweenCards = 10;

function runAfterDOMIsBuild(){
	var body = $("body");
	var bodyWidth = body.width();
	console.log(bodyWidth);
	var totalGapSizeInRow = (cardsPerRow + 1) * gapSizeBetweenCards;
	console.log(totalGapSizeInRow);
	var cardSize = (bodyWidth - totalGapSizeInRow) / cardsPerRow;
	console.log("cardSize = " + cardSize);

	body.append('<div class="memory-card">Some extra text</div>');
}

// This is running the DOM manipulation after the DOM is initially created.
$(runAfterDOMIsBuild);