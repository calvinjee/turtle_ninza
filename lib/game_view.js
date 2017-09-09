class GameView {
  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;
    this.player = this.game.addPlayer();

  }

  start() {
    this.addHandlers();
    this.rainPizza();
    requestAnimationFrame(this.animate.bind(this));
  }

  addHandlers () {
    document.addEventListener('keydown', (e) => {
      switch(e.keyCode) {
        case 37: // left
          this.player.direction = 'left';
          this.player.moveBools.left = true;
          break;
        case 39: // right
          this.player.direction = 'right';
          this.player.moveBools.right = true;
          break;
      }
    });

    document.addEventListener('keypress', (e) => {
      switch(e.keyCode) {
        case 32: // space
          this.player.shoot();
          break;
      }
    });

    document.addEventListener('keyup', (e) => {
      switch(e.keyCode) {
        case 37: // left
          this.player.moveBools.left = false;
          break;
        case 39: // right
          this.player.moveBools.right = false;
          break;
      }
    });
  }

  rainPizza() {
    setInterval(() => {
      this.game.addPizzaBox();
    }, 5000);
  }

  animate() {
    this.game.step();
    this.game.draw(this.ctx);
    requestAnimationFrame(this.animate.bind(this));
  }

}

export default GameView;
