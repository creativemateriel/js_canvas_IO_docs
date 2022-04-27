# End of Course Project 4 - Dynamics of Maths Equations (Maths Tiles)
### Aim
Try and reproduce something like this page [here](https://soulwire.co.uk/math-for-motion/) from Justin Windle
A creative developer whos work I was introduced to doing this course.
  
### 1. Create a MathsTile class  
Create a frame border for the tile - prototyping.  
Centre a dot - a circular representation of the pulse of the equation.  
Pass an equation callback.  
Equation runs a 360deg/2pi cycle  
Draw line:  
Frequency or wavelength will govern the plot across the tile.  
The value at x=0 will govern the radius of the pulsing shape. (a circle in the [prior art](https://soulwire.co.uk/math-for-motion/))  
[Rough Code for this step](https://github.com/UnacceptableBehaviour/js_canvas/tree/fef9827a151e83704a811ba1b6f1ff0f74a4b191)
  
### 2. Draw a set of labelled tile objects with a different equation in each one.  
Create equation array with title, color & equation callback.  
Modify MathTile class to take title and display it at bottom of tile.  
Centre the text, font currently hardcoded.  
Sit tiles evenly in available display area.  
Code starting to look a bit more presentable.  
[CODE: 12 tiles 4x3](https://github.com/UnacceptableBehaviour/js_canvas/blob/f061f6283458a79b2545d58a226f466026898292/test_pages/u10_fp_math_functions/u10_fp_math_functions.js).  
  
**Some experiments:**  
| 1 | 2 | 3 | 
| - | - | - | 
| ![sk](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u10_fp_math_functions/images/2022.03.30-19.03.52.png) | ![sk](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u10_fp_math_functions/images/2022.03.30-19.57.16.png) | ![sk](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u10_fp_math_functions/images/2022.03.30-20.47.30.png) |
| Code @ [u10_fp_math_functions.js](https://github.com/UnacceptableBehaviour/js_canvas/blob/e41fa1e19bd49fd3987455c2eb2f8b58df2f3d30/test_pages/u10_fp_math_functions/u10_fp_math_functions.js) | Code @ [u10_fp_math_functions.js](https://github.com/UnacceptableBehaviour/js_canvas/tree/fef9827a151e83704a811ba1b6f1ff0f74a4b191) | Code @ [u10_fp_math_functions.js](https://github.com/UnacceptableBehaviour/js_canvas/tree/fef9827a151e83704a811ba1b6f1ff0f74a4b191) |
| ![sk](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u10_fp_math_functions/images/2022.03.31-14.37.35.png) | ![sk](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u10_fp_math_functions/images/2022.03.31-14.41.13.png) | ![sk](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u10_fp_math_functions/images/2022.03.31-14.51.30.png) |
| Debug markers in place. | Color scheme added. | Code @ [u10_fp_math_functions.js](https://github.com/UnacceptableBehaviour/js_canvas/blob/f061f6283458a79b2545d58a226f466026898292/test_pages/u10_fp_math_functions/u10_fp_math_functions.js) |
| ![sk](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u10_fp_math_functions/images/2022.04.05-19.19.35.png) | ![sk](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u10_fp_math_functions/images/2022.04.05-20.03.24.png) | ![sk](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u10_fp_math_functions/images/2022.04.05-22.37.55.png) |
| Code @ [u10_fp_math_functions.js](https://github.com/UnacceptableBehaviour/js_canvas/blob/7e666ef6143c7794ab4557e7a1a8ed709fcda81a/test_pages/u10_fp_math_functions/u10_fp_math_functions.js) | Code @ [u10_fp_math_functions.js](https://github.com/UnacceptableBehaviour/js_canvas/blob/12827d3ce36281f0ebd1ec741a0ef20b0319652e/test_pages/u10_fp_math_functions/u10_fp_math_functions.js) | Code @ [u10_fp_math_functions.js](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u10_fp_math_functions/images/2022.04.05-22.37.55.png) |
| ![sk](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u10_fp_math_functions/images/2022.04.05-22.43.25.png) | ![sk](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u10_fp_math_functions/images/2022.04.05-22.44.56.png) | ![sk](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u10_fp_math_functions/images/2022.04.05-22.46.34.png) |
| Code @ [u10_fp_math_functions.js](https://github.com/UnacceptableBehaviour/js_canvas/commits/master/test_pages/u10_fp_math_functions/u10_fp_math_functions.js) | - | - |

  
To see short animation navigate [here]() and click DOWNLOAD for mp4. (Ver: add HASH)
  
### 3. How to do metrics on requestAnimationFrame (RAF) call?
Add paint metrics. Take a baseline.  
  
Initial metrics using ```performance.now()``` using high & low watermarks to get a feel for size of bucket bands,
a counter bucket with 1ms slots:
```
  cl('setTimeout(resetWatermarks)')
  setTimeout(resetMetrics, 5000);
  
  return ({ context, width, height }) => {
    rafStartTime = performance.now();                                           //
    // metrics - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -//
    
    context.fillStyle = 'beige';
    context.fillRect(0, 0, width, height);
    
    //for (let t = 0; t < mathTiles.length; t++) {
    for (let t = 0; t < 6; t++) {
      mathTiles[t].draw(context);
      mathTiles[t].update();
    }
  
    // metrics - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -//
    rafFinishTime = performance.now();                                          //
    rafCount++;                                                                 //
    rafFrameTime = rafFinishTime - rafStartTime;                                //
    rafTotalTime += rafFrameTime;                                               //
    rafAveFrameTime = rafTotalTime / rafCount;                                  //
    if (rafFrameTime < rafLowWatermark) rafLowWatermark = rafFrameTime;         //
    if (rafFrameTime > rafHighWatermark) rafHighWatermark = rafFrameTime;       //
    let idx = Math.floor(rafFrameTime);                                         //
    if (rafBuckets[idx] === undefined)                                          //
      rafBuckets[idx] = 1;                                                      //
    else{                                                                       //
      rafBuckets[idx]++;                                                        //
    }                                                                           //
    if (rafCount % 60 === 0) {                                                  //
      cl(performance.now());                                                    //
      cl(`This frame:    ${rafFrameTime}`);                                     //
      cl(`Average frame: ${rafAveFrameTime}`);                                  //
      cl(`Low tide:      ${rafLowWatermark}`);                                  //
      cl(`High tide:     ${rafHighWatermark}`);                                 //
      cl(`rafCount:      ${rafCount}`);                                         //
      cl(`totalTime:     ${performance.now() - rafTotalTimeStart}`);            //
      cl('rafBuckets');                                                         //
      cl(rafBuckets);                                                           //
    }
  };
```
Test with 6 & 12 tile - quick check to see if there are any overheads I'm unaware of:
  
| 6 tiles | 12 tiles |
| - | - |
| ![6 tile metrics](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u10_fp_math_functions/images/metrics_6_tiles.png) | ![12 tile metrics](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u10_fp_math_functions/images/metrics_12_tiles.png) |
  
### 4. Make Optimisations
Add mode to draw lines from adjacent points, instead of circles/dots for each point.  
Paint on internal object canvas and copy to main canvas to clip MathTile.   
Or use clipping.  
Redo metrics, improved? - YES  
  
| Use copy canvas to clip Tile | Use context.clip(path) to clip tile |
| - | - |
| ![canvas](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u10_fp_math_functions/images/metrics_12_tiles_clip_w_copy_canvas.png) | ![clip func](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u10_fp_math_functions/images/metrics_12_tiles_clip_w_ctx_clip.png) |
  
Using context.clip(path) much faster than creating an internal canvas for each tile and copying it.
In fact using clipping makes drawing 12 tiles faster than drawing 6 w/o clipping. 
```
context.save();
let clipRegion = new Path2D();                  // create clipping region
clipRegion.rect(this.x,this.y, this.w,this.h);  // x,y,w,h
context.clip(clipRegion,"nonzero");

// drawing activity

context.restore();                              // clear clipping region
```
  
| Tiles | clipping? | type            | rafCount | LowWM / ms  | Average / ms | HighWM / ms  |
| - | - | - | - | - | - | - |
|  6    | no        | -               | 5640     | 2.09        | 3.66         | 14.39        |
| 12    | no        | -               | 3180     | 4.5         | 7.38         | 92.4         |
| 12    | yes       | cpy canvas      | 4980     | 12.4        | 18.4         | 96.5         |
| 12    | yes       | ctx.clip(path)  | 5400     | 5.59        | 8.41         | 64.2         |
  
![HistogramTile Added](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u10_fp_math_functions/images/2022.04.17-13.12.44.png)
  
  
![profiler-image](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u10_fp_math_functions/images/Screenshot%202022-04-17%20at%2013.32.21.png)
  
### 5. Understanding the Profiler
**Good intro vid** - [here](https://www.youtube.com/watch?v=KWM5wxlDuis)
  
The HEAP memory use has a sawtooth pattern, is this continuous allocation & garbage collection?
[Follow this up - Heap]
[Investigate Mem Alloc by Function](https://developer.chrome.com/docs/devtools/memory-problems/#allocation-profile) 
  
What does Partially Presented Frame mean? (yellow stripes)  
[FROM](https://developer.chrome.com/docs/devtools/evaluate-performance/reference/) "Chrome did its best to render at least some visual updates in time. For example, in case the work of the main thread of the renderer process (canvas animation) is late but the compositor thread (scrolling) is in time."
  
  
  
  
# Resources
**Text Metrics - measuring text attributes**  
https://developer.mozilla.org/en-US/docs/Web/API/TextMetrics
  
**Canvas Ref**
https://www.w3schools.com/tags/ref_canvas.asp
  
**Canvas - Clipping**  
https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clip
  
**Performance features reference**  
https://developer.chrome.com/docs/devtools/evaluate-performance/reference/  
  
**Chrome Performance Analysis**  
https://www.codetd.com/en/article/9044611  
**FP**  (First Paint) for the first time to draw  
**FCP** (First Contentful Paint) for the first time content to draw  
**LCP** (Largest Contentful Paint) maximum content rendering  
**DCL** (DOMContentLoaded)  
**FMP** (First Meaningful Paint) first qualifying draw  
**L**   (onLoad)  
**TTI** (Time to Interactive) interactive time  
**TBT** (Total Blocking Time) the total duration of obstruction page  
**FID** (First Input Delay) Input delay for the first time  
**CLS** (Cumulative Layout Shift) the cumulative offset layout  
**SI**  (Speed Index)  
  
**Guide to Chrome's performance profiler - CodeMad TV**  
https://www.youtube.com/watch?v=KWM5wxlDuis  
  
**NPM package manager**  
https://www.digitalocean.com/community/tutorials/how-to-use-node-js-modules-with-npm-and-package-json
  
**Creating a module - both installing or linking to local repo dir**  
https://www.digitalocean.com/community/tutorials/how-to-create-a-node-js-module  
  
**Add Node.js ref to modules**
https://nodejs.org/api/modules.html  
  
**40 useful node packages here**  
https://leanylabs.com/blog/npm-packages-for-nodejs/
  
**NPM website**  
https://www.npmjs.com/  
