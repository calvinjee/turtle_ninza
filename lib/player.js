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
    this.hit = false;
    this.hitCount = 0;
    this.hitFrames = [0, 1000];
  }

  shoot() {
    if (this.canShoot && this.hit === false) {
      const projectileOptions = {
          sX: 0,
          sY: 0,
          sWidth: 512,
          sHeight: 512,
          dX: this.dX + 20,
          dY: this.game.platforms[0].dY - Player.PLATFORM_ADJ,
          dWidth: 25,
          dHeight: 25,
          game: this.game,
      };

      const projectile = new Projectile(projectileOptions);
      projectile.game.add(projectile);
      this.canShoot = false;
      setTimeout(() => {
        this.canShoot = true;
      }, 250);
    }
  }

  isCollidedWith(object) {
    if (this.hit === false) {
      if (object.dY + object.dHeight < this.game.platforms[0].dY &&
        this.dY < (object.dY + object.dHeight) &&
      ((object.dX > this.dX &&
        object.dX < (this.dX + this.dWidth)) ||
      ((object.dX + object.dWidth) > this.dX &&
        (object.dX + object.dWidth) < (this.dX + this.dWidth)))) {
        return true;
      }
      return false;
    }
  }

  loseLife() {
    if (this.hit === false) {
      this.hit = true;
      this.moveBools = {
        left: false,
        right: false,
      };
      this.tickCount = 0;
      this.frameIndex = 0;
      console.log('lost life');
    }
  }

  move() {
    if (Object.values(this.moveBools).some((bool) => bool === true )) {
      this.tickCount += 1;

      let dir = 0;
      switch(this.direction) {
        case 'left': // left
          if (this.dX >= -20) {
            dir = -5;
          }
          break;
        case 'right': // right
          if (this.dX <= (Game.DIM_X - this.dWidth + 40)) {
            dir = 5;
          }
          break;
      }

      this.dX += dir;
      this.dY = this.game.platforms[0].dY - Player.PLATFORM_ADJ;

      this.sX = this.frameIndex * (this.movement.width / this.movement.numberOfFrames);
      this.sY = this.movement.y;
      this.sWidth = this.movement.width / this.movement.numberOfFrames;
      this.sHeight = this.movement.height;

      if (this.tickCount > this.ticksPerFrame) {
        this.frameIndex = (this.frameIndex + 1) % this.movement.numberOfFrames;
        this.tickCount = 0;
      }
    }
  }

  draw(ctx) {

    if (this.hit) {
      this.tickCount += 1;
      this.hitCount += 1;
      this.sY = 1240;
      this.sX = this.hitFrames[this.frameIndex];

      if (this.tickCount > 5) {
        // this.hit = false;
        // this.sY = this.movement.y;
        this.frameIndex = (this.frameIndex + 1) % this.hitFrames.length;
        this.tickCount = 0;
      }

      if (this.hitCount >= 120) {
        this.hit = false;
        this.hitCount = 0;
        this.sY = 115;
        this.sX = 0;
      }

      this.dY = this.game.platforms[0].dY - Player.PLATFORM_ADJ;
    }
    ctx.drawImage(
      this.image,
      this.sX, // source x
      this.sY, // source y
      this.sWidth, // source width
      this.sHeight, // source height
      this.dX, // destination x
      this.game.platforms[0].dY - Player.PLATFORM_ADJ, // destination y
      this.dWidth, // destination width
      this.dHeight // destination height
    );
  }

}

Player.SCALE = 1.25;
Player.PLATFORM_ADJ = 80;

export default Player;
