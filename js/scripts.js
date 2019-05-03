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

var currentPlayerSet = new playerList();

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
  var dieSetToRead = currentDieSet;
  dieSetToRead.dieGroup.forEach(function(die) {
    if (die.readValue() == 1) {
      scoreSum = 0;
      turnEndStatus = true;
      return true;
    }
  });
  return false;
}

function addToPendingScoreStandard() {
  var checkBust = determineBustStandard();
  if (!(checkBust)) {
    currentDieSet.dieGroup.forEach(function (die) {
      scoreSum += die.readValue();
    });
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
  var checkBust = determineBustTwoDice();
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

$(document).ready(function() {
  var playerTurn = 0;
  var turnEndStatus = false;
  var scoreSum = 0;
  $("form#new-game-form").submit(function(event) {
    event.preventDefault();
  });
});
