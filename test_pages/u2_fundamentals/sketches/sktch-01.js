const canvasSketch = require('canvas-sketch');  // load lib as reference canvasSketch

const settings = {      // create settings object
  dimensions: [ 1080, 1080 ]
};

// callback anonymous function for 
const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    context.lineWidth = width * 0.01;

    const w 	= width  * 0.10;
		const h 	= height * 0.10;
		const gap = width  * 0.03;
		const ix 	= width  * 0.17;
		const iy 	= height * 0.17;
		const off = width  * 0.02;
		let x, y;

    context.fillStyle = 'black';         // property - black back ground
    context.fillRect(0,0,width,height);
    
		for (let i = 0; i < 5; i++) {
			for (let j = 0; j < 5; j++) {
				x = ix + (w + gap) * i;
				y = iy + (h + gap) * j;

        context.strokeStyle = "white";  // paint in white
				context.beginPath();      // outer rect
				context.rect(x, y, w, h);
				context.stroke();

				if (Math.random() > 0.5) {  // inner rect
					context.beginPath();
					context.rect(x + off / 2, y + off / 2, w - off, h - off);
					context.stroke();
				}
			}
		}
  };
};

canvasSketch(sketch, settings);
