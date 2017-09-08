import Entity from './entity';

class PizzaBox extends Entity {
  constructor(options) {
    super(options);
    this.frameIndex = 0;
    this.tickCount = 0;
    this.ticksPerFrame = 60;
    this.fallSpeed = options.fallSpeed;
  }

  fall() {
    this.tickCount += 2;
    this.context.clearRect(this.dX, this.dY, this.dWidth, this.dHeight);

    this.dY += this.fallSpeed;

    // if (this.tickCount > this.ticksPerFrame) {
    //   this.frameIndex = (this.frameIndex + 1) % this.movement.numberOfFrames;
    //   this.tickCount = 0;
    // }

    this.draw();
  }
}

export default PizzaBox;
