import Entity from './entity';
import Game from './game';

const platformImage = new Image();
platformImage.src = './assets/images/platform_2.png';

class Platform extends Entity {
  constructor(options) {
    super(options);
    this.image = platformImage;
    this.riseSteps = 0;
  }

  rise() {
    this.riseSteps += 40;
  }

  move() {
    if (this.riseSteps > 0) {
      this.riseSteps -= 1;
      this.dY -= 0.5;
    }

  }
}

Platform.SCALE = 1;

export default Platform;
