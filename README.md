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
* Test on other devices: 
  * iPad (iOS 10.3.3) -- Issue: grid layout of cards does not seem to work 
  * iPhone -- fine
  * HTC Desire S (legacy) -- Issue: Nothing happens when "play game" is pushed. Also nothing in the background visible. Probably no JS. Hm JS is enabled. 
  * Firefox on Linux -- fine
  * Chromium on Linux -- fine
  * Safari on macOS -- fine
  * Firefox on macOS -- fine, development
  * Chrome on macOS -- fine
* Issue: When clicking over and over on a crad that is rejected, it can be selected/flipped up before is fully flipped down. The flipping down animation seems to be skipped.
* Below title text on welcome should get wider on small devices, so it does not get so long.
* Clean up old comments.
* Make sure every function is at least called once. Remove unneeded functions.
* Check HTML and CSS in code validators.
* Reactivate shuffeling.
* Reset correct limits for star rating and game to be won.
* Switch to online jQuery and remove local copy.
* (Optional) Add option in welcome message to select game size (16, 32)
* Prevent DOM maipulation for matching cards. Currently the matched class could be added to any card in the DOM. I have to think about this a little more. But, what I now realize is that the symbols are visible in the DOM.Not sure if I have to take cre of things like that to pass the class. It is not in the rubric.
