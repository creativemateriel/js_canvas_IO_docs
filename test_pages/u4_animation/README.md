# U4 - Sketch Agents - Animation
Contents notes:  
command | description
| - | - |
JS classes | language
Sketch | lines, animation
canvas-sketch-util | [canvas-sketch-util](https://github.com/mattdesl/canvas-sketch-util)
    
  
Some experiments:
| 1 | 2 | 3 | 
| - | - | - | 
| ![sk](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u4_animation/2022.01.08-12.33.30.png) | ![sk](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u4_animation/2022.01.08-13.03.08.png) | ![sk](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u4_animation/2022.01.08-13.12.05.png) | 
| Code @ [sketch-03.js](https://github.com/UnacceptableBehaviour/js_canvas/blob/193487c9db2f31b2caa7293cc5e05d3313534478/test_pages/u4_animation/sketch-03.js) | Code @ [sketch-03.js](https://github.com/UnacceptableBehaviour/js_canvas/blob/69c55bdfaf1b16a988eabad0448efcf7e79d5770/test_pages/u4_animation/sketch-03.js) | Code @ [sketch-03.js](https://github.com/UnacceptableBehaviour/js_canvas/blob/8e39aba15cbcca7e46ca81ebd5aa6f0cc4bb3233/test_pages/u4_animation/sketch-03.js) | 
| ![sk](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u4_animation/2022.01.08-13.31.47.png) | [animation here](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u4_animation/anim/2022.01.08-13.48.07.mp4) | ![sk]() |
| Code @ [sketch-03.js](https://github.com/UnacceptableBehaviour/js_canvas/blob/4615bddb2019897e88c26f46f8d1523d82b4e808/test_pages/u4_animation/sketch-03.js) | Code @ [sketch-03.js](https://github.com/UnacceptableBehaviour/js_canvas/blob/4615bddb2019897e88c26f46f8d1523d82b4e808/test_pages/u4_animation/sketch-03.js) | Code |
    
**To run:**
```
> cd ./test_pages/u4_animation
> canvas-sketch sketch-03 --open
```
  
  
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
  
**Canvas Sketch Utils**  
math, random, color, geometry ,penplot, shader - 
https://github.com/mattdesl/canvas-sketch-util

**W3 Canvas Reference**  
https://www.w3schools.com/tags/ref_canvas.asp
  
**Node Reference**  
https://nodejs.dev/learn/where-does-npm-install-the-packages
