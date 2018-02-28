RememberMe
==========

A memory game web application (created for the Udacity Nanodegree 'Intro to Programming')

Game is developed using jQuery 3.2.1 (jquery-3.2.1.min.js).


New Code Sections/Order
-----------------------

DOM Creation
	Build Welcome
	Build Game
	Cards (Symbol Array, Shuffling, Card Creation)
	Build Congratulations

Animations (if needed)

Stats
	Timer
	Move Counter
	Star Rating

Events
	Button Events
	Card Events
		Card Selection (Card Pick, Checks, )
	Game Events

RUN



TODO
----
* Make card logic really event based. Card click is an event. Create events for cards match and rejected.
* To make the code even more event controlled:
  * Card click checks if two cards are clicked
  * If so, triggers pair selected
  * On pairSelected equality check is done
  * If successful, match is triggered
  * Else, reject is triggered
  * Probably makes sense to create functions to create and deactivate all card events at once
* Create functions to build the DOM in the way that it is needed. HTML should not have more than body.
* Welcome message. Shows name of game and a button to start the game.
* Add card animations for flipping the card, rejecting and accepting the pair.
* Vertically center the game in the body/browser.
* Make restart button be only text icon (remove border etc.)
* Make hover shadow of cards smaller.
* Update colors, especially of game area and header.
* Add title to header.
* Add animations for welcome screen, transition to game view, build of game, build of card deck, destruction of card deck, destruction of game, transition to congratulations message, congratulations message itself.
* Reset correct limits for star rating and game to be won.
* (Optional) Add option in welcome message to select game size (16, 32)



