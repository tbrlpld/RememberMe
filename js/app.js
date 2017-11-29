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

	for (var row = 1; row <= cardsPerRow; row++) {
		for (var column = 1; column <= cardsPerColumn; column++) {
			$(".card-area").append('<div class="memory-card">Some extra text</div>');
			$(".memory-card").last().css("grid-row", String(row));
			$(".memory-card").last().css("grid-column", String(column));
		}
	}
	// $(".memory-card").css("width","100px");

}

// This is running the DOM manipulation after the DOM is initially created.
$(runAfterDOMIsBuild);