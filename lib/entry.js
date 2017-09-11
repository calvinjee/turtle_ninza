import Entity from './entity';
import Player from './player';
import PizzaBox from './pizza_box';
import Game from './game';
import GameView from './game_view';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  const game = new Game();
  const gameView = new GameView(game, ctx);
  const introModal = document.getElementById("intro");
  window.directionsModal = document.getElementById("directions");

  window.startGame = function (e) {
    if (e.keyCode === 13) {
      window.directionsModal.className = "hidden";
      const newGame = new Game();
      gameView.game = newGame;
      gameView.start();
      removeEventListener('keypress', window.startGame);
    }
  };

  setTimeout(() => {
    introModal.className = "hidden";
    window.directionsModal.className = "modal";
    addEventListener('keypress', window.startGame);
  }, 3000);

});
