# U3 - Sketch Transforms
Contents notes:  
command | description
| - | - |
context.translate(x,y) | Remaps the (0,0) position on the canvas
context.rotate(45 * Math.PI / 180) | rotates around origin (0,0) in rads - Equation shows 45deg in rads
context.save() & context.restore() | save and restore context state
canvas-sketch-util | [canvas-sketch-util](https://github.com/mattdesl/canvas-sketch-util)  
  
Testing understanding - translate rotate:  
![canvas-sketch](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u3_sktch_transform/01-translate-rotate.png)  
Code @ [sketch-02.js](https://github.com/UnacceptableBehaviour/js_canvas/blob/efdcdd07826df5c5b8e8721b5c3ae99c9b3df5f7/test_pages/u3_sktch_transform/sketch-02.js)
  
Running canvas-sketch:  
```
> cd u3_sktch_transform
> canvas-sketch sketch-02 --new --open  # NO .js -creates template file sketch-02.js
> canvas-sketch sketch-02 --open        # opens a new browser tab
```
  
I'm sure there's a reason for doing it this way!
v1 | v2
| - | - |
![canvas-sketch](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u3_sktch_transform/02-25-slices.png) | ![canvas-sketch](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u3_sktch_transform/03-untils.png)  
Code @ [sketch-02.js](https://github.com/UnacceptableBehaviour/js_canvas/blob/e6420bce798bb87b03b7a50b2fe37cf94d03c0ae/test_pages/u3_sktch_transform/sketch-02.js) | Code @ [sketch-02.js](https://github.com/UnacceptableBehaviour/js_canvas/blob/3c9105e59dc721d79d172e783e3ed1fb0e0cb9de/test_pages/u3_sktch_transform/sketch-02.js)  
  
  
  
Some experiments:
| 1 | 2 | 3 | 
| - | - | - | 
| ![sk](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u3_sktch_transform/2022.01.07-18.59.01.png) | ![sk](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u3_sktch_transform/2022.01.07-19.14.07.png) | ![sk](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u3_sktch_transform/2022.01.07-19.19.36.png) | 
| - | - | - | 
| ![sk](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u3_sktch_transform/2022.01.07-19.19.36.png) | ![sk](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u3_sktch_transform/2022.01.07-23.12.19.png) | ![sk](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u3_sktch_transform/2022.01.07-19.29.22.png) | 
| - | Code @ [sketch-02b.js](https://github.com/UnacceptableBehaviour/js_canvas/blob/45cb64a7d8c3f157eaa51f0371ec7386bd66b13d/test_pages/u3_sktch_transform/sketch-02b.js) | - | 
| ![sk](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u3_sktch_transform/2022.01.07-20.28.17.png) | ![sk](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u3_sktch_transform/2022.01.07-20.37.22.png) | ![sk](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u3_sktch_transform/2022.01.07-20.40.05.png) | 
| - | Code @ [sketch-02.js](https://github.com/UnacceptableBehaviour/js_canvas/blob/0e1e4a4d2c1e33bff3421432f094163daf3b0c1f/test_pages/u3_sktch_transform/sketch-02.js) | - | 
  
**Further Work / Development / Exercize:**  
1. Couldn't get the inner and outer arc to match the rectangle on the centre canvas. Better understan scaling to fix code @ [sketch-02b.js](https://github.com/UnacceptableBehaviour/js_canvas/blob/45cb64a7d8c3f157eaa51f0371ec7386bd66b13d/test_pages/u3_sktch_transform/sketch-02b.js)  
2. Animate rotating rings and iris - use State pattern. ([see collision_canvas.js](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/js_lib_test_CORS_issue/README.md))  
3. Add tweak pane allowing control of qty, limits(length/width), speed of rings & iris  
   
   
# Resources
**Domestika - Creative Coding: Making Visuals with JavaScript**  
https://www.domestika.org/auth/login#course_lesson_28425  
[Creative Coding: Making Visuals with JavaScript](https://www.domestika.org/auth/login#course_lesson_28425)  
  
**canvas-sketch (npm package)**  
https://github.com/mattdesl/canvas-sketch  
From README.md: canvas-sketch is a loose collection of tools, modules and resources for creating generative art in JavaScript and the browser.  
[canvas-sketch documentation](https://github.com/mattdesl/canvas-sketch/blob/master/docs/README.md)  
  
**W3 Canvas Reference**  
https://www.w3schools.com/tags/ref_canvas.asp  

