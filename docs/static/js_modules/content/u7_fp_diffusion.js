//const canvasSketch = require('canvas-sketch');
//const math = require('canvas-sketch-util/math');
//const random = require('canvas-sketch-util/random');
//const Tweakpane = require('tweakpane');

//class Random {
//  range(min, max) {
//    if (min < max) {
//      let no = Math.random() * (max -  min);
//      return (min + no);
//    }
//    return undefined;
//  }
//}
//
//var random = new Random;

import {random} from './require_random.js';

// helpers
const cl = (str) => {
  console.log(str);
}

cl(`random.range: ${random.range(1, 10)}`)



class MsgType {
  static PRESSURE = 0;
  static SONIC_HEDGEHOG = 1;
  static ACTIVATOR_SENSE = 2;
  static MESSAGE_ARRAY_SIZE = 3;
  //static ACTIVATOR_ANTISENSE = ;  
  static NULL_MESSAGE = 5;
};

// enum Walls
class Walls {
  static ME = 0;  // this cell
  static L  = 1;  // left
  static TL =  2;  // top left
  static TR =  3;  // top right
  static R  =  4;  // right
  static BR  =  5;  // bottom right
  static BL  =  6;  // bottom left
  static MAX_FABRIC_WALLS = 7; // array size
};

// struct
class Message {
  constructor (msg, units) {
    this.units = units;
    this.msg   = msg;      // MsgType
  }
};

// params
const CELLSIZE_XY        = 12;
const CANVAS_PIX_X       = 1200;  // TODO - allow canvas size adjust
const CANVAS_PIX_Y       = 1200;  
const FABRIC_WIDTH       = CANVAS_PIX_X / CELLSIZE_XY;
const FABRIC_HEIGHT      = CANVAS_PIX_Y / CELLSIZE_XY;
const INJECTION_MIN      = 0;
const INJECTION_MAX      = 500000;
const INITIAL_INJECTIONS = 80;

let fabric;
let manager;
const params = {
  initPoints: INITIAL_INJECTIONS,
  injectionMin: INJECTION_MIN,
  injectionMax: INJECTION_MAX,
  fabricWidth:  FABRIC_WIDTH,
  fabricHeight: FABRIC_HEIGHT,
  cellSizeXY:   CELLSIZE_XY,
};

const createpane = () => {
  const pane = new Tweakpane.Pane();  
  let folder;
  let btnRestart;
  
  folder = pane.addFolder({ title: 'Diffusion Rainbow Dimensions'});

  folder.addInput(params, 'fabricWidth', { min: 40, max: 600, step: 20 }); 
  folder.addInput(params, 'fabricHeight', { min: 40, max: 600, step: 20 });  
  folder.addInput(params, 'cellSizeXY', { min: 2, max: 30, step: 2 }); 

  folder = pane.addFolder({ title: 'Diffusion Rainbow '});
  folder.addInput(params, 'initPoints', { min: 1, max: 200, step: 1 });  
  folder.addInput(params, 'injectionMin', { min: INJECTION_MIN, max: INJECTION_MAX, step: 1000 });
  folder.addInput(params, 'injectionMax', { min: INJECTION_MIN, max: INJECTION_MAX, step: 1000 });
  btnRestart = folder.addButton({
    title: 'RESTART',
    label: '',
    });
  btnRestart.on('click', () => {
    cl('RESTART CLICKED');
    //fabric.resetFabric(); // no dimension changes - basic reset
        
    fabric = new FabricState(params.fabricWidth, params.fabricHeight, params.cellSizeXY);
    fabric.injectParticles();
    //manager.render()

    //// Uncaught Error: Sorry, the { animate } option is not yet supported with update() //
    //let canvasWidthPx = params.fabricWidth * params.cellSizeXY;                         //
    //let canvasHeightPx = params.fabricHeight * params.cellSizeXY;                       //
    //manager.loadAndRun(sketch, {                                                        //
    //  dimensions: [ canvasWidthPx, canvasHeightPx ],                                    //
    //  animate: true                                                                     //
    //});                                                                                 //
    //// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - /
    

  });
  
}



class FabricCell {
  static DIFFUSE_IN = true; // or false!
  
  constructor(id){
    this.cid = id;    
    this.id = '';
    this.walls = [];
    this.msgs  = [];
    this.inMsgs  = [];
    
    for (let n=0; n<Walls.MAX_FABRIC_WALLS; n++) this.walls.push(0);
    
    for (let m=0; m<MsgType.MESSAGE_ARRAY_SIZE; m++) // initialise Message array : Current Outgoing
    {
      this.msgs.push(new Message(MsgType.NULL_MESSAGE, 0));
    }
  
    for (let m=0; m<MsgType.MESSAGE_ARRAY_SIZE; m++) // initialise Message array : Cumulative Incoming
    {
      this.inMsgs.push(new Message(MsgType.NULL_MESSAGE, 0));
    }      
  }
  
  diffuse(){
    let  ifaces = 0;
    let  postUnits = 0;
    let  spare = 0;
    
    const FABRIC_WALLS = Walls.MAX_FABRIC_WALLS;
    const FIRST_WALL = Walls.L;
    
    // cycle though msgTypes - diffuse each into surrounding cells
    for(let forEachMsgType = 0; forEachMsgType < MsgType.MESSAGE_ARRAY_SIZE; forEachMsgType++){
    
       // diffuse particles into surrounding cell for each type of message
       if (this.msgs[forEachMsgType].units > 0){

          for (let n=FIRST_WALL; n<FABRIC_WALLS; n++) // TODO - add to object assign @ InitFabric - refactor DIFFUSE_IN
             if(this.walls[n] != 0) ifaces++;
    
          if (FabricCell.DIFFUSE_IN) {
            ifaces++; // add one for walls[0] ie ME
          }
    
          // divide up units equally
          postUnits = this.msgs[forEachMsgType].units / ifaces;
          // gather leftover particles so they don't get lost
          spare = this.msgs[forEachMsgType].units % ifaces;
    
          // post units to existing cell walls
          for (let forEachCellWall = FIRST_WALL; forEachCellWall < FABRIC_WALLS; forEachCellWall++)
          {
             if(this.walls[forEachCellWall] != 0) 
                this.walls[forEachCellWall].inMsgs[forEachMsgType].units = this.walls[forEachCellWall].inMsgs[forEachMsgType].units + postUnits;
          }
    
          // add an equal amount of particles to this cell
          // don't need to transfer message identifier since this cell is the progenitor
          // and is the source of the identifier
          if (FabricCell.DIFFUSE_IN) {
            this.inMsgs[forEachMsgType].units += (postUnits + spare);
          } else {
            this.inMsgs[forEachMsgType].units += (spare);  
          }
          
          ifaces = 0;
       }
    }  
  };
  
  regroup(){    
    for (let forEachMsgType = 0; forEachMsgType < MsgType.MESSAGE_ARRAY_SIZE; forEachMsgType++) {
       this.msgs[forEachMsgType].units = this.inMsgs[forEachMsgType].units;     
       this.inMsgs[forEachMsgType].units = 0;
    }
  };
  
  insertMessage(inMsg){          // TODO - pass Message(PRESSURE, 50000) 
    this.msgs[inMsg.msg].units += inMsg.units;
    this.msgs[inMsg.msg].msg = inMsg.msg;
  };
  
  resetCellMsgs(){    
    for (let forEachMsgType = 0; forEachMsgType < MsgType.MESSAGE_ARRAY_SIZE; forEachMsgType++) {
       this.msgs[forEachMsgType].units = 0;     
       this.inMsgs[forEachMsgType].units = 0;
    }
  }
};

class FabricState {
  constructor(width, height, cellWH) {
    this.fabricEnv = [];
    this.width = width;
    this.height = height;
    this.cellW = cellWH;
    this.cellH = cellWH;
    this.ctxWidth = width * cellWH;
    this.ctxHeight = height * cellWH;
    this.canvasXOffset = cellWH / 2;
    
    let count = 0;
    for (let x=0; x<this.width; x++)
    {
      let col = [];
      
      for (let y=0; y<this.height; y++)
      {
        col.push(new FabricCell(count++));
      }
      this.fabricEnv.push(col);
    }
    
    // label for debug
    for (let y=0; y<this.height; y++)            
    {
      for (let x=0; x<this.width; x++)
      {
        this.fabricEnv[x][y].id = `X${x}-Y${y}`;
      }
    }    
    
    this.initFabric();
  }

  /************************************************************************
  *  FUNC: initFabric
  *
  *  DESC: assign co-located FabricCell objects to cell walls for 
  *        communication w/ eachother.
  *        Simulated hexagonal lattice. 2D array with each element
  *        having acces from 2 above, 2 below and 1 from each side.
  *        See fabric_array_connections.jpeg for sketch
  *
  ************************************************************************/
  initFabric() {
    if (FabricCell.DIFFUSE_IN) {    
      cl("\nDIFFUSE IN\n");
    } else {
      cl("\nDIFFUSE OUT\n");
    }
  
    // HEXAGONAL_FABRIC:
                                                //   Cell Wall Reference
    // int x,y;                                  //   
    // assign each cell it a pointer to itself.//         TL    TR   
    for (let y=0; y<this.height; y++)          //          2    3
    {                        
      for (let x=0; x<this.width; x++)         //       L    ME    R
      {                                        //       1    0     4
        this.fabricEnv[x][y].walls[Walls.ME] = this.fabricEnv[x][y];    
      }                                        //          6    5
    }                                          //         BL    BR
    
    // assign cell 1 & 4 pointers (cells to L & R on the same line)
    for (let y=0; y<this.height; y++)            
    {
      this.fabricEnv[0][y].walls[Walls.L] = 0;  // first in the row
      this.fabricEnv[0][y].walls[Walls.R] = this.fabricEnv[0+1][y];
      for (let x=0+1; x<this.width-1; x++)
      {
        this.fabricEnv[x][y].walls[Walls.L] = this.fabricEnv[x-1][y];  // put pointer to cell to the left in walls[L]
        this.fabricEnv[x][y].walls[Walls.R] = this.fabricEnv[x+1][y];
      }
      this.fabricEnv[this.width-1][y].walls[Walls.L] = this.fabricEnv[this.width-2][y];  
      this.fabricEnv[this.width-1][y].walls[Walls.R] = 0;
    }
    
    
    // assign TL TR cell walls
    // row y=0 easy clear all TL an TR pointers
    // row y=1 offset = 1 so first cell has TL & TR walls - last cell only TL
    // row y=2 offset = 0 so first cell only has TR wall  - last both TL & TR
    // row y=3 offset = 1 so first cell has TL & TR walls etc etc
    for (let x=0; x<this.width; x++) { // row y=0
      this.fabricEnv[x][0].walls[Walls.TL] = 0; 
      this.fabricEnv[x][0].walls[Walls.TR] = 0;
    }
    for (let y=0+1; y<this.height; y++)            
    {                        
      let offset = y % 2;
      // do cell at start of row
      if (offset){  // do LEFT edge of cell fabric
        this.fabricEnv[0][y].walls[Walls.TL] = this.fabricEnv[0][y-1];
        this.fabricEnv[0][y].walls[Walls.TR] = this.fabricEnv[0+1][y-1];
      }
      else {
        // causing unhandled access violation x=199,y=38
        this.fabricEnv[0][y].walls[Walls.TL] = 0;
        this.fabricEnv[0][y].walls[Walls.TR] = this.fabricEnv[0][y-1];
      }
      // do rest of cells except for last one
      let x;
      for (x=0+1; x<this.width-1; x++)          
      {
        if (offset) {
          this.fabricEnv[x][y].walls[Walls.TL] = this.fabricEnv[x][y-1];
          this.fabricEnv[x][y].walls[Walls.TR] = this.fabricEnv[x+1][y-1];
        }
        else {
          this.fabricEnv[x][y].walls[Walls.TL] = this.fabricEnv[x-1][y-1];
          this.fabricEnv[x][y].walls[Walls.TR] = this.fabricEnv[x][y-1];
        }
      }              
      // do last cell in row
      if (offset){  // do RIGHT edge of cell fabric (LAST FabricCell)
        this.fabricEnv[this.width-1][y].walls[Walls.TL] = this.fabricEnv[x][y-1];
        this.fabricEnv[this.width-1][y].walls[Walls.TR] = 0;
      }
      else {
        this.fabricEnv[this.width-1][y].walls[Walls.TL] = this.fabricEnv[x-1][y-1];
        this.fabricEnv[this.width-1][y].walls[Walls.TR] = this.fabricEnv[x][y-1];
      }
    }
    
    // assign BL BR cell walls
    for (let y=0; y<this.height-1; y++)            
    {                        
      let offset = 1 * (y % 2);
      // do cell at start of row
      if (offset){  // do LEFT edge of cell fabric
        this.fabricEnv[0][y].walls[Walls.BL] = this.fabricEnv[0][y+1];
        this.fabricEnv[0][y].walls[Walls.BR] = this.fabricEnv[0+1][y+1];
      }
      else {
        this.fabricEnv[0][y].walls[Walls.BL] = 0;
        this.fabricEnv[0][y].walls[Walls.BR] = this.fabricEnv[0][y+1];
      }
      // do rest of cells except for last one
      let x;
      for (x=0+1; x<this.width-1; x++)          
      {
        if (offset) {
          this.fabricEnv[x][y].walls[Walls.BL] = this.fabricEnv[x][y+1];
          this.fabricEnv[x][y].walls[Walls.BR] = this.fabricEnv[x+1][y+1];
        }
        else {
          this.fabricEnv[x][y].walls[Walls.BL] = this.fabricEnv[x-1][y+1];
          this.fabricEnv[x][y].walls[Walls.BR] = this.fabricEnv[x][y+1];
        }
      }              
      // x still in scope and = 199            < - - - - - - - - -  < <
      // do last cell in row
      if (offset){  // do RIGHT edge of cell fabric (LAST FabricCell)
        this.fabricEnv[this.width-1][y].walls[Walls.BL] = this.fabricEnv[x][y+1];
        this.fabricEnv[this.width-1][y].walls[Walls.BR] = 0;
      }
      else {
        this.fabricEnv[this.width-1][y].walls[Walls.BL] = this.fabricEnv[x-1][y+1];
        this.fabricEnv[this.width-1][y].walls[Walls.BR] = this.fabricEnv[x][y+1];
      }
    }
    // do bottom row
    for (let x=0; x<this.width-1; x++) { // row y=149
      this.fabricEnv[x][this.height-1].walls[Walls.BL] = 0; 
      this.fabricEnv[x][this.height-1].walls[Walls.BR] = 0;
    }     
  }

  diffusionCycle() {
    for (let x=0; x<this.width; x++)
    {
      for (let y=0; y<this.height; y++)
      {
        this.fabricEnv[x][y].diffuse();
      }
    }
    for (let x=0; x<this.width; x++)
    {
      for (let y=0; y<this.height; y++)
      {
        this.fabricEnv[x][y].regroup();
      }
    }
  }  

  resetFabric() {
    for (let x=0; x<this.width; x++)
    {
      for (let y=0; y<this.height; y++)
      {
        this.fabricEnv[x][y].resetCellMsgs();
      }
    }
  }
  
  injectParticles(){
    for (let i=0; i<params.initPoints; i++)
    {
      let x = Math.floor(random.range(0, this.width ));
      let y = Math.floor(random.range(0, this.height ));
      //let x = Math.floor(this.width/2);
      //let y = Math.floor(this.height/2);    
      let qty = Math.floor(random.range(params.injectionMin, params.injectionMax)); 
      let msg = Math.floor(random.range(0, MsgType.MESSAGE_ARRAY_SIZE )); 
      let rndMsg = new Message(msg, qty);
      //this.fabricEnv[x][y].insertMessage(rndMsg);  // TODO rename more meaningful
      this.fabricEnv[x][y].insertMessage(rndMsg);
    }
  }
  
  draw(context){
    const alpha = 1;

    // clear canvas    
    context.fillStyle = 'white';
    //context.fillRect(0, 0, this.ctxWidth, this.ctxHeight);
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    
    // draw
    for (let x=0; x<this.width; x++)
    {
      for (let y=0; y<this.height; y++)
      {
        context.save();
        let xOffset = this.canvasXOffset * (y % 2);
        context.translate(x * this.cellW + xOffset, y * this.cellH);
  
        context.beginPath();
        
        let compositeFill = `rgba(${this.fabricEnv[x][y].msgs[0].units % 256}, ${this.fabricEnv[x][y].msgs[1].units % 256},${this.fabricEnv[x][y].msgs[2].units % 256},${alpha})`;
        context.fillStyle = compositeFill;
        context.rect(0, 0, this.cellW, this.cellH);
        context.fill();
        context.restore();
      }
    }    
  }
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -




const settings = {
  dimensions: [ CANVAS_PIX_X, CANVAS_PIX_Y ],
  animate: true
};


const sketch = () => {
  
  //cl(`ME ${Walls.ME}`);
  //cl(this.fabricEnv);
  
  fabric = new FabricState(params.fabricWidth, params.fabricHeight, params.cellSizeXY);
  
  fabric.injectParticles();
  
  return ({ context, width, height }) => {

    fabric.draw(context);
    
    // run cycle 
    fabric.diffusionCycle();
    
  };
};

createpane();
// canvasSketch(sketch, settings);

const start = async () => {
  manager = await canvasSketch(sketch, settings);   // returns new SketchManager();
};

start();  // fire it up!

// Used async to be able to do the following
//manager.loadAndRun(sketch, {                                                        //
//  dimensions: [ canvasWidthPx, canvasHeightPx ],                                    //
//  animate: true                                                                     //
//});   
// Uncaught Error: Sorry, the { animate } option is not yet supported with update() :/
