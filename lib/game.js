import Player from './player';
import PizzaBox from './pizza_box';
import Pizza from './pizza';
import Projectile from './projectile';
import Platform from './platform';

class Game {
  constructor() {
    this.players = [];
    this.projectiles = [];
    this.pizzaBoxes = [];
    this.pizzas = [];
    this.platforms = [];
    this.score = 0;
    this.lives = 4;
  }

  updateScore(ctx) {
    ctx.fillText(this.score, 10, 30);
  }

  updateLives(ctx) {
    let x = Game.DIM_X - 20;
    for (let i = 0; i < this.lives; i++) {
      ctx.beginPath();
      ctx.arc(x, 20, 7.5, 0, 2 * Math.PI);
      ctx.fill();
      x -= 20;
    }
  }

  rainPizza() {
    setInterval(() => {
      this.addPizzaBox();
    }, 1000);
  }

  add(object) {
    if (object instanceof Player) {
      this.players.push(object);
    } else if (object instanceof PizzaBox) {
      this.pizzaBoxes.push(object);
    } else if (object instanceof Projectile) {
      this.projectiles.push(object);
    } else if (object instanceof Pizza) {
      this.pizzas.push(object);
    } else if (object instanceof Platform) {
      this.platforms.push(object);
    }
  }

  remove(object) {
    if (object instanceof Player) {
      this.players.splice(this.players.indexOf(object), 1);
    } else if (object instanceof PizzaBox) {
      this.pizzaBoxes.splice(this.pizzaBoxes.indexOf(object), 1);
    } else if (object instanceof Projectile) {
      this.projectiles.splice(this.projectiles.indexOf(object), 1);
    } else if (object instanceof Pizza) {
      this.pizzas.splice(this.pizzas.indexOf(object), 1);
    } else if (object instanceof Platform) {
      this.platforms.splice(this.platforms.indexOf(object), 1);
    }
  }

  addPlayer(platformY) {
    const playerImage = new Image();
    playerImage.src = './assets/images/raf_sprite.gif';

    const playerOptions = {
      image: playerImage,
      sX: 0,
      sY: 115,
      sWidth: 350 / 5,
      sHeight: 85,
      dX: Game.DIM_X / 2,
      dY: platformY - Player.PLATFORM_ADJ,
      dWidth: (350 / 5) * Player.SCALE,
      dHeight: 85 * Player.SCALE,
      movement: {
        x: 0,
        y: 115,
        width: 350,
        height: 85,
        numberOfFrames: 5,
      },
      game: this,
    };

    const player = new Player(playerOptions);
    this.add(player);

    return player;
  }

  addPizzaBox() {
    const startX = 50 + Math.floor(Math.random() * (Game.DIM_X - 100));
    const fallSpeed = Math.random() + 2;

    const pizzaBoxOptions = {
      sX: 0,
      sY: 0,
      sWidth: 4000,
      sHeight: 2845,
      dX: startX,
      dY: -20,
      dWidth: 4000 * PizzaBox.SCALE,
      dHeight: 2845 * PizzaBox.SCALE,
      fallSpeed: fallSpeed,
      game: this,
    };

    const pizzaBox = new PizzaBox(pizzaBoxOptions);
    this.add(pizzaBox);

    return pizzaBox;
  }

  addPizza(dX, dY, fallSpeed) {
    const pizzaOptions = {
      sX: 0,
      sY: 0,
      sWidth: 259,
      sHeight: 329,
      dX: dX + 5,
      dY: dY + 5,
      dWidth: 259 * Pizza.SCALE,
      dHeight: 329 * Pizza.SCALE,
      fallSpeed: fallSpeed,
      game: this,
    };

    const pizza = new Pizza(pizzaOptions);
    this.add(pizza);

    return pizza;
  }

  addPlatform() {
    const platformOptions = {
      sX: 0,
      sY: 0,
      sWidth: 538,
      sHeight: 70,
      dX: 0,
      dY: Game.DIM_Y - 30,
      dWidth: 538 * Platform.SCALE,
      dHeight: 70 * Platform.SCALE,
      game: this,
    };

    const platform = new Platform(platformOptions);
    this.add(platform);

    return platform;
  }

  checkPizzaBoxHits() {
    for (let i = 0; i < this.projectiles.length; i++) {
      for (let j = 0; j < this.pizzaBoxes.length; j++) {
        const projectile = this.projectiles[i];
        const pizzaBox = this.pizzaBoxes[j];
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

  checkPlayerCollision() {
    const player = this.players[0];
    const fallingObjects = this.fallingObjects();
    for (let i = 0; i < fallingObjects.length; i++) {
      const item = fallingObjects[i];
      if (player.isCollidedWith(item)) {
        if (item instanceof PizzaBox) {
          if (this.lives > 1) {
            Game.SOUNDS.loseLife.play();
          }
          this.lives -= 1;
          player.loseLife();
          item.remove();
        } else if (item instanceof Pizza) {
          Game.SOUNDS.eatPizza.volume = 1;
          Game.SOUNDS.eatPizza.playbackRate = 2;
          Game.SOUNDS.eatPizza.play();
          item.remove();
          this.score += 10;
        }
      }
    }
  }

  fallingObjects() {
    return [].concat(this.pizzaBoxes, this.pizzas);
  }

  allObjects() {
    return [].concat(
      this.projectiles,
      this.pizzaBoxes,
      this.pizzas,
      this.platforms,
      this.players
    );
  }

  moveObjects() {
    this.allObjects().forEach((object) => {
      object.move();
    });
  }

  step() {
    this.moveObjects();
    this.checkPizzaBoxHits();
    this.checkPlayerCollision();
  }

  draw(ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.allObjects().forEach((object) => {
      object.draw(ctx);
    });
  }
}

Game.DIM_X = 400;
Game.DIM_Y = 500;
Game.SOUNDS = {
  gameMusic: new Audio('./assets/sounds/game_music.mp3'),
  throwProjectile: new Audio('./assets/sounds/throw.wav'),
  hitPizzaBox: new Audio('./assets/sounds/hit.wav'),
  eatPizza: new Audio('./assets/sounds/crunch.wav'),
  raisePlatform: new Audio('./assets/sounds/platform.wav'),
  loseLife: new Audio('./assets/sounds/lose_life.wav'),
  loseGame: new Audio('./assets/sounds/lose_game.wav'),
};

export default Game;
