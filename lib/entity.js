class Entity {
  constructor(options) {
    this.context = options.context;
    this.image = options.image;
    this.sX = options.sX;
    this.sY = options.sY;
    this.sWidth = options.sWidth;
    this.sHeight = options.sHeight;
    this.dX = options.dX;
    this.dY = options.dY;
    this.dWidth = options.dWidth;
    this.dHeight = options.dHeight;
  }

  draw() {
    this.context.drawImage(
      this.image,
      this.sX, // source x
      this.sY, // source y
      this.sWidth, // source width
      this.sHeight, // source height
      this.dX, // destination x
      this.dY, // destination y
      this.dWidth, // destination width
      this.dHeight // destination height
    );
  }

  render() {
    this.image.onload = () => {
      this.draw();
    };
  }
}

export default Entity;
