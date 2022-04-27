const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');

const settings = {
  dimensions: [ 1048, 1048 ],
  animate: true
};

// helpers
const cl = (str) => {
  console.log(str);
}

// call on every frame update - - - - - < <
const animate = () => {
	console.log('domestika');
	requestAnimationFrame(animate);
};
// animate();

// canvas
// { context, width, height } - missing
const sketch = ({ context, width, height }) => {
  
  const agents = [];

  for (let i = 0; i < 40; i++) {
    const x = random.range(0, width);
    const y = random.range(0, height);

    agents.push(new Agent(x, y));
  }
  
  // TODO look at canvasSketch(sketch, settings); code to see how this variable make it here!
  // js_canvas/test_pages/u4_animation/node_modules/canvas-sketch/lib/canvas-sketch.js
  return ({ context, width, height }) => {
    context.fillStyle = 'beige';
    context.fillRect(0, 0, width, height);

    for (let i = 0; i < agents.length; i++) {
			const agent = agents[i];

			for (let j = i + 1; j < agents.length; j++) {
				const other = agents[j];

				const dist = agent.pos.getDistance(other.pos);
				
        const connectionLimit = 300;
				if (dist > connectionLimit) continue;
				
        // maps one range to another based on the value of a variable
        // var is dist. map 0 to 
				context.lineWidth = math.mapRange(dist, 0, connectionLimit, connectionLimit/10, 1);

				context.beginPath();
				context.moveTo(agent.pos.x, agent.pos.y);
				context.lineTo(other.pos.x, other.pos.y);
				context.stroke();
			}
		}
    
    
    agents.forEach( agent => {
      agent.update();
      agent.draw(context);
      agent.bounce(width, height);
      //agent.traverse(width, height);
    });
    
  };
};


class Vector {
  constructor(x, y){
    this.x = x;
    this.y = y;
  }
  
  getDistance(v) {
		const dx = this.x - v.x;
		const dy = this.y - v.y;
		return Math.sqrt(dx * dx + dy * dy);
	}
  
  dbg(){
    console.log(this);    
  }
}


class Agent {
  constructor(x, y, radius){
    this.pos = new Vector(x,y);
    this.vel = new Vector(random.range(-4, 4), random.range(-4, 4)); 
    //this.rad = random.rangeFloor(5, 21);
    this.rad = 5;
  }
  
  draw(context){
    // isolate drawing behaviour by saving & restoring context
    context.save()
    
    context.translate(this.pos.x, this.pos.y);  // move the origin / move canvas under plotter pen - see if it helps to think of it like this!?    
    context.lineWidth = 4;    
    context.beginPath();
    // was this before translate intorduced
    // context.arc(this.pos.x, this.pos.y, this.rad, 0, Math.PI*2); // arc(x,y,r,sAngle,eAngle,counterclockwise);    
    context.arc(0,0, this.rad, 0, Math.PI*2);    
    context.fillStyle = 'black';
    context.stroke();

    context.restore()
  }
  
  bounce(width, height) {
		if (this.pos.x <= 0 || this.pos.x >= width)  this.vel.x *= -1;
		if (this.pos.y <= 0 || this.pos.y >= height) this.vel.y *= -1;
	}

  traverse(width, height) {
    if (this.pos.x <= 0)  this.pos.x = width-1;
    if (this.pos.x >= width) this.pos.x = 1;
    
		if (this.pos.y <= 0) this.pos.y = height-1;
		if (this.pos.y >= height) this.pos.y = 1;
	}
  
  
	update() {
		this.pos.x += this.vel.x;
		this.pos.y += this.vel.y;
	}
  
  dbg(){
    console.log(this);    
  }

}

    //context.beginPath();
    //// show origin
    //context.fillStyle = 'red';
    //context.arc(0, 0, 5, 0, 2*Math.PI);
    //context.fill();
    
canvasSketch(sketch, settings);
