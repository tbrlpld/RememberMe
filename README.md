RememberMe
==========

A memory game web application (created for the Udacity Nanodegree 'Intro to Programming')

Game is developed using jQuery 3.2.1 (jquery-3.2.1.min.js).


New Code Sections/Order
-----------------------

* DOM Manipulation
  * Build Welcome
  * Build Game
  * Card Creation
  * Card Manipulation
  * Build Congratulations

* Animations (if needed)

* Stats
  * Timer
  * Move Counter
  * Star Rating

* Events
  * Button Events
  * Card Events
    * Card Selection (Card Pick, Checks, )
  * Game Events

* RUN


TODO
----
* Pressing the restart button during the delay before equality check
  does not stop the delay and the execution thereafter.
  The check is then performed on no selected cards.
  But, this can lead to an issue if only one card is selected before the check is performed.
  The one card will be first and last object at the same time and therefore check as equal.
  Best would be if the restart button clears the timeout and prevents the intended function.
  See [this](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout).
* Welcome message. Shows name of game and a button to start the game.
* Create functions to build the DOM in the way that it is needed. HTML should not have more than body.
* Add card animations for flipping the card, rejecting and accepting the pair.
* Vertically center the game in the body/browser.
* Make restart button be only text icon (remove border etc.)
* Make hover shadow of cards smaller.
* Update colors, especially of game area and header.
* Add title to header.
* Add animations for welcome screen, transition to game view, build of game, build of card deck, destruction of card deck, destruction of game, transition to congratulations message, congratulations message itself.
* Reset correct limits for star rating and game to be won.
* (Optional) Add option in welcome message to select game size (16, 32)



