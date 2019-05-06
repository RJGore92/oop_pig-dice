function DieSet() {
  this.dieGroup = [],
  this.dieCount = 0
}

DieSet.prototype.addDie = function (die) {
  die.dieID = this.assignDieID();
  this.dieGroup.push(die);
};

DieSet.prototype.assignDieID = function () {
  this.dieCount += 1;
  return this.dieCount;
};

DieSet.prototype.readDieInfo = function (dieId) {
  for (var i = 0; i < this.dieGroup.length; i++) {
    if (this.dieGroup[i]) {
      if (this.dieGroup[i].dieID == dieId) {
        return this.dieGroup[i];
      }
    }
  }
  return false;
};

DieSet.prototype.deleteDie = function (dieId) {
  for (var i = 0; i < this.dieGroup.length; i++) {
    if (this.dieGroup[i]) {
      if (this.dieGroup[i].dieID == dieId) {
        delete this.dieGroup[i];
        return true;
      }
    }
  }
  return false;
};

DieSet.prototype.newGameDiceReset = function () {
  this.dieGroup = [];
  this.dieCount = 0;
};

var currentDieSet = new DieSet();

DieSet.prototype.rollAllDice = function () {
  this.dieGroup.forEach(function(die) {
    die.rollDie();
  });
};

function Die () {
  this.rolledNumber = 1
}

Die.prototype.rollDie = function () {
  var randomDieNumber = Math.random() * 6;
  console.log(randomDieNumber);
  var numberRolled = Math.ceil(randomDieNumber);
  if (numberRolled == 0) {
    numberRolled = 1;
  }
  console.log(numberRolled);
  this.rolledNumber = numberRolled;
};

Die.prototype.readValue = function () {
  return this.rolledNumber;
};

function PlayerList() {
  this.players = [],
  this.playerCount = 0
}

PlayerList.prototype.addPlayer = function (player) {
  player.playerID = this.assignPlayerID();
  this.players.push(player);
};

PlayerList.prototype.assignPlayerID = function () {
  this.playerCount += 1;
  return this.playerCount;
};

PlayerList.prototype.readPlayerInfo = function (playerId) {
  for (var i = 0; i < this.players.length; i++) {
    if (this.players[i]) {
      if (this.players[i].playerID == dieId) {
        return this.players[i];
      }
    }
  }
  return false;
};

PlayerList.prototype.deletePlayer = function (playerId) {
  for (var i = 0; i < this.players.length; i++) {
    if (this.players[i]) {
      if (this.players[i].playerID == dieId) {
        delete this.players[i];
        return true;
      }
    }
  }
  return false;
};

PlayerList.prototype.newGamePlayerReset = function () {
  this.players = [];
  this.playerCount = 0;
};

PlayerList.prototype.determineLeader = function () {
  var playerScoreOne = this.players[0].readScore();
  var playerScoreTwo = this.players[1].readScore();
  if (playerScoreOne > playerScoreTwo) {
    return this.players[0];
  }
  else if (playerScoreOne < playerScoreTwo) {
    return this.players[1];
  }
  else {
    return "The game is tied at this time.";
  }
};

var currentPlayerSet = new PlayerList();

function Player() {
  this.score = 0,
  this.playerType = ""
}

Player.prototype.readScore = function () {
  return this.score;
};

Player.prototype.addToScore = function(numberToAdd) {
  var currentScore = this.score;
  var scoreAdded = numberToAdd;
  var scoreSum = currentScore + scoreAdded;
  this.score = scoreSum;
};

Player.prototype.resetScore = function () {
  this.score = 0;
};

Player.prototype.determineWinner = function () {
  if (this.score >= 100) {
    return true;
  }
  else {
    return false;
  }
};

Player.prototype.assignHumanPlayer = function () {
  this.playerType = "Human";
};

Player.prototype.assignEasyAIPlayer = function () {
  this.playerType = "AIEasy";
};
Player.prototype.assignHardAIPlayer = function () {
  this.playerType = "AIHard";
};

function determineBustStandard() {
  if (currentDieSet.dieGroup[0].readValue() == 1) {
    return true;
  }
  else {
    return false;
  }
}

function addToPendingScoreStandard() {
  var checkBust = determineBustStandard();
  console.log(checkBust);
  if (!(checkBust)) {
    currentDieSet.dieGroup.forEach(function (die) {
      scoreSum += die.readValue();
    });
  }
  else {
    scoreSum = 0;
    turnEndStatus = true;
  }
}

function determineBustTwoDice(playerId) {
  var dieSetToRead = currentDieSet;
  var bustLevel = 0;
  dieSetToRead.dieGroup.forEach(function(die) {
    if (die.readValue() == 1) {
      bustLevel += 1;
    }
  });
  if (bustLevel == 2) {
    currentPlayerSet.players[playerId].resetScore();
    scoreSum = 0;
    turnEndStatus = true;
    return true;
  }
  else if (bustLevel == 1) {
    scoreSum = 0;
    turnEndStatus = true;
    return true;
  }
  else {
    return false;
  }
}

function addToPendingScoreTwoDice() {
  var playerIDToRead = playerTurn + 1;
  var checkBust = determineBustTwoDice(playerIDToRead);
  console.log(checkBust);
  if (!(checkBust)) {
    currentDieSet.dieGroup.forEach(function (die) {
      scoreSum += die.readValue();
    });
  }
}

function determineBustBigPig() {
  var dieSetToRead = currentDieSet;
  var snakeEyesCount = 0;
  dieSetToRead.dieGroup.forEach(function(die) {
    if (die.readValue() == 1) {
      snakeEyesCount += 1;
    }
  });
  if (snakeEyesCount != 1) {
    return false;
  }
  else {
    scoreSum = 0;
    turnEndStatus = true;
    return true;
  }
}

function addToPendingScoreBigPig() {
  var checkBust = determineBustBigPig();
  if (!(checkBust)) {
    if ((currentDieSet.dieGroup[0].readValue() == 1) && (currentDieSet.dieGroup[1].readValue() == 1)) {
      scoreSum += 25;
    }
    else if (currentDieSet.dieGroup[0].readValue() == currentDieSet.dieGroup[1].readValue()) {
      scoreSum += (currentDieSet.dieGroup[0].readValue() * 4);
    }
    else {
      currentDieSet.dieGroup.forEach(function(die){
        scoreSum += die.readValue();
      });
    }
  }
}

function setupNewGame(playersType, gameMode) {
  var playersTypeRead = playersType.toLowerCase();
  var gameModeRead = gameMode.toLowerCase();
  console.log(playersTypeRead);
  console.log(gameModeRead);
  if (playersTypeRead == "two-player") {
    aiState = 0;
  }
  if (playersTypeRead == "easy-ai") {
    aiState = 1;
  }
  if (playersTypeRead == "hard-ai") {
    aiState = 2;
  }
  if (gameModeRead == "one-die") {
    gameState = 0;
  }
  if (gameModeRead == "two-dice-standard") {
    gameState = 1;
  }
  if (gameModeRead == "two-dice-big-pig") {
    gameState = 2;
  }
}

function initializeGame(playerState, gameType) {
  $("div.playing-field-jumbo").show();
  currentDieSet.newGameDiceReset();
  currentPlayerSet.newGamePlayerReset();
  scoreSum = 0;
  var dieOne = new Die();
  var dieTwo = new Die();
  var playerOne = new Player();
  playerOne.assignHumanPlayer();
  var playerTwo = new Player();
  if (playerState == 0) {
    $("span#player-state-display").text("Human vs. Human");
    playerTwo.assignHumanPlayer();
  }
  if (playerState == 1) {
    $("span#player-state-display").text("Human vs. AI (Easy)");
    playerTwo.assignEasyAIPlayer();
  }
  if (playerState == 2) {
    $("span#player-state-display").text("Human vs. AI (Hard)");
    playerTwo.assignHardAIPlayer();
  }
  currentPlayerSet.addPlayer(playerOne);
  currentPlayerSet.addPlayer(playerTwo);
  if (gameType == 0) {
    $("span#game-mode-display").text("One Die Pig");
    currentDieSet.addDie(dieOne);
    $("div.die-two").hide();
  }
  if (gameType == 1) {
    $("span#game-mode-display").text("Two Dice Pig");
    currentDieSet.addDie(dieOne);
    currentDieSet.addDie(dieTwo);
    $("div.die-two").show();
  }
  if (gameType == 2) {
    $("span#game-mode-display").text("Two Dice Big Pig");
    $("div.die-two").show();
    currentDieSet.addDie(dieOne);
    currentDieSet.addDie(dieTwo);
  }
  $("span#player-turn-number").text(playerTurn + 1);
  $("span#score-value").text(scoreSum);
  hideAllDieImages();
}

function displayDieOne(dieVal) {
  $("img.die-1-1").hide();
  $("img.die-1-2").hide();
  $("img.die-1-3").hide();
  $("img.die-1-4").hide();
  $("img.die-1-5").hide();
  $("img.die-1-6").hide();
  $("img.die-1-" + dieVal).show();
}

function displayDieTwo(dieVal) {
  $("img.die-2-1").hide();
  $("img.die-2-2").hide();
  $("img.die-2-3").hide();
  $("img.die-2-4").hide();
  $("img.die-2-5").hide();
  $("img.die-2-6").hide();
  $("img.die-2-" + dieVal).show();
}

function hideAllDieImages() {
  $("img.die-1-1").hide();
  $("img.die-1-2").hide();
  $("img.die-1-3").hide();
  $("img.die-1-4").hide();
  $("img.die-1-5").hide();
  $("img.die-1-6").hide();
  $("img.die-2-1").hide();
  $("img.die-2-2").hide();
  $("img.die-2-3").hide();
  $("img.die-2-4").hide();
  $("img.die-2-5").hide();
  $("img.die-2-6").hide();
}

function executeRoll() {
  currentDieSet.rollAllDice();
  displayDieOne(currentDieSet.dieGroup[0].readValue());
  if (currentDieSet.dieGroup.length == 2) {
    displayDieTwo(currentDieSet.dieGroup[1].readValue());
  }
}

function determineScoring() {
  if (!turnEndStatus && !gameEndState) {
    var playerIDToRead = playerTurn + 1;
    executeRoll();
    if (gameState == 0) {
      addToPendingScoreStandard();
    }
    if (gameState == 1) {
      addToPendingScoreTwoDice(playerIDToRead);
    }
    if (gameState == 2) {
      addToPendingScoreBigPig();
    }
    $("span#score-value").text(scoreSum);
  }
  else if (gameEndState) {
    alert("The game has ended.  To play again, click 'new game'.");
  }
  else {
    alert("The player's turn is ended.  Please click the 'next turn' button to continue gameplay.");
  }
}

function holdPoints() {
  var playerIDToRead = playerTurn + 1;
  if ((scoreSum > 0) && (!turnEndStatus) && (!gameEndState)) {
    currentPlayerSet.players[playerIDToRead].addToScore(scoreSum);
    scoreSum = 0;
    turnEndStatus = true;
    if (playerTurn == 0) {
      $("span#player-one-score-value").text(currentPlayerSet.players[0].readScore());
    }
    else {
      $("span#player-two-score-value").text(currentPlayerSet.players[1].readScore());
    }
    if (currentPlayerSet.players[playerIDToRead].determineWinner()) {
      gameEndState = true;
      if (playerIDToRead == 1) {
        $("span#player-one-victory").show();
      }
      else {
        $("span#player-two-victory").show();
      }
    }
  }
  else if (gameEndState) {
    alert("The game has ended.  To play again, click 'new game'.");
  }
  else {
    alert("The player's turn is ended.  PLease click the 'next turn' button to continue gameplay.")
  }
}

function newTurn() {
  if (turnEndStatus && !gameEndState) {
    playerTurn += 1;
    if (playerTurn == 2) {
      playerTurn = 0;
    }
    turnEndStatus = false;
  }
  else if (gameEndState) {
    alert("The game has ended.  To play again, click 'new game'.")
  }
  else {
    alert("This turn has not been ended by bust or player call yet.")
  }
}

var gameEndState = false;
var aiState = 0;
var gameState = 0;
var playerTurn = 0;
var turnEndStatus = false;
var scoreSum = 0;

$(document).ready(function() {
  $("form#new-game-form").submit(function(event) {
    event.preventDefault();
    var playerTypeSelect = $("select#player-type-select").val();
    var gameModeSelect = $("select#game-type-select").val();
    setupNewGame(playerTypeSelect, gameModeSelect);
    console.log(aiState);
    console.log(gameState);
    initializeGame(aiState, gameState);
  });
});
