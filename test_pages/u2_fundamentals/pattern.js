// JS in here :)

// HTML Canvas ref: W3 - https://www.w3schools.com/tags/ref_canvas.asp

let canvas = document.querySelector('canvas');
let context = canvas.getContext('2d');

// solid shape
context.fillStyle = 'blue';         // property
//context.fillRect(100,100,400,400);


// drawing path - 
context.lineWdth = 4;
context.beginPath();            // start contructing path
context.rect(100,100,400,400);
context.stroke();               // start drawing
  
// circular arc - https://www.w3schools.com/tags/canvas_arc.asp
// arc(x,y, radius, start angle, end angle)
// angles in radians,  360deg = 2*Math.PI
context.beginPath();            // start contructing path
context.arc(300,300,100, 0, 2*Math.PI);
context.stroke();  

//// draw grid of arrays 
//for (let i=0; i < 5; i++){
//  for (let j=0; j < 5; j++){
//    let width = 60;
//    let height = 60;
//    let gap = 20;
//    let x = 100 + (width + gap) *i;
//    let y = 100 + (height + gap) *j;
//    
//    context.beginPath();            // outer rect
//    context.rect(x,y, width,height);
//    context.stroke();       
//
//    // on refresh draws inner rect in different places
//    if (Math.random() > 0.5) {
//      context.beginPath();            // inner rect
//      context.rect(x+8,y+8, width-16,height-16);
//      context.stroke();       
//    }
//  }
//}

// as code ^ above ^ but code tidied up
// draw grid of arrays 
const width = 60;
const height = 60;
const gap = 20;
let x,y;

for (let i=0; i < 5; i++){
  for (let j=0; j < 5; j++){
    x = 100 + (width + gap) *i;
    y = 100 + (height + gap) *j;
    
    context.beginPath();            // outer rect
    context.rect(x,y, width,height);
    context.stroke();       

    // on refresh draws inner rect in different places
    if (Math.random() > 0.5) {
      context.beginPath();            // inner rect
      context.rect(x+8,y+8, width-16,height-16);
      context.stroke();       
    }
  }
}

// introduces - array iterator
//Array.forEach( item => {
//   console.log(item)           
//});
