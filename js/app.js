var START_LINE = -2;
var FINAL_LINE = 7;
var HORIZONTAL_STEP = 101;
var VERTICAL_STEP = 83;
var NUM_COLS = 5;
var NUM_ROWS = 6;

var Enemy = function() {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;
    if (this.x > FINAL_LINE) this.x = START_LINE;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(
      Resources.get(this.sprite),
      colToPixel(this.x),
      rowToPixel(this.y)
  );
};

// Set the enemy on his start position
Enemy.prototype.reset = function() {
  this.y = Math.floor(Math.random() * 3) + 1;
  this.x = - Math.random() * 2 - 1;
  this.speed = Math.random() * 3 + 1;
};

// Check if the enemy has collsioned with the player
Enemy.prototype.checkCollision = function() {
  if (
    this.y == player.y &&
    this.x > player.x - 0.5 &&
    this.x < player.x + 0.5
  ) {
    return true;
  } else {
    return false;
  }
};

// The Player object
var Player = function() {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprites = [
      'images/char-boy.png',
      'images/char-cat-girl.png',
      'images/char-horn-girl.png',
      'images/char-pink-girl.png',
      'images/char-princess-girl.png'
    ];
    this.selectedSprite = 0;
    this.initPosition = {
      x: 2,
      y: 5
    };
};

// Update the player's position if there is a key pressed
Player.prototype.update = function() {
  switch (this.move) {
    case 'left':
      this.x += - 1;
      break;
    case 'up':
      this.y += - 1;
      break;
    case 'right':
      this.x += 1;
      break;
    case 'down':
      this.y += 1;
      break;
    default:

  }
  this.move = "none";
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(
      Resources.get(this.sprites[this.selectedSprite]),
      colToPixel(this.x),
      rowToPixel(this.y)
    );
};

// Set the player on his start position
Player.prototype.reset = function() {
  this.y = this.initPosition.y;
  this.x = this.initPosition.x;
  this.move = "none";
  this.canMove = true;
};

// Check if the player has win
Player.prototype.checkIfWin = function() {
  if (this.y == 0) return true;
  else return false;
};

// Handle all the inputs
Player.prototype.handleInput = function(key) {
  switch (key) {
    case 'left':
      if (this.x > 0 && this.canMove) {
        this.move = key;
      }
      break;
    case 'up':
      if (this.y > 0 && this.canMove) {
        this.move = key;
      }
      break;
    case 'right':
      if (this.x < NUM_COLS - 1 && this.canMove) {
        this.move = key;
      }
      break;
    case 'down':
      if (this.y < NUM_ROWS - 1 && this.canMove) {
        this.move = key;
      }
      break;
    case 'action':
      if (this.y == this.initPosition.y && this.x == this.initPosition.x) {
        this.selectedSprite = (this.selectedSprite + 1) % this.sprites.length;
      }
      break;
  }
}

Player.prototype.setMovement = function(bool) {
  this.canMove = bool;
};

var rowToPixel = function(row) {
  return -25 + 83 * row;
};

var colToPixel = function(col) {
  return 101 * col;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [
  new Enemy(), new Enemy(), new Enemy(), new Enemy(), new Enemy(), new Enemy()
];
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        32: 'action'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
