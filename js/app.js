var cardsPerRow = 4;
var cardsPerColumn = 4;

function runAfterDOMIsBuild(){
	var lastCardCreated;

	for (var row = 1; row <= cardsPerRow; row++) {
		for (var column = 1; column <= cardsPerColumn; column++) {
			// $(".card-area").append('<div class="memory-card"><img src="https://icon-icons.com/icons2/614/PNG/512/wifi-symbol-inside-a-circle_icon-icons.com_56445.png" width=100%></div>');
			// $(".card-area").append('<div class="memory-card"><div class="card-content"><img src="https://icon-icons.com/icons2/614/PNG/512/wifi-symbol-inside-a-circle_icon-icons.com_56445.png" class="card-image"></div></div>');
			$(".card-area").append('<div class="card-spacer"><div class="card-content"><img src="https://icon-icons.com/icons2/614/PNG/512/wifi-symbol-inside-a-circle_icon-icons.com_56445.png" class="card-image"></div></div>');
			lastCardCreated = $('.memory-card').last();
			lastCardCreated.css('grid-row', String(row));
			lastCardCreated.css('grid-column', String(column));
		}
	}
}

// This is running the DOM manipulation after the DOM is initially created.
$(runAfterDOMIsBuild);