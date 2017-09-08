import Entity from './entity';
import Game from './game';

class PizzaBox extends Entity {
  constructor(options) {
    super(options);
    this.fallSpeed = options.fallSpeed;
    this.image = new Image();
    this.image.src = './assets/images/pizza_box.png';
  }

  move() {
    this.dY += this.fallSpeed;
    if (this.dY > Game.DIM_Y) {
      this.remove();
    }
  }

}

export default PizzaBox;
