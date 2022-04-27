# U6 - Sketch - Fonts - Aligning Text - Bit Reading from Images
Contents notes:  
Canvas fonts, fillText - [W3Schools](https://www.w3schools.com/tags/canvas_font.asp)  
Alignment - [W3Schools](https://www.w3schools.com/tags/canvas_textbaseline.asp)  
Canvas 2d Ref - [Mozilla](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D)  
measureText - [Mozilla](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/measureText)  
ES6 / JS - asynch / await & Promises - [Mozilla](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await) - [EloquentJS](https://eloquentjavascript.net/11_async.html)  
keyPress detect & decode - [Mozilla](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent) - [Alligator Examples](https://alligator.io/js/listening-to-keyboard/)  
canvas.getImageData(x,y,width,height) - [W3Schools](https://www.w3schools.com/tags/canvas_getimagedata.asp)  
  
    
Run:  
```
> cd ./test_pages/u6_text_fill
> canvas-sketch sketch-05 --open    # fire up code in a new browser window / tab
# Hit REFRESH in the browser to see a different symbol each time!
```
  
Some experiments:
| 1 | 2 | 3 | 
| - | - | - | 
| ![sk](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u6_text_fill/2022.01.11-18.30.43.png) | ![sk](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u6_text_fill/2022.01.11-20.34.58.png) | ![sk](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u6_text_fill/2022.01.11-20.45.07.png) |
| Code @ [sketch-05.js](https://github.com/UnacceptableBehaviour/js_canvas/blob/e494f399d9f610c4b33930f2651ca72b4eab8b2f/test_pages/u6_text_fill/sketch-05.js) | Code @ [sketch-05.js](https://github.com/UnacceptableBehaviour/js_canvas/blob/497338f1b3d73796bf9d217e37253a3495eb1bb6/test_pages/u6_text_fill/sketch-05.js) | Code @ [sketch-05.js](https://github.com/UnacceptableBehaviour/js_canvas/blob/3a033eaec1ade26f906c36791efe6dae1650b3bc/test_pages/u6_text_fill/sketch-05.js) | Guides added
| ![sk](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u6_text_fill/2022.01.12-09.19.53.png) | ![sk](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u6_text_fill/2022.01.12-09.43.48.png) | ![sk](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u6_text_fill/2022.01.12-11.06.16.png) |
| Code @ [sketch-05.js](https://github.com/UnacceptableBehaviour/js_canvas/blob/705dd7feda71c58b3122e02f6760bfcb7003d294/test_pages/u6_text_fill/sketch-05.js) | Code @ [sketch-05.js](https://github.com/UnacceptableBehaviour/js_canvas/blob/f856c789262b5528e75997fc7f5b72b26adca375/test_pages/u6_text_fill/sketch-05.js) | Code @ [sketch-05.js](https://github.com/UnacceptableBehaviour/js_canvas/blob/0117662b07efb207e09bc011122730dbb7956b27/test_pages/u6_text_fill/sketch-05.js) | 
| ![sk](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u6_text_fill/2022.01.12-11.41.56.png) | ![sk](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u6_text_fill/2022.01.12-18.53.14.png) | ![sk](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u6_text_fill/2022.01.12-20.08.04.png) |
| Code @ [sketch-05.js](https://github.com/UnacceptableBehaviour/js_canvas/blob/3104beba657e99941dfd6b1f78ce6ab0dac7ae6a/test_pages/u6_text_fill/sketch-05.js) | Code @ [sketch-05.js](https://github.com/UnacceptableBehaviour/js_canvas/blob/e7e45ad3dd71ec06b12072d5a1656e0dc781bae6/test_pages/u6_text_fill/sketch-05.js) | Code @ [sketch-05.js](https://github.com/UnacceptableBehaviour/js_canvas/blob/9597c3b8d717ad8bb9a5bafb4cd04bf7bbcc772c/test_pages/u6_text_fill/sketch-05.js) | 
  
Notes on experiments.
  
  
  
# Resources
**Domestika - Creative Coding: Making Visuals with JavaScript**  
https://www.domestika.org/auth/login#course_lesson_28425  
[Creative Coding: Making Visuals with JavaScript](https://www.domestika.org/auth/login#course_lesson_28425)  
  
**canvas-sketch (npm package)**  
https://github.com/mattdesl/canvas-sketch  
From README.md: canvas-sketch is a loose collection of tools, modules and resources for creating generative art in JavaScript and the browser.  
[canvas-sketch documentation](https://github.com/mattdesl/canvas-sketch/blob/master/docs/README.md)  
  
**Exporting Animations**  
https://github.com/mattdesl/canvas-sketch/blob/master/docs/exporting-artwork.md#exporting-animations  
```
> sudo npm install @ffmpeg-installer/ffmpeg --global    # install video encoder - enables --stream flag in CLI
> canvas-sketch sketch-03 --output=anim --stream        # re-run w/ --stream flag set
#      ^cmd     ^project name  ^o/p folder   ^allow direct capture to video
# CTRL + SHIFT + S to start recording, and same to stop
```
  
**Tweakpane - npm package - Hiroki Kokubun**  
https://github.com/cocopon/tweakpane  
UI Gadget that allows you to live tweak model parameters on screen.  
  
**Canvas Sketch Utils**  
math, random, color, geometry ,penplot, shader - https://github.com/mattdesl/canvas-sketch-util  
  
**W3 Canvas Reference**  
https://www.w3schools.com/tags/ref_canvas.asp  
  
**Node Reference**  
https://nodejs.dev/learn/where-does-npm-install-the-packages  
