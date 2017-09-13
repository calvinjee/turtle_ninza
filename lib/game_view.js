import Game from './game';

class GameView {
  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;
    this.ctx.font = '28px Slackey';
    this.ctx.fillStyle = '#EFB740';
    this.addHandlers();
    this.muted = false;
  }

  start() {
    this.platform = this.game.addPlatform();
    this.player = this.game.addPlayer(this.platform.dY);
    this.game.rainPizza();
    Game.SOUNDS.gameMusic.currentTime = 0;
    Game.SOUNDS.gameMusic.volume = 1;
    Game.SOUNDS.gameMusic.play();
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
        case 109: // m
          this.muted ? this.mute(false) : this.mute(true);
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

    document.getElementById('sound').addEventListener('click',() => {
      this.muted ? this.mute(false) : this.mute(true);
    });
  }

  animate() {
    this.game.step();
    this.game.draw(this.ctx);
    this.game.updateScore(this.ctx);
    this.game.updateLives(this.ctx);
    let loop = requestAnimationFrame(this.animate.bind(this));
    if (this.game.lives === 0) {
      this.player.canShoot = false;
      Game.SOUNDS.gameMusic.pause();
      Game.SOUNDS.loseGame.volume = 0.2;
      Game.SOUNDS.loseGame.play();
      cancelAnimationFrame(loop);
      setTimeout(() => {
        const end = document.getElementById('game-over');
        end.className = "modal small";
        addEventListener('keypress', window.startGame);
      }, 3000);

    }
  }

  mute(bool) {
    if (bool) {
      window.mute.className = "fa fa-ban fa-stack-1x text-danger";
    } else {
      window.mute.className = "hidden";
    }
    const sounds = Object.keys(Game.SOUNDS);
    sounds.forEach((sound) => {
      Game.SOUNDS[sound].muted = bool;
    });
    this.muted = bool;
  }

}

export default GameView;
