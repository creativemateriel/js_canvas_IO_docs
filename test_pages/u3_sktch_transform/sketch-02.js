const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

// rainbow
let cbRainbow = ['#B505B5', '#FF00AA', '#9400FF', '#3B00FF', '#0094FF', '#00E1FF',
                '#00ED9E', '#00FF6A', '#00E203', '#A2ED00', '#F6FF00', '#FFD800',
                '#FF7F00', '#FF3700'];
// blue grey green
let cbBlueGreen = ['#001D70', '#123082', '#294793', '#4660A3', '#0039C9', '#00B1C9',
                '#00C181', '#3B00FF', '#368E6F', '#8DC900', '#570089', '#522BAD',
                '#0082E0', '#3D9BC6'];

// autumn brown
let cbBrownAutum = ['#3A2500', '#E89E00', '#F4EC00', '#000000', '#5E2100', '#600000',
                '#630E32', '#840919', '#AA842A', '#C17700', '#F4C300', '#93832F',
                '#3D2409', '#332316'];

let cbRedBlack = ['#000000', '#FF0000', '#470707', '#3D0727', '#3A2424', '#681C1C',
                '#BA3E00', '#6D3E3E', '#382C2C', '#561F36', '#363800', '#442400',
                '#FF7F00', '#FF3700'];

                  //   0          1             2            3
let boxPalette = [cbRainbow, cbBlueGreen, cbBrownAutum, cbRedBlack];
let colorBoxSelectorRadials = 0;
let colorBoxSelectorOuterRim = 3;
//colorBoxSelectorRadials = Math.floor(random.range(0, boxPalette.length ));
//colorBoxSelectorOuterRim = Math.floor(random.range(0, boxPalette.length ));


const settings = {
  dimensions: [ 1080, 1080 ]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    context.fillStyle = 'black';

    const cx = width  * 0.5;
    const cy = height * 0.5;

    const w = width  * 0.01;
    const h = height * 0.55;
    let x, y;

    const num = 150;
    const radius = width * 0.15;

    for (let i = 0; i < num; i++) {
      const slice = math.degToRad(360 / num);
      const angle = slice * i;

      x = cx + radius * Math.sin(angle);
      y = cy + radius * Math.cos(angle);

      context.save();
      context.translate(x, y);
      context.rotate(-angle);
      context.scale(random.range(0.1, 2), random.range(0.2, 0.5));

      context.beginPath();
      cBox = boxPalette[colorBoxSelectorRadials];
      context.fillStyle = cBox[Math.floor(random.range(0, cBox.length - 1))];
      context.rect(-w * 0.5, random.range(0, -h * 0.5), w, h);
      context.fill();
      context.restore();

      context.save();
      context.translate(cx, cy);
      context.rotate(-angle);

      context.lineWidth = random.range(30, 50);

      context.beginPath();
      cBox = boxPalette[colorBoxSelectorOuterRim];
      context.strokeStyle = cBox[Math.floor(random.range(0, cBox.length - 1))];
      context.arc(0, 0, radius * random.range(1.6, 3.0), slice * random.range(1, -8), slice * random.range(1, 5));
      context.stroke();

      context.restore();
    }
  };
};

canvasSketch(sketch, settings);
