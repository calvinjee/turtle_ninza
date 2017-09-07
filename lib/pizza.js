import Entity from './entity';

class PizzaBox extends Entity {
  constructor(options) {
    super(options);
    this.frameIndex = 0;
    this.tickCount = 0;
    this.ticksPerFrame = 60;
  }

  fall() {
    this.tickCount += 2;
    this.context.clearRect(this.dX, this.dY, this.sWidth, this.sHeight);

    this.sX = this.frameIndex * (this.movement.width / this.movement.numberOfFrames);
    this.sY = this.movement.y;
    this.sWidth = this.movement.width / this.movement.numberOfFrames;
    this.sHeight = this.movement.height;

    let dir;
    switch(direction) {
      case 'left': // left
        dir = -1;
        break;
      case 'right': // right
        dir = 1;
        break;
    }

    this.dX += dir;
    this.dWidth = this.sWidth;
    this.dHeight = this.sHeight;

    if (this.tickCount > this.ticksPerFrame) {
      this.frameIndex = (this.frameIndex + 1) % this.movement.numberOfFrames;
      this.tickCount = 0;
    }

    this.draw();
  }
}
