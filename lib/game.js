import Player from './player';
import PizzaBox from './pizza_box';
import Pizza from './pizza';
import Projectile from './projectile';

class Game {
  constructor() {
    this.players = [];
    this.projectiles = [];
    this.pizzaBoxes = [];
    this.pizzas = [];
    this.platforms = [];
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
    }
    // else if (object instanceof Platform) {
    //   this.players.push(object);
    // }
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
    }
    // else if (object instanceof PizzaBox) {
    //   this.pizzaBoxes.splice(this.pizzaBoxes.indexOf(object), 1);
    //
  }

  addPlayer() {
    const playerImage = new Image();
    playerImage.src = './assets/images/raf_sprite.gif';

    const playerProjectile = new Image();
    playerProjectile.src = './assets/images/shuriken_1.png';

    const playerOptions = {
      image: playerImage,
      sX: 0,
      sY: 115,
      sWidth: 350 / 5,
      sHeight: 85,
      dX: Game.DIM_X / 2,
      dY: Game.DIM_Y - 100,
      dWidth: 350 / 5,
      dHeight: 85,
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
      dY: 0,
      dWidth: 4000 * .0125,
      dHeight: 2845 * .0125,
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
      dWidth: 259 * .1,
      dHeight: 329 * .1,
      fallSpeed: fallSpeed,
      game: this,
    };

    const pizza = new Pizza(pizzaOptions);
    this.add(pizza);

    return pizza;
  }

  // addProjectile() {
  //
  // }

  checkPizzaBoxHits() {
    for (let i = 0; i < this.projectiles.length; i++) {
      for (let j = 0; j < this.pizzaBoxes.length; j++) {
        const projectile = this.projectiles[i];
        const pizzaBox = this.pizzaBoxes[j];
        if (projectile.isCollidedWith(pizzaBox)) {
          pizzaBox.remove();
          this.addPizza(pizzaBox.dX, pizzaBox.dY, pizzaBox.fallSpeed);
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
          console.log('pizzabox')
        } else if (item instanceof Pizza) {
          item.remove();
        }
      }
    }
  }

  fallingObjects() {
  return [].concat(this.pizzaBoxes, this.pizzas);
  }

  allObjects() {
    return [].concat(
      this.players,
      this.projectiles,
      this.pizzaBoxes,
      this.pizzas,
      this.platforms
    );
  }

  isOutOfBounds () {
  }

  moveObjects() {
    this.allObjects().forEach((object) => {
      object.move();
    });
  }

  step() {
    this.checkPlayerCollision();
    this.checkPizzaBoxHits();
    this.moveObjects();
  }

  draw(ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.allObjects().forEach((object) => {
      object.draw(ctx);
    });
  }
}

Game.DIM_X = 500;
Game.DIM_Y = 500;

export default Game;
