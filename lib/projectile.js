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

}

export default Projectile;
