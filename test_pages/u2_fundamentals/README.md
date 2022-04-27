# U2 - Fundamentals
Contents notes:  
Coding basics, vars, arrays, canvas, drawing concepts.  
Intro to canvas-sketch ([see resources](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u2_fundamentals/README.md#resources))  
  
canvas-sketch in output mode:  
![canvas-sketch](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u2_fundamentals/sketches/output/01/2022.01.06-19.59.17.png)  

Running canvas-sketch:  
```
> canvas-sketch sktch-01 --new                    # no .js - create new .js from template
> canvas-sketch sktch-01.js --output=output/01    # output mode - create image in dir output/01

# from this repo (after clone)
> cd ./test_pages/u2_fundamentals/sketches
> canvas-sketch --open sktch-01.js
```
Settings can be used to create A4 size canvas & ppi setting for printing. Handy!
  
This generates a lot of node packages - debatable whethter or not to include them in repo.  
But they do create a lot of noise when doing a diff!  
Add note on specifying file(s) to ignore for git diff. TODO  
  
To IGNORE files following a 'path_name_directory' in any path.  
Add following line to .gitignore file.  
```
path_name_directory/
# or in this case
node_modules/
# any file found deeper than node_modules/ will be ignored
# put comments like this on separate line since they apear to nause things up on the same line :(
```  
  
  
Invert colours for final exersize:  
![canvas-sketch](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u2_fundamentals/sketches/output/01/2022.01.06-20.39.59.png)  
  
# Resources
**Domestika - Creative Coding: Making Visuals with JavaScript**  
https://www.domestika.org/auth/login#course_lesson_28425  
[Creative Coding: Making Visuals with JavaScript](https://www.domestika.org/auth/login#course_lesson_28425)  
  
**canvas-sketch (npm package)**  
https://github.com/mattdesl/canvas-sketch  
From README.md: canvas-sketch is a loose collection of tools, modules and resources for creating generative art in JavaScript and the browser.  
[canvas-sketch documentation](https://github.com/mattdesl/canvas-sketch/blob/master/docs/README.md)  



