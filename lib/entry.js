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
  setTimeout(() => {
    introModal.className = "hidden";
    // gameView.start();
  }, 3000);
  // gameView.start();

});
