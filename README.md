RememberMe
==========

A memory game web application. 
This web application was created as the final project for the Udacity Nanodegree 'Intro to Programming'.

Goal of the game is to find the matching pairs of cards. 

The deck consists of 16 cards which are face down. 
Two cards always have the same symbol on the face side (not shown initially).
The card deck is shuffled using the Dustenfeld algorithm.

To show the face of a card the user can click its back. 
Once two cards are face up, they are compared. 
If the symbols on the cards match, they stay face up and are marked as matched. 
If the symbols do not match, both card faces are flipped back down. 

Once all cards are matched the user has won the game.

Clicking two cards counts as one move. 
The number of moves required to solve the memory game determines the star rating.
Everything upto 16 moves counts as a three star rating, from 17 to 24 a two star rating is given.
Everything above counts as a one star rating. 

Also, a timer is running -- visible to the user.
This is just for the user's information. 

If the user gets stuck during the game, the "Restart" button allows to start over.
Restarting the game resets the timer, the moves counter, and the star rating.
Most importantly, all cards are flipped face down and shuffled again.


Installation
------------

* Download the repository from Github (https://github.com/tibsel/memory_game) as a zip.
* Unpack the zip on your local drive.
* Open the `index.html` in a browser of your choice.


Dependencies
------------

* Game is developed using jQuery 3.2.1 (jquery-3.2.1.min.js).


Future Development Ideas
------------------------

* Add option in welcome message to select game size (16, 25).


Known Issues
------------

* On the HTC Desire S (considered a legacy device): 
  When the game is loaded on the propitary browser, only the welcome modal is shown.
  The game is not visible in the background as in other browsers.
  Also, when "play game" is pushed the welcome modal does not dissapear.
* DOM maipulation possible.
  In the current way the game is created, it is possible to check for matching symbols by using the browsers delopment features.
  Also, the matching of cards is determined by adding a CSS class to the card elements (spacers).
  This can also be done with the browsers developer tools.
  To prevent these interactions it would be necessary to create a proper back end application which handles the game logic and stores the status of the game.


Udacity Review Feedback
-----------------------
 * Symbol array duplication by concatination, rather than looping. -- That really seems easier. -- Implemented.
 * Moves string: You could also use the conditional (ternary) operator to make a word singular or plural which is good to do in my opinion so you can get rid of unnecessary if statements. -- Implemented.
 * It is a good practice to remove console.log statements from finished/production apps. -- Implmented.
 * Very nice README. 
   I'd also include instructions on how someone could play the game if they downloaded your files (it's more important if the project is on GitHub, or will be on GitHub) - for this project it would be really simple, just opening index.html in a web browser.
   But I think it's still important to mention that so they know exactly what to do as sometimes you might have to install some dependencies or otherwise configure your local machine to run some downloaded code. -- Implemented.

