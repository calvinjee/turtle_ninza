import Entity from './entity';
import Game from './game';

const projectileImage = new Image();
projectileImage.src = './assets/images/shuriken_1.png';

class Projectile extends Entity {
  constructor(options) {
    super(options);
    this.image = projectileImage;
  }

  move() {
    this.dY -= 3;
    if (this.dY < 0) {
      this.remove();
    }
  }

  isCollidedWith(pizzaBox) {
    if (this.dY < (pizzaBox.dY + pizzaBox.dHeight) &&
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
