import Entity from './entity';
import Game from './game';

const pizzaImage = new Image();
pizzaImage.src = './assets/images/pizza_anim.png';

class Pizza extends Entity {
  constructor(options) {
    super(options);
    this.fallSpeed = options.fallSpeed;
    this.image = pizzaImage;
    this.frameIndex = 0;
    this.tickCount = 0;
    this.ticksPerFrame = 7;
    this.numberOfFrames = 8;
  }

  move() {
    this.tickCount += 1;
    this.dY += this.fallSpeed;
    if (this.dY > Game.DIM_Y) {
      this.remove();
    }

    if (this.tickCount > this.ticksPerFrame) {
      this.frameIndex = (this.frameIndex + 1) % this.numberOfFrames;
      this.tickCount = 0;
    }
    this.sX = this.frameIndex * this.sWidth;
  }
}

Pizza.SCALE = .11;

export default Pizza;
