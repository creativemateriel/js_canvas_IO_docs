const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// helpers  - - - - -
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const cl = (str) => {
  console.log(str);
}

function placeHorizMeasure(ctx, text, xl, xr, y, col, lnD, lnW = 2) {
  
  //   |                                 |      < lnD(epth)
  //   xl             texts              xr
  //                    |
  //                    ^ markMidddle
  ctx.save();
  
  // font def
  let fontSize = (lnD*2).toString();
  ctx.font = `${fontSize}px serif`;
  ctx.textBaseline = 'middle'; // hanging
  ctx.textAlign = 'center';

  
  let markMiddle = xl + (xr - xl) / 2;
  textMetrics = ctx.measureText(text);
  let textStart = markMiddle;
  
  // place left vert line
  ctx.beginPath();
  ctx.lineWidth = lnW;
  ctx.strokeStyle = col; // colour
  ctx.moveTo(xl, y);
  ctx.lineTo(xl, y+lnD);  // line depth - marker depth
  ctx.stroke(); 

  // place right vert line
  ctx.beginPath();
  ctx.lineWidth = lnW;
  ctx.strokeStyle = col; // colour
  ctx.moveTo(xr, y);
  ctx.lineTo(xr, y+lnD);  // line depth - marker depth
  ctx.stroke(); 

  // place text between if it fits below if not
  ctx.fillStyle = col;
  ctx.fillText(text, textStart, y+lnD);
  ctx.restore();
}

function placeVertMeasure(ctx, text, x, yt, yb, col, lnD, lnW = 2) {
  
  //   - yt
  //  
  //                
  //       texts  < markMidddle
  //
  //
  //    - yb
  //
  ctx.save();
  
  // font def
  let fontSize = (lnD*2).toString();
  ctx.font = `${fontSize}px serif`;
  ctx.textBaseline = 'middle'; // hanging
  ctx.textAlign = 'left';
  //
  //
  let markMiddle = yt + (yb - yt) / 2;
  
  // place top horiz line
  ctx.beginPath();
  ctx.lineWidth = lnW;
  ctx.strokeStyle = col; // colour
  ctx.moveTo(x, yt);
  ctx.lineTo(x+lnD, yt);  // line depth - marker depth
  ctx.stroke(); 

  // place bot horiz line
  ctx.beginPath();
  ctx.lineWidth = lnW;
  ctx.strokeStyle = col; // colour
  ctx.moveTo(x, yb);
  ctx.lineTo(x+lnD, yb);  // line depth - marker depth
  ctx.stroke(); 

  // place text between if it fits below if not
  ctx.fillStyle = col;
  ctx.fillText(text,  x+lnD, markMiddle);
  ctx.restore();
}

function placementMarker(ctx, x,y, sz, col='red') {
    ctx.save();
    // show rect place
    ctx.beginPath();
    ctx.fillStyle = col;
    ctx.arc(x, y, sz, 0, 2*Math.PI);
    ctx.fill(); 
    ctx.restore();   
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
let manager;

const settings = {
  dimensions: [ 1080, 1080 ]
};

let opTxt = random.pick(['𝛑', '𝛅', '𝛀', '𝚿', '𝛅', '𝛜', '𝛛', '𝛍', '𝛟']);
let fontSize = 1200;
let fontFamily = 'serif';

// data source canvas
const typeCanvas = document.createElement('canvas');
const dataSourceContext = typeCanvas.getContext('2d');

const sketch = ({ context, width, height }) => {
  // data source canvas
  const cell = 20;  // cell dimension
	const cols = Math.floor(width  / cell);
	const rows = Math.floor(height / cell);
	const numCells = cols * rows;

	typeCanvas.width  = cols;   // scaled down dataSourceContext 1 pixel per cell
	typeCanvas.height = rows;
  
  return ({ context, width, height }) => {
    dataSourceContext.fillStyle = 'black';
    dataSourceContext.fillRect(0, 0, cols, rows);
    
    fontSize = cols * 1.2;              // dataSourceContext
    dataSourceContext.fillStyle = 'white';
    dataSourceContext.font = `${fontSize}px ${fontFamily}`;
    dataSourceContext.textBaseline = 'top';
    
    
    let textMetrics = dataSourceContext.measureText(opTxt);
    cl(textMetrics);

		const mx = textMetrics.actualBoundingBoxLeft * -1;
		const my = textMetrics.actualBoundingBoxAscent * -1;
		const mw = textMetrics.actualBoundingBoxLeft + textMetrics.actualBoundingBoxRight;
		const mh = textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent;    

    // translate to centre
    const x = (cols - mw) * 0.5 - mx;
    const y = (rows - mh) * 0.5 - my;

    dataSourceContext.save();               // place dataSource Text 
    dataSourceContext.translate(x, y);
    
    dataSourceContext.beginPath();
    dataSourceContext.rect(mx, my, mw, mh);
    dataSourceContext.stroke();
    dataSourceContext.fillText(opTxt, 0, 0);
    
    dataSourceContext.restore();
    
    // legacy diagnostics
    //placementMarker(context, 0, 0, 'red');
    // placeHorizMeasure(ctx, text, xl, xr, y, col, lnD, lnW = 2)
    //placeHorizMeasure(context, `mw (${Math.floor(mw)})`, mx, mx+mw, my+mh+10, 'blue', 15);
    // function placeVertMeasure(ctx, text, x, yt, yb, col, lnD, lnW = 2)
    //placeVertMeasure(context, `mh (${Math.floor(mh)})`, mx+mw+10, my, my+mh, 'blue', 15);
    //placementMarker(context, mx, my, 'blue');    


    // set backround blak
    context.fillStyle = 'black';
    context.fillRect(0,0, width,height);
    
    
    
    const typeData = dataSourceContext.getImageData(0,0,cols,rows).data;
    //cl(typeData);                         // data large array RGBA
    context.drawImage(typeCanvas, 0, 0);  // place image on main canvas context fro debug/display
                                            // this isn't necessary to read the data & construct art
    

    
    
    for (let i = 0; i < numCells; i++) {
			const col = i % cols;
			const row = Math.floor(i / cols);

			const x = col * cell;
			const y = row * cell;

			const r = typeData[i * 4 + 0];
			const g = typeData[i * 4 + 1];
			const b = typeData[i * 4 + 2];
			const a = typeData[i * 4 + 3];
			//
			//const glyph = getGlyph(r);
			//
			//context.font = `${cell * 2}px ${fontFamily}`;
			//if (Math.random() < 0.1) context.font = `${cell * 6}px ${fontFamily}`;
			//
			
      // 'rgb(255,0,255)'; paint magenta
			context.fillStyle = `rgb(${r}, ${g}, ${b})`;  // fill: 1,2,3
                       
      
      //cl(`rgb(${r}, ${g}, ${b})`);
			context.save();
			context.translate(x, y);                      // fill: 1,2,3,4
			context.translate(cell * 0.5, cell * 0.5);    // fill: 3,4

      // fill 1: rect as large pixel
      //context.fillRect(0, 0, cell, cell);

      // fill 2: shaded circle instead of pixel
      // place circle in centre of cell (cell/2) with radius cell/2
      //placementMarker(context, cell/2, cell/2, cell/2, `rgb(${r}, ${g}, ${b})`); 
      
      // fill 3: use source character as pixel
      //context.font = `${cell}px ${fontFamily}`;      
      //context.fillText(opTxt, 0,0);
      
      // fill 4: assci art shade
      const glyph = getGlyph(r);
      context.font = `${cell}px ${fontFamily}`;
      if (Math.random() < 0.03) context.font = `${cell * 4}px ${fontFamily}`;
      if (glyph.length > 1) context.font = `${cell * random.rangeFloor(2,5)}px ${fontFamily}`;
      
      context.fillStyle = 'white';      // character provide the greyscale 
			context.fillText(glyph, 0, 0);
			
			context.restore();

		}
  };
};


const getGlyph = (v) => {
	if (v < 50) return '';
	if (v < 100) return '.';
	if (v < 150) return '-';
	if (v < 200) return '+';
  if (v < 210) return random.pick(['weinberg','penrose','smolin','thorne','susskind','gross','witten','hooft','rovelli','randall','feynmann','alcubierre']);

	const glyphs = '_=/o%$'.split('');
  //const glyphs = '_= /'.split('');

	return random.pick(glyphs);
};


const onKeyUp = (e) => {
	opTxt = e.key.toUpperCase();
	manager.render();
};

document.addEventListener('keyup', onKeyUp);

const start = async () => {
	manager = await canvasSketch(sketch, settings);   // returns new SketchManager();
};

start();  // instantiate
// instead of just running once w/
// canvasSketch(sketch, settings);
// assign sketchManger and call it when key up events happen


