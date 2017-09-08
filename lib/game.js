import Player from './player';
import PizzaBox from './pizza_box';

Game.DIM_X = 500;
Game.DIM_Y = 500;

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
      this.players.push(object);
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

  addPlayer() {
    const playerImage = new Image();
    playerImage.src = './assets/images/raf_sprite.gif';

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
      }
    };

    const player = new Player(playerOptions);
    this.add(player);
  }

  addPizzaBox() {
    const randomX = 50 + Math.floor((Math.random() * Game.DIM_X) - 50);
    const pizzaBoxOptions = {
      sX: 0,
      sY: 0,
      sWidth: 5000,
      sHeight: 2845,
      dX: randomX,
      dY: 0,
      dWidth: 5000 * .0125,
      dHeight: 2845 * .0125,
      fallSpeed: Math.random() + 1
    };

    const pizzaBox = new PizzaBox(pizzaBoxOptions);
    this.add(pizzaBox);
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

  draw(ctx) {
    ctx.clearRect(0, 0, Game.DIM_Y, Game.DIM_Y);
    this.allObjects().forEach((object) => {
      object.draw();
    });
  }


}
