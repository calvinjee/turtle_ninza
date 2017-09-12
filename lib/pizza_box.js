import Entity from './entity';
import Game from './game';

const pizzaBoxImage = new Image();
pizzaBoxImage.src = './assets/images/pizza_box.png';

class PizzaBox extends Entity {
  constructor(options) {
    super(options);
    this.fallSpeed = options.fallSpeed;
    this.image = pizzaBoxImage;
  }

  move() {
    this.dY += this.fallSpeed;
    if (this.dY > Game.DIM_Y) {
      // Game.SOUNDS.raisePlatform.currentTime = 3;
      // Game.SOUNDS.raisePlatform.playbackRate = 2;
      Game.SOUNDS.raisePlatform.play();
      this.remove();
      this.game.platforms[0].rise();
    }
  }

}

PizzaBox.SCALE = 0.015;

export default PizzaBox;
