import Entity from './entity';
import Game from './game';

const platformImage = new Image();
platformImage.src = './assets/images/platform_2.png';

class Platform extends Entity {
  constructor(options) {
    super(options);
    this.image = platformImage;
  }

  rise() {
    this.dY -= 5;
  }

  move() {
  }
}

Platform.SCALE = 1;

export default Platform;
