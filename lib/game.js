import Player from './player';
import PizzaBox from './pizza_box';

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
      console.log(this.pizzaBoxes);
    }

    // else if (object instanceof Pizza) {
    //   this.players.push(object);
    // } else if (object instanceof Projectile) {
    //   this.players.push(object);
    // }
    // else if (object instanceof Platform) {
    //   this.players.push(object);
    // }
  }

  remove(object) {
    if (object instanceof Player) {
      this.players.splice(this.players.indexOf(object), 1);
    } else if (object instanceof PizzaBox) {
      this.pizzaBoxes.splice(this.pizzaBoxes.indexOf(object), 1);
      console.log(this.pizzaBoxes);
    }
    // else if (object instanceof PizzaBox) {
    //   this.pizzaBoxes.splice(this.pizzaBoxes.indexOf(object), 1);
    // } else if (object instanceof PizzaBox) {
    //   this.pizzaBoxes.splice(this.pizzaBoxes.indexOf(object), 1);
    // } else if (object instanceof PizzaBox) {
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
      sY: 110,
      sWidth: 350 / 5,
      sHeight: 95,
      dX: Game.DIM_X / 2,
      dY: Game.DIM_Y - 100,
      dWidth: 350 / 5,
      dHeight: 95,
      movement: {
        x: 0,
        y: 110,
        width: 350,
        height: 95,
        numberOfFrames: 5,
      },
      game: this,
    };

    const player = new Player(playerOptions);
    this.add(player);

    return player;
  }

  addPizzaBox() {
    const startX = 50 + Math.floor((Math.random() * Game.DIM_X) - 50);
    const fallSpeed = Math.random() + 1;

    const pizzaBoxOptions = {
      sX: 0,
      sY: 0,
      sWidth: 5000,
      sHeight: 2845,
      dX: startX,
      dY: 0,
      dWidth: 5000 * .0125,
      dHeight: 2845 * .0125,
      fallSpeed: fallSpeed,
      game: this,
    };

    const pizzaBox = new PizzaBox(pizzaBoxOptions);
    this.add(pizzaBox);

    return pizzaBox;
  }

  addPizza() {

  }

  addProjectile() {

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
