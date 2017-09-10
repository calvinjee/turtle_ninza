class GameView {
  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;
    // this.ctx.font = '28px Freckle Face';
    // this.ctx.font = '28px Shojumaru';
    this.ctx.font = '28px Slackey';
    this.ctx.fillStyle = '#FFFFFF';
    this.platform = this.game.addPlatform();
    this.player = this.game.addPlayer(this.platform.dY);
    this.lives = []
  }

  updateScore() {
    this.ctx.fillText(this.game.score, 10, 30);
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
    }, 1000);
  }

  animate() {
    this.game.step();
    this.game.draw(this.ctx);
    this.updateScore();
    requestAnimationFrame(this.animate.bind(this));
  }

}

export default GameView;
