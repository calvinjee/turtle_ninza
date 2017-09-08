import Entity from './entity';

class PizzaBox extends Entity {
  constructor(options) {
    super(options);
    this.fallSpeed = options.fallSpeed;
    this.image = new Image();
    this.image.src = './assets/images/pizza_box.png';
  }

  fall() {
    // this.context.clearRect(this.dX, this.dY, this.dWidth, this.dHeight);

    this.dY += this.fallSpeed;
    // this.draw();
  }
}

export default PizzaBox;
