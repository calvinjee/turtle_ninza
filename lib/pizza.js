import Entity from './entity';

class PizzaBox extends Entity {
  constructor(options) {
    super(options);
    this.fallSpeed = options.fallSpeed;
  }

  fall() {
    // this.context.clearRect(this.dX, this.dY, this.dWidth, this.dHeight);

    this.dY += this.fallSpeed;
    // this.draw();
  }
}

export default PizzaBox;
