import Player from './player';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  // let background = new Image();
  // background.src = './assets/images/bg-2.png';
  // background.onload = () => {
  //   ctx.drawImage(background, 0, 0)
  // }

  const playerRaf = new Image();
  playerRaf.src = './assets/images/raf_sprite.gif';

  const rafOptions = {
    context: ctx,
    image: playerRaf,
    sX: 0,
    sY: 110,
    sWidth: 350 / 5,
    sHeight: 95,
    dX: ctx.canvas.width / 2,
    dY: ctx.canvas.height - 100,
    dWidth: 350 / 5,
    dHeight: 95,
    movement: {
      x: 0,
      y: 110,
      width: 350,
      height: 95,
      numberOfFrames: 5,
    }
  };

  const raf = new Player(rafOptions);
  raf.render();

  // const pizzaBox = new Image();
  // pizzaBox.src = './assets/images/pizza_box.png';
  // const pizzaBoxOptions = {
  //   context: ctx,
  //   image: pizzaBox,
  //   sX: 0,
  //   sY: 0,
  //   dX: ,
  //   dY: 0,
  // };



  document.addEventListener('keydown', (e) => {
    // console.log(e.keyCode);
    switch(e.keyCode) {
      case 37: // left
        raf.direction = 'left';
        raf.moveBools.left = true;
        break;
      case 39: // right
        raf.direction = 'right';
        raf.moveBools.right = true;
        break;
      case 32: // space
        // raf.shoot();
        // break;
    }
  });

  document.addEventListener('keyup', (e) => {
    switch(e.keyCode) {
      case 37: // left

        raf.moveBools.left = false;
        break;
      case 39: // right

        raf.moveBools.right = false;
        break;
      case 32: // space
        // raf.shoot();
    }
  });


  window.setInterval(() => {

    raf.move(raf.direction);
  });

});
