import Game from './game';
import Entity from './entity';
import Projectile from './projectile';

class Player extends Entity {
  constructor(options) {
    super(options);
    this.moveBools = {
      left: false,
      right: false,
    };
    this.canShoot = true;
    this.image = options.image;
    this.frameIndex = 0;
    this.tickCount = 0;
    this.ticksPerFrame = 10;
    this.movement = options.movement;

  }

  shoot() {
    if (this.canShoot) {
      const projectileOptions = {
          sX: 0,
          sY: 0,
          sWidth: 512,
          sHeight: 512,
          dX: this.dX + 20,
          dY: this.dY,
          dWidth: 25,
          dHeight: 25,
          game: this.game,
      };

      const projectile = new Projectile(projectileOptions);
      projectile.game.add(projectile);
      this.canShoot = false;
      setTimeout(() => {
        this.canShoot = true;
      }, 1000);
    }
  }

  isCollidedWith(object) {
    if (this.dY < (object.dY + object.dHeight) &&
    ((object.dX > this.dX &&
      object.dX < (this.dX + this.dWidth)) ||
    ((object.dX + object.dWidth) > this.dX &&
      (object.dX + object.dWidth) < (this.dX + this.dWidth)))) {
      return true;
    }
    return false;
  }

  move() {
    if (Object.values(this.moveBools).some((bool) => bool === true )) {
      this.tickCount += 1;
      // this.context.clearRect(this.dX, this.dY, this.sWidth, this.sHeight);

      this.sX = this.frameIndex * (this.movement.width / this.movement.numberOfFrames);
      this.sY = this.movement.y;
      this.sWidth = this.movement.width / this.movement.numberOfFrames;
      this.sHeight = this.movement.height;

      let dir = 0;
      switch(this.direction) {
        case 'left': // left
          if (this.dX >= -20) {
            dir = -5;
          }
          break;
        case 'right': // right
          if (this.dX <= (Game.DIM_X - this.dWidth + 20)) {
            dir = 5;
          }
          break;
      }

      this.dX += dir;
      this.dWidth = this.sWidth;
      this.dHeight = this.sHeight;

      if (this.tickCount > this.ticksPerFrame) {
        this.frameIndex = (this.frameIndex + 1) % this.movement.numberOfFrames;
        this.tickCount = 0;
      }
    }
  }
}

export default Player;
