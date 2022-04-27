# U5 - Sketch - Noise - Animation
Contents notes:  
Introduction to Perlin Noise, Simplex Noise, direction artifacts, 3d simplex noise, animation based on that
noise.  
Adding a control panel (to allow control of different variables in realtime) called 
[tweakpane](https://github.com/cocopon/tweakpane).
  
Install tweakpane & run:  
```
> cd ./test_pages/u5_noise
> npm tweakpane --version           # check if tweakpane is installed
8.1.2
> npm i tweakpane                   # install if not
> canvas-sketch sketch-04 --open    # fire up code in a new browser window / tab
```
  
  
Some experiments:
| 1 | 2 | 3 | 
| - | - | - | 
| ![sk](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u5_noise/2022.01.12-20.48.51.png) | ![sk](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u5_noise/2022.01.10-19.48.27.png) | ![sk](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u5_noise/perlin_tweakpane.png) |
| - | Code @ [sketch-04.js](https://github.com/UnacceptableBehaviour/js_canvas/blob/90c0c01067f439f686041fc9bc759ba0b953d40e/test_pages/u5_noise/sketch-04.js) | Code @ [sketch-04.js](https://github.com/UnacceptableBehaviour/js_canvas/blob/786d5cbb875ec367ea4c766a493bdc08a5bef751/test_pages/u5_noise/sketch-04.js) | 
    
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
> canvas-sketch sketch-04 --output=anim --stream        # re-run w/ --stream flag set
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
