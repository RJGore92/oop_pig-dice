# Epicodus Unit 4 Game Of Choice: Pig Dice

#### Game Of Choice assignment in Epicodus Intro to Programming Unit Four: Object-Oriented Programming
##### Start Date: 5/2/2019, Initial Finalization Date: 5/7/2019

#### By **Robert James "Jimmy" Gore**

## Description

The purpose of this project is to create a playable game of Pig Dice using object-oriented programming through the use of JavaScript.  For the purpose of this assignment, dice, players, and lists of both are treated as objects with their own prototypes and details that contribute to gameplay of the dice game, along with three variants of rules that are available for play between two players.

Upon page startup, the user will be asked to select some game rules and what kinds of players will be playing (AI currently not developed but may appear in a future update).  Once they have confirmed their rules and player types and clicked new game, a playing field will appear below the game setup jumbotron, allowing the players to play their game.  A link to details about the Pig Dice game and some variants of the rules are included in a link on the jumbotron containing the game setup info.

Once the game is started, the two players will take turns rolling the die or dice and playing the game as defined by the rules they have set up.  Players have the option to roll or hold their points, and after a player holds their points for the turn or busts on their turn (how a player busts is also determined by the game rules, also listed in specs below), the turn ends and the player clicks the next turn button to cycle over to the next player who will then do the same.  The game ends with the first player to reach one hundred points or more as the winner.

## Setup/Installation Requirements

* Install Git Bash for Git repository cloning of the project
* Install Atom for review and edit of Code
* To access repository for project and review code, first clone repository at the appropriate link, then use Git Bash and/or Atom to open the project folder.
* GitHub (repository/pages) link is (Link here)

## Known Bugs

No known bugs are present in this project.


## Assignment Specs

* Upon page startup, the application will present the user with two drop-down select menus to set up the game with their set of rules and player types (As stated above, AI is currently not established but might be in a future update).  Player type and game mode options are as follows.
1. Player Types:
  * Human vs Human
  * Human vs AI (Easy) (Currently Unavailable)
  * Human vs AI (Hard) (Currently Unavailable)
2. Game Modes
  * One Die Pig
  * Two Dice Pig (Standard rules)
  * Two Dice Pig ("Big Pig" rules)

* Upon submission of the game rules and player types, the game begins in a new playing field below.  The form is capable of restarting the game at any point, whether the game is ended or in-progress and needs to be reset.

* Gameplay proceeds as described within the wikipedia link provided in the game start form, and rules are readily available if needed.  Players take turns rolling dice and gathering points until they either hold their points or bust, after which they pass along control to their opponent player to do the same.  First player to 100 points regardless of game rules wins the game.

## Gameplay scenario examples (What happens when what is rolled)

Below you will find quick logic for how certain rule sets behave.

1. Standard One Die Pig:
  * Rolling a one (1) at any point during a players turn causes them to lose their pending points for the turn and ends their turn as a bust.
  * Rolling any number other than a one (1) causes the die's face value to be added to turn points.  The turn points value is only secured and "held" after a player decides to hold, but is lost on the event of a one (1).  Holding or busting ends the player's turn.
  * The first player to hold 100 or more points wins the match.

2. Standard Two Dice Pig:
  * Just like One Die Pig as listed above, a player will lose their turn points and bust in the event that they roll a single one (1 and 2-6) out of their two dice.
  * Unlike One Die Pig, rolling two ones (1 and 1) will result in the player losing all of their "held" points as well as forfeiting their turn points and ending their turn.
  * If neither die rolled is a one, the face value of both dice is added to turn points.  In the event of a double, players are obligated (but not required to by programming) roll again.

3. Two Dice "Big Pig" rules:
  * As with the game modes listed above, a single one (1) on a dice roll ends the turn with a player's bust.
  * Unlike with the Standard Two Dice Pig rules, rolling a double of ones (1 and 1) will result in a bonus being added to the player's turn points of twenty-five (25) points and does not cause a player to bust.
  * Doubles of any other die value add the total of the dice value times two (two 2s becomes 8 points, two 3s becomes 12, etc.) and are added to the player's accumulating turn total.
  * Any other rolls that do not bust simply add face value to the player's total for the turn.

With all three game variants, the first player to meet or exceed 100 points wins.

## Technologies Used

* Git Bash
* Atom
* HTML
* MD
* CSS
* Bootstrap
* JavaScript
* jQuery

### License

Copyright (c) 2019 **Robert James "Jimmy" Gore**
