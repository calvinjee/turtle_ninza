/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Entity = function () {
  function Entity(options) {
    _classCallCheck(this, Entity);

    this.sX = options.sX;
    this.sY = options.sY;
    this.sWidth = options.sWidth;
    this.sHeight = options.sHeight;
    this.dX = options.dX;
    this.dY = options.dY;
    this.dWidth = options.dWidth;
    this.dHeight = options.dHeight;
    this.game = options.game;
  }

  _createClass(Entity, [{
    key: "isCollidedWith",
    value: function isCollidedWith() {}
  }, {
    key: "move",
    value: function move() {}
  }, {
    key: "draw",
    value: function draw(ctx) {
      ctx.drawImage(this.image, this.sX, // source x
      this.sY, // source y
      this.sWidth, // source width
      this.sHeight, // source height
      this.dX, // destination x
      this.dY, // destination y
      this.dWidth, // destination width
      this.dHeight // destination height
      );
    }
  }, {
    key: "remove",
    value: function remove() {
      this.game.remove(this);
    }
  }]);

  return Entity;
}();

exports.default = Entity;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _player = __webpack_require__(2);

var _player2 = _interopRequireDefault(_player);

var _pizza_box = __webpack_require__(3);

var _pizza_box2 = _interopRequireDefault(_pizza_box);

var _pizza = __webpack_require__(6);

var _pizza2 = _interopRequireDefault(_pizza);

var _projectile = __webpack_require__(4);

var _projectile2 = _interopRequireDefault(_projectile);

var _platform = __webpack_require__(7);

var _platform2 = _interopRequireDefault(_platform);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  function Game() {
    _classCallCheck(this, Game);

    this.players = [];
    this.projectiles = [];
    this.pizzaBoxes = [];
    this.pizzas = [];
    this.platforms = [];
    this.score = 0;
    this.lives = 4;
  }

  _createClass(Game, [{
    key: 'updateScore',
    value: function updateScore(ctx) {
      ctx.fillText(this.score, 10, 30);
    }
  }, {
    key: 'updateLives',
    value: function updateLives(ctx) {
      var x = Game.DIM_X - 20;
      for (var i = 0; i < this.lives; i++) {
        ctx.beginPath();
        ctx.arc(x, 20, 7.5, 0, 2 * Math.PI);
        ctx.fill();
        x -= 20;
      }
    }
  }, {
    key: 'rainPizza',
    value: function rainPizza() {
      var _this = this;

      setInterval(function () {
        _this.addPizzaBox();
      }, 1000);
    }
  }, {
    key: 'add',
    value: function add(object) {
      if (object instanceof _player2.default) {
        this.players.push(object);
      } else if (object instanceof _pizza_box2.default) {
        this.pizzaBoxes.push(object);
      } else if (object instanceof _projectile2.default) {
        this.projectiles.push(object);
      } else if (object instanceof _pizza2.default) {
        this.pizzas.push(object);
      } else if (object instanceof _platform2.default) {
        this.platforms.push(object);
      }
    }
  }, {
    key: 'remove',
    value: function remove(object) {
      if (object instanceof _player2.default) {
        this.players.splice(this.players.indexOf(object), 1);
      } else if (object instanceof _pizza_box2.default) {
        this.pizzaBoxes.splice(this.pizzaBoxes.indexOf(object), 1);
      } else if (object instanceof _projectile2.default) {
        this.projectiles.splice(this.projectiles.indexOf(object), 1);
      } else if (object instanceof _pizza2.default) {
        this.pizzas.splice(this.pizzas.indexOf(object), 1);
      } else if (object instanceof _platform2.default) {
        this.platforms.splice(this.platforms.indexOf(object), 1);
      }
    }
  }, {
    key: 'addPlayer',
    value: function addPlayer(platformY) {
      var playerImage = new Image();
      playerImage.src = './assets/images/raf_sprite.gif';

      var playerOptions = {
        image: playerImage,
        sX: 0,
        sY: 115,
        sWidth: 350 / 5,
        sHeight: 85,
        dX: Game.DIM_X / 2,
        dY: platformY - _player2.default.PLATFORM_ADJ,
        dWidth: 350 / 5 * _player2.default.SCALE,
        dHeight: 85 * _player2.default.SCALE,
        movement: {
          x: 0,
          y: 115,
          width: 350,
          height: 85,
          numberOfFrames: 5
        },
        game: this
      };

      var player = new _player2.default(playerOptions);
      this.add(player);

      return player;
    }
  }, {
    key: 'addPizzaBox',
    value: function addPizzaBox() {
      var startX = 50 + Math.floor(Math.random() * (Game.DIM_X - 100));
      var fallSpeed = Math.random() + 2;

      var pizzaBoxOptions = {
        sX: 0,
        sY: 0,
        sWidth: 4000,
        sHeight: 2845,
        dX: startX,
        dY: -20,
        dWidth: 4000 * _pizza_box2.default.SCALE,
        dHeight: 2845 * _pizza_box2.default.SCALE,
        fallSpeed: fallSpeed,
        game: this
      };

      var pizzaBox = new _pizza_box2.default(pizzaBoxOptions);
      this.add(pizzaBox);

      return pizzaBox;
    }
  }, {
    key: 'addPizza',
    value: function addPizza(dX, dY, fallSpeed) {
      var pizzaOptions = {
        sX: 0,
        sY: 0,
        sWidth: 259,
        sHeight: 329,
        dX: dX + 5,
        dY: dY + 5,
        dWidth: 259 * _pizza2.default.SCALE,
        dHeight: 329 * _pizza2.default.SCALE,
        fallSpeed: fallSpeed,
        game: this
      };

      var pizza = new _pizza2.default(pizzaOptions);
      this.add(pizza);

      return pizza;
    }
  }, {
    key: 'addPlatform',
    value: function addPlatform() {
      var platformOptions = {
        sX: 0,
        sY: 0,
        sWidth: 538,
        sHeight: 70,
        dX: 0,
        dY: Game.DIM_Y - 30,
        dWidth: 538 * _platform2.default.SCALE,
        dHeight: 70 * _platform2.default.SCALE,
        game: this
      };

      var platform = new _platform2.default(platformOptions);
      this.add(platform);

      return platform;
    }
  }, {
    key: 'checkPizzaBoxHits',
    value: function checkPizzaBoxHits() {
      for (var i = 0; i < this.projectiles.length; i++) {
        for (var j = 0; j < this.pizzaBoxes.length; j++) {
          var projectile = this.projectiles[i];
          var pizzaBox = this.pizzaBoxes[j];
          if (projectile.isCollidedWith(pizzaBox)) {
            Game.SOUNDS.hitPizzaBox.playbackRate = 4;
            Game.SOUNDS.hitPizzaBox.play();
            pizzaBox.remove();
            this.addPizza(pizzaBox.dX, pizzaBox.dY, pizzaBox.fallSpeed);
            this.score += 10;
          }
        }
      }
    }
  }, {
    key: 'checkPlayerCollision',
    value: function checkPlayerCollision() {
      var player = this.players[0];
      var fallingObjects = this.fallingObjects();
      for (var i = 0; i < fallingObjects.length; i++) {
        var item = fallingObjects[i];
        if (player.isCollidedWith(item)) {
          if (item instanceof _pizza_box2.default) {
            if (this.lives > 1) {
              Game.SOUNDS.loseLife.play();
            }
            this.lives -= 1;
            player.loseLife();
            item.remove();
          } else if (item instanceof _pizza2.default) {
            Game.SOUNDS.eatPizza.volume = 1;
            Game.SOUNDS.eatPizza.playbackRate = 2;
            Game.SOUNDS.eatPizza.play();
            item.remove();
            this.score += 10;
          }
        }
      }
    }
  }, {
    key: 'fallingObjects',
    value: function fallingObjects() {
      return [].concat(this.pizzaBoxes, this.pizzas);
    }
  }, {
    key: 'allObjects',
    value: function allObjects() {
      return [].concat(this.projectiles, this.pizzaBoxes, this.pizzas, this.platforms, this.players);
    }
  }, {
    key: 'moveObjects',
    value: function moveObjects() {
      this.allObjects().forEach(function (object) {
        object.move();
      });
    }
  }, {
    key: 'step',
    value: function step() {
      this.moveObjects();
      this.checkPizzaBoxHits();
      this.checkPlayerCollision();
    }
  }, {
    key: 'draw',
    value: function draw(ctx) {
      ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
      this.allObjects().forEach(function (object) {
        object.draw(ctx);
      });
    }
  }]);

  return Game;
}();

Game.DIM_X = 400;
Game.DIM_Y = 500;
Game.SOUNDS = {
  gameMusic: new Audio('./assets/sounds/game_music.mp3'),
  throwProjectile: new Audio('./assets/sounds/throw.wav'),
  hitPizzaBox: new Audio('./assets/sounds/hit.wav'),
  eatPizza: new Audio('./assets/sounds/crunch.wav'),
  raisePlatform: new Audio('./assets/sounds/platform.wav'),
  loseLife: new Audio('./assets/sounds/lose_life.wav'),
  loseGame: new Audio('./assets/sounds/lose_game.wav')
};

exports.default = Game;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _game = __webpack_require__(1);

var _game2 = _interopRequireDefault(_game);

var _entity = __webpack_require__(0);

var _entity2 = _interopRequireDefault(_entity);

var _projectile = __webpack_require__(4);

var _projectile2 = _interopRequireDefault(_projectile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Player = function (_Entity) {
  _inherits(Player, _Entity);

  function Player(options) {
    _classCallCheck(this, Player);

    var _this = _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this, options));

    _this.moveBools = {
      left: false,
      right: false
    };
    _this.canShoot = true;
    _this.image = options.image;
    _this.frameIndex = 0;
    _this.tickCount = 0;
    _this.ticksPerFrame = 10;
    _this.movement = options.movement;
    _this.hit = false;
    _this.hitCount = 0;
    _this.hitFrames = [0, 1000];
    return _this;
  }

  _createClass(Player, [{
    key: 'shoot',
    value: function shoot() {
      var _this2 = this;

      var projectileOptions = {
        sX: 0,
        sY: 0,
        sWidth: 512,
        sHeight: 512,
        dX: this.dX + 20,
        dY: this.game.platforms[0].dY - Player.PLATFORM_ADJ,
        dWidth: 25,
        dHeight: 25,
        game: this.game
      };

      var projectile = new _projectile2.default(projectileOptions);
      projectile.game.add(projectile);
      this.canShoot = false;
      setTimeout(function () {
        _this2.canShoot = true;
      }, 250);
    }
  }, {
    key: 'isCollidedWith',
    value: function isCollidedWith(object) {
      if (this.hit === false) {
        if (object.dY + object.dHeight < this.game.platforms[0].dY && this.dY < object.dY + object.dHeight && (object.dX > this.dX && object.dX < this.dX + this.dWidth || object.dX + object.dWidth > this.dX && object.dX + object.dWidth < this.dX + this.dWidth)) {
          return true;
        }
        return false;
      }
    }
  }, {
    key: 'loseLife',
    value: function loseLife() {
      if (this.hit === false) {
        this.hit = true;
        this.moveBools = {
          left: false,
          right: false
        };
        this.tickCount = 0;
        this.frameIndex = 0;
      }
    }
  }, {
    key: 'move',
    value: function move() {
      if (Object.values(this.moveBools).some(function (bool) {
        return bool === true;
      })) {
        this.tickCount += 1;

        var dir = 0;
        switch (this.direction) {
          case 'left':
            // left
            if (this.dX >= -20) {
              dir = -5;
            }
            break;
          case 'right':
            // right
            if (this.dX <= _game2.default.DIM_X - this.dWidth + 40) {
              dir = 5;
            }
            break;
        }

        this.dX += dir;
        this.dY = this.game.platforms[0].dY - Player.PLATFORM_ADJ;

        this.sX = this.frameIndex * (this.movement.width / this.movement.numberOfFrames);
        this.sY = this.movement.y;
        this.sWidth = this.movement.width / this.movement.numberOfFrames;
        this.sHeight = this.movement.height;

        if (this.tickCount > this.ticksPerFrame) {
          this.frameIndex = (this.frameIndex + 1) % this.movement.numberOfFrames;
          this.tickCount = 0;
        }
      }
    }
  }, {
    key: 'draw',
    value: function draw(ctx) {

      if (this.hit) {
        this.tickCount += 1;
        this.hitCount += 1;
        this.sY = 1240;
        this.sX = this.hitFrames[this.frameIndex];

        if (this.tickCount > 5) {
          // this.hit = false;
          // this.sY = this.movement.y;
          this.frameIndex = (this.frameIndex + 1) % this.hitFrames.length;
          this.tickCount = 0;
        }

        if (this.hitCount >= 120) {
          this.hit = false;
          this.hitCount = 0;
          this.sY = 115;
          this.sX = 0;
        }

        this.dY = this.game.platforms[0].dY - Player.PLATFORM_ADJ;
      }
      ctx.drawImage(this.image, this.sX, // source x
      this.sY, // source y
      this.sWidth, // source width
      this.sHeight, // source height
      this.dX, // destination x
      this.game.platforms[0].dY - Player.PLATFORM_ADJ, // destination y
      this.dWidth, // destination width
      this.dHeight // destination height
      );
    }
  }]);

  return Player;
}(_entity2.default);

Player.SCALE = 1.25;
Player.PLATFORM_ADJ = 80;

exports.default = Player;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _entity = __webpack_require__(0);

var _entity2 = _interopRequireDefault(_entity);

var _game = __webpack_require__(1);

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var pizzaBoxImage = new Image();
pizzaBoxImage.src = './assets/images/pizza_box.png';

var PizzaBox = function (_Entity) {
  _inherits(PizzaBox, _Entity);

  function PizzaBox(options) {
    _classCallCheck(this, PizzaBox);

    var _this = _possibleConstructorReturn(this, (PizzaBox.__proto__ || Object.getPrototypeOf(PizzaBox)).call(this, options));

    _this.fallSpeed = options.fallSpeed;
    _this.image = pizzaBoxImage;
    return _this;
  }

  _createClass(PizzaBox, [{
    key: 'move',
    value: function move() {
      this.dY += this.fallSpeed;
      if (this.dY > _game2.default.DIM_Y) {
        // Game.SOUNDS.raisePlatform.currentTime = 3;
        // Game.SOUNDS.raisePlatform.playbackRate = 2;
        _game2.default.SOUNDS.raisePlatform.play();
        this.remove();
        this.game.platforms[0].rise();
      }
    }
  }]);

  return PizzaBox;
}(_entity2.default);

PizzaBox.SCALE = 0.015;

exports.default = PizzaBox;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _entity = __webpack_require__(0);

var _entity2 = _interopRequireDefault(_entity);

var _game = __webpack_require__(1);

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var projectileImage = new Image();
projectileImage.src = './assets/images/shuriken_anim.png';

var Projectile = function (_Entity) {
  _inherits(Projectile, _Entity);

  function Projectile(options) {
    _classCallCheck(this, Projectile);

    var _this = _possibleConstructorReturn(this, (Projectile.__proto__ || Object.getPrototypeOf(Projectile)).call(this, options));

    _this.image = projectileImage;
    _this.frameIndex = 0;
    _this.tickCount = 0;
    _this.ticksPerFrame = 0;
    _this.numberOfFrames = 4;
    return _this;
  }

  _createClass(Projectile, [{
    key: 'move',
    value: function move() {
      this.tickCount += 1;
      this.dY -= 8;
      if (this.dY < 0) {
        this.remove();
      }

      if (this.tickCount > this.ticksPerFrame) {
        this.frameIndex = (this.frameIndex + 1) % this.numberOfFrames;
        this.tickCount = 0;
      }

      this.sX = this.sWidth * this.frameIndex;
    }
  }, {
    key: 'isCollidedWith',
    value: function isCollidedWith(pizzaBox) {
      if (pizzaBox.dY + pizzaBox.dHeight < this.game.players[0].dY && this.dY < pizzaBox.dY + pizzaBox.dHeight && (this.dX > pizzaBox.dX && this.dX < pizzaBox.dX + pizzaBox.dWidth || this.dX + this.dWidth > pizzaBox.dX && this.dX + this.dWidth < pizzaBox.dX + pizzaBox.dWidth)) {
        return true;
      }
      return false;
    }
  }]);

  return Projectile;
}(_entity2.default);

exports.default = Projectile;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _entity = __webpack_require__(0);

var _entity2 = _interopRequireDefault(_entity);

var _player = __webpack_require__(2);

var _player2 = _interopRequireDefault(_player);

var _pizza_box = __webpack_require__(3);

var _pizza_box2 = _interopRequireDefault(_pizza_box);

var _game = __webpack_require__(1);

var _game2 = _interopRequireDefault(_game);

var _game_view = __webpack_require__(8);

var _game_view2 = _interopRequireDefault(_game_view);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');

  var game = new _game2.default();
  var gameView = new _game_view2.default(game, ctx);
  var introModal = document.getElementById("intro");
  window.directionsModal = document.getElementById("directions");

  window.startGame = function (e) {
    if (e.keyCode === 13) {
      window.directionsModal.className = "hidden";
      var newGame = new _game2.default();
      gameView.game = newGame;
      gameView.start();
      removeEventListener('keypress', window.startGame);
    }
  };

  setTimeout(function () {
    introModal.className = "hidden";
    window.directionsModal.className = "modal";
    addEventListener('keypress', window.startGame);
  }, 3000);
});

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _entity = __webpack_require__(0);

var _entity2 = _interopRequireDefault(_entity);

var _game = __webpack_require__(1);

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var pizzaImage = new Image();
pizzaImage.src = './assets/images/pizza_anim.png';

var Pizza = function (_Entity) {
  _inherits(Pizza, _Entity);

  function Pizza(options) {
    _classCallCheck(this, Pizza);

    var _this = _possibleConstructorReturn(this, (Pizza.__proto__ || Object.getPrototypeOf(Pizza)).call(this, options));

    _this.fallSpeed = options.fallSpeed;
    _this.image = pizzaImage;
    _this.frameIndex = 0;
    _this.tickCount = 0;
    _this.ticksPerFrame = 7;
    _this.numberOfFrames = 8;
    return _this;
  }

  _createClass(Pizza, [{
    key: 'move',
    value: function move() {
      this.tickCount += 1;
      this.dY += this.fallSpeed;
      if (this.dY > _game2.default.DIM_Y) {
        this.remove();
      }

      if (this.tickCount > this.ticksPerFrame) {
        this.frameIndex = (this.frameIndex + 1) % this.numberOfFrames;
        this.tickCount = 0;
      }
      this.sX = this.frameIndex * this.sWidth;
    }
  }]);

  return Pizza;
}(_entity2.default);

Pizza.SCALE = .11;

exports.default = Pizza;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _entity = __webpack_require__(0);

var _entity2 = _interopRequireDefault(_entity);

var _game = __webpack_require__(1);

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var platformImage = new Image();
platformImage.src = './assets/images/platform_2.png';

var Platform = function (_Entity) {
  _inherits(Platform, _Entity);

  function Platform(options) {
    _classCallCheck(this, Platform);

    var _this = _possibleConstructorReturn(this, (Platform.__proto__ || Object.getPrototypeOf(Platform)).call(this, options));

    _this.image = platformImage;
    _this.riseSteps = 0;
    return _this;
  }

  _createClass(Platform, [{
    key: 'rise',
    value: function rise() {
      this.riseSteps += 40;
    }
  }, {
    key: 'move',
    value: function move() {
      if (this.riseSteps > 0) {
        this.riseSteps -= 1;
        this.dY -= 0.5;
      }
    }
  }]);

  return Platform;
}(_entity2.default);

Platform.SCALE = 1;

exports.default = Platform;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _game = __webpack_require__(1);

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameView = function () {
  function GameView(game, ctx) {
    _classCallCheck(this, GameView);

    this.game = game;
    this.ctx = ctx;
    this.ctx.font = '28px Slackey';
    this.ctx.fillStyle = '#84152D';
    this.addHandlers();
  }

  _createClass(GameView, [{
    key: 'start',
    value: function start() {
      this.platform = this.game.addPlatform();
      this.player = this.game.addPlayer(this.platform.dY);
      this.game.rainPizza();
      _game2.default.SOUNDS.gameMusic.currentTime = 0;
      _game2.default.SOUNDS.gameMusic.play();
      requestAnimationFrame(this.animate.bind(this));
    }
  }, {
    key: 'addHandlers',
    value: function addHandlers() {
      var _this = this;

      document.addEventListener('keydown', function (e) {
        switch (e.keyCode) {
          case 37:
            // left
            _this.player.direction = 'left';
            _this.player.moveBools.left = true;
            break;
          case 39:
            // right
            _this.player.direction = 'right';
            _this.player.moveBools.right = true;
            break;
        }
      });

      document.addEventListener('keypress', function (e) {
        switch (e.keyCode) {
          case 32:
            // space
            _game2.default.SOUNDS.throwProjectile.play();
            _this.player.shoot();
            break;
        }
      });

      document.addEventListener('keyup', function (e) {
        switch (e.keyCode) {
          case 37:
            // left
            _this.player.moveBools.left = false;
            break;
          case 39:
            // right
            _this.player.moveBools.right = false;
            break;
        }
      });
    }
  }, {
    key: 'animate',
    value: function animate() {
      this.game.step();
      this.game.draw(this.ctx);
      this.game.updateScore(this.ctx);
      this.game.updateLives(this.ctx);
      var loop = requestAnimationFrame(this.animate.bind(this));
      if (this.game.lives === 0) {
        _game2.default.SOUNDS.gameMusic.pause();
        _game2.default.SOUNDS.loseGame.play();
        cancelAnimationFrame(loop);
        setTimeout(function () {
          window.directionsModal.className = "modal";
          addEventListener('keypress', window.startGame);
        }, 5000);
      }
    }
  }]);

  return GameView;
}();

exports.default = GameView;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map