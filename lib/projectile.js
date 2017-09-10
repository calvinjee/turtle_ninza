import Entity from './entity';
import Game from './game';

const projectileImage = new Image();
projectileImage.src = './assets/images/shuriken_anim.png';

class Projectile extends Entity {
  constructor(options) {
    super(options);
    this.image = projectileImage;
    this.frameIndex = 0;
    this.tickCount = 0;
    this.ticksPerFrame = 0;
    this.numberOfFrames = 4;
  }

  move() {
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

  isCollidedWith(pizzaBox) {
    if (pizzaBox.dY + pizzaBox.dHeight < this.game.players[0].dY &&
      this.dY < (pizzaBox.dY + pizzaBox.dHeight) &&
    ((this.dX > pizzaBox.dX &&
      this.dX < (pizzaBox.dX + pizzaBox.dWidth)) ||
    ((this.dX + this.dWidth) > pizzaBox.dX &&
      (this.dX + this.dWidth) < (pizzaBox.dX + pizzaBox.dWidth)))) {
      return true;
    }
    return false;
  }

}

export default Projectile;
