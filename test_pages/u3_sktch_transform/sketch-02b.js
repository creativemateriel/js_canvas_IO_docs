const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [ 1080, 1080 ]
};

function deg2rad(deg) {
  return (deg /180 * Math.PI);
};

const randomRange = (min, max) => {
  // 0 to <1 EG 0.999999 
  return Math.random() * (max - min) + min;
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    
    context.fillStyle = 'black';

    const cx = width * 0.5;
    const cy = height * 0.5;    
    const w = width * 0.01;
    const h = height * 0.1;
    let x,y;
		const num = 24;
		const radius = width * 0.3;
        
    //context.translate(x,y); // Remaps the (0,0) position on the canvas
                            // https://www.w3schools.com/tags/canvas_translate.asp
    
    //context.rotate(0.3);// rotation in rad rotates around origin
                          // 2 * Math.PI rads in 360 degs
                          // 20 degs = 20 * Math.PI / 180
    
		for (let i = 0; i < num; i++) {
			const slice = deg2rad(360 / num);
			const angle = slice * i;

			x = cx + radius * Math.sin(angle);    // calc point on circle
			y = cy + radius * Math.cos(angle);

      // circle of random rects 
			context.save();
			context.translate(x, y);
			context.rotate(-angle);
      let scx = randomRange(1,4); 
      let scy = randomRange(0.5,1.5);      
      context.scale(scx, scy);  // scale(x,y)
      
			context.beginPath();			
//      context.rect(-w * 0.5, -h * 0.5, w, h); // (pos_x, pos_y, width, height)
//			context.fill();
      // or
      //context.strokeRect(-w * 0.5, -h * 0.5, w, h);  // rect border
      context.strokeStyle = 'red';
      context.strokeRect(0, 0, w, h);  // rect border
      //console.log(`scl x:${scx} y:${scy} - rect:${w},${h}`);
			context.restore();
      
      // arc
			context.save();
			context.translate(cx, cy);  // centre of the rect
			context.rotate(-angle);     // each slice . . 360/num * i

			//context.lineWidth = random.range(5, 20);      
//
//			context.beginPath();
//			context.arc(0, 0, radius * random.range(0.7, 1.3), slice * random.range(1, -8), slice * random.range(1, 5));      
//			context.stroke();
      context.lineWidth = 3;
      context.beginPath();
      let inner_radius = radius; // + (h * scy);
      context.arc(0, 0, inner_radius, 0, slice/4);  // 360/num
      context.stroke();
      
      //let outer_radius = radius + (scy * (h - h*0.5));
      let outer_radius = radius + (h * scy);
      let sclH = scy * h;
      console.log(`> scl x:${scx} y:${scy} \nrect:${w},${h}\n sclx:${scx * w} scly:${sclH} oRad:${outer_radius}\n--ratio:${outer_radius/sclH}`);
      context.beginPath();
      context.arc(0, 0, outer_radius, 0, slice/4);  // 360/num
      context.stroke();
      
			context.restore();      

		}
  };
};

canvasSketch(sketch, settings);
