const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');
const Tweakpane = require('tweakpane');


// helpers
const cl = (str) => {
  console.log(str);
}

const settings = {
  dimensions: [ 1080, 1080 ],
  animate: true
};

// TODO retro fit params to U3 & U4 - plus the console
// loads of teakable parameter in both of those: colour schemes, ball size receiver radius
const params = {
	cols: 10,
	rows: 10,
	scaleMin: 1,
	scaleMax: 30,
	freq: 0.001,
	amp: 0.2,
	frame: 0,
	animate: true,
	lineCap: 'butt',
};

const sketch = () => {
  return ({ context, width, height, frame }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    
    const cols = params.cols;
		const rows = params.rows;
		const numCells = cols * rows;

		const gridw = width  * 0.8;
		const gridh = height * 0.8;
		const cellw = gridw / cols;
		const cellh = gridh / rows;
		const margx = (width  - gridw) * 0.5;
		const margy = (height - gridh) * 0.5;
    
		for (let i = 0; i < numCells; i++) {
			const col = i % cols;
			const row = Math.floor(i / cols);

			const x = col * cellw;
			const y = row * cellh;
			const w = cellw * 0.8;
			const h = cellh * 0.8;

			const f = params.animate ? frame : params.frame;

			//const n = random.noise2D(x + frame * 10, y, params.freq);
			const n = random.noise3D(x, y, f * 10, params.freq);


			const angle = n * Math.PI * params.amp;
			
			// const scale = (n + 1) / 2 * 30;
			// const scale = (n * 0.5 + 0.5) * 30;
			const scale = math.mapRange(n, -1, 1, params.scaleMin, params.scaleMax);
			
			//context.save();
			//context.beginPath();
			//cBox = boxPalette[colorBoxSelectorRadials];
			//#context.fillStyle = // take a grey scal from 2D noise
			//context.rect(-w * 0.5, random.range(0, -h * 0.5), w, h);
			//context.fill();
			//context.restore();
			
      context.save();                     // < - - - - - - - - - - - - context save
			context.translate(x,y);             // for each tile
      context.translate(margx,margy);     // include the margin around the tiles
      context.translate(cellw * 0.5, cellh * 0.5);  // translate to centre odf cell
			
			context.rotate(angle);

			context.lineWidth = scale;
			context.lineCap = params.lineCap;

			context.beginPath();
			context.moveTo(w * -0.5, 0);
			context.lineTo(w *  0.5, 0);
			context.stroke();

			context.restore();                  // < - - - - - - - - - - - - context restore
		}    
    
  };
};

const createPane = () => {
	const pane = new Tweakpane.Pane();
	let folder;

	folder = pane.addFolder({ title: 'Grid '});
	folder.addInput(params, 'lineCap', { options: { butt: 'butt', round: 'round', square: 'square' }});
	folder.addInput(params, 'cols', { min: 2, max: 50, step: 1 });
	folder.addInput(params, 'rows', { min: 2, max: 50, step: 1 });
	folder.addInput(params, 'scaleMin', { min: 1, max: 100 });
	folder.addInput(params, 'scaleMax', { min: 1, max: 100 });
	//
	folder = pane.addFolder({ title: 'Noise' });
	folder.addInput(params, 'freq', { min: -0.01, max: 0.01 });
	folder.addInput(params, 'amp', { min: 0, max: 1 });
	folder.addInput(params, 'animate');
	folder.addInput(params, 'frame', { min: 0, max: 999 });
};

createPane();

canvasSketch(sketch, settings);

//      const g = random.noise2D(x + frame, y);
//      const greyScale = Math.floor( math.mapRange(g, -1,1,0,0xFFFFFF) );
//      cl(`g:${g} - greyS:${greyScale} - g.toStr:${greyScale.String(16)}`);
//      //  greyScale.String(16) comes back undefined!??? :?
//            
//      context.save();                     // < - - - - - - - - - - - - context save
//			context.translate(x,y);             // for each tile
//      context.translate(margx,margy);     // include the margin around the tiles
//      context.translate(cellw * 0.5, cellh * 0.5);  // translate to centre odf cell
//      //context.rotate(angle);
//
//      context.beginPath();
////			context.strokeStyle = 'red'; 
////      context.strokeRect(w * -0.5,w * -0.5,w,w);
//      //
//      context.fillStyle = greyScale.String;
//      //context.fillStyle = 'black';
//      context.fillStyle = '#000000';
//      context.fillRect(w * -0.5,w * -0.5,w,w);
//      context.fill();
//      
//      context.restore();                  // < - - - - - - - - - - - - context restore

//

//
