/*
* The board keeps track only of positions and X's and O's, and whether the
* board is in a winning or drawn state.
*/

var board = {
  positions: [false, false, false,
              false, false, false,
              false, false, false],

  winningCombinations:  [[0,1,2], [3,4,5], [6,7,8], 
                         [0,3,6], [1,4,7],
                         [2,5,8],[0,4,8], [2,4,6]],

  drawX: function(i) {
    if (this.isPaintedAt(i) || this.isGameOver()) {
      return false;
    }
    this.positions[i] = 'X';
    return true;
  },

  drawO: function(i) {
    if (this.isPaintedAt(i) || this.isGameOver()) {
      return false;
    }
    this.positions[i] = 'O';
    return true;
  },

  isPaintedAt: function(i) {
    return !!this.positions[i];
  },

  isGameOver: function() {
    if (this.didXWin()) {
      return "X";
    } else if (this.didOWin()) {
      return "O";
    } else if (this.isBoardFull()) {
      return "draw";
    } else {
      return false;
    }
  },

  didWin: function(who) {
    for (var a = 0; a < this.winningCombinations.length; a++) {
      if(this.positions[this.winningCombinations[a][0]] == who &&
         this.positions[this.winningCombinations[a][1]] == who &&
         this.positions[this.winningCombinations[a][2]] == who) {
        return true;
      }
    }
    return false;
  },

  didXWin: function() {
    return this.didWin("X");
  },

  didOWin: function() {
    return this.didWin("O");
  },

  isBoardFull: function() {
    for (var i = 0; i < this.positions.length; i++) {
      if (this.positions[i] == false) {
        return false;
      }
    }
    return true;
  },

  reset: function() {
    for (var i = 0; i < this.positions.length; i++) {
      this.positions[i] = false;
    }
  }
}

/*
* The game object wraps a board with some turn logic.
*/

var game = {
  board: board,
  turn: 0,

  move: function(i) {
    if (this.turn % 2 == 0) {
      if (this.board.drawX(i)) {
        this.trigger("X", i);
        if (this.isOver()) {
          this.trigger("win");
        }
        this.turn++;
        return true;
      }
    } else {
      if (this.board.drawO(i)) {
        this.trigger("O", i);
        if (this.isOver()) {
          this.trigger("win");
        }
        this.turn++;
        return true;
      }
    }
    this.trigger("derp");
    return false;
  },

  isOver: function() {
    return this.board.isGameOver();
  },

  reset: function() {
    this.turn = 0;
    this.board.reset();
  },

  callbacks: {},

  on: function(evt, cb) {
    this.callbacks[evt] = cb;
  },

  trigger: function(evt, i) {
    if (this.callbacks[evt]) {
      this.callbacks[evt](i);
    }
  }
}

/*
* The computer is a simple AI that can make a move on a game object.
*/

var computer = {
  move: function(game) {
    for (var i = 0; i < 9; i++) {
      if (game.move(i)) {
        return true;
      }
    }
    return false;
  }
}

console.log(board.drawX(0), "should be", true)
console.log(board.isPaintedAt(0), "should be", true);
console.log(board.isPaintedAt(1), "should be", false);
console.log(board.drawX(0), "should be", false)
console.log(board.drawO(0), "should be", false)

board.drawX(1);
board.drawX(2);

console.log(board.isGameOver(), "should be", "X");

board.drawO(3);
board.drawO(4);
board.drawO(5);
board.drawO(6);
board.drawO(7);
board.drawO(8);

console.log(board.isBoardFull(), "should be", true);

board.reset();

game.move(0);
game.move(3);
game.move(1);
game.move(4);
game.move(2);

console.log(game.isOver(), "should be", "X");
