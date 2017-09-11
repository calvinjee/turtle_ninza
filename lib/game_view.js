class GameView {
  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;
    this.ctx.font = '28px Slackey';
    this.ctx.fillStyle = '#84152D';
    this.addHandlers();
  }

  start() {
    this.platform = this.game.addPlatform();
    this.player = this.game.addPlayer(this.platform.dY);
    this.game.rainPizza();
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

  animate() {
    this.game.step();
    this.game.draw(this.ctx);
    this.game.updateScore(this.ctx);
    this.game.updateLives(this.ctx);
    let loop = requestAnimationFrame(this.animate.bind(this));
    if (this.game.lives === 0) {
      cancelAnimationFrame(loop);
      setTimeout(() => {
        window.directionsModal.className = "modal";
        addEventListener('keypress', window.startGame);
      }, 5000);

    }
  }

}

export default GameView;
