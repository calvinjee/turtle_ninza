import Entity from './entity';
import Game from './game';

const pizzaImage = new Image();
pizzaImage.src = './assets/images/pizza_2.png';

class Pizza extends Entity {
  constructor(options) {
    super(options);
    this.fallSpeed = options.fallSpeed;
    this.image = pizzaImage;
  }

  move() {
    this.dY += this.fallSpeed;
    if (this.dY > Game.DIM_Y) {
      this.remove();
    }
  }

}

export default Pizza;
