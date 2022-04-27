# End of Course Project 3 - Random Target, Shortest Path
### Aim
Based on the code form [class 3](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u4_animation/README.md) as a starting point.  
Select two nodes in the graph and calculate the shortest path between the nodes.  
Highlight the path.  
Create a algorithms library module to provide the functionality.   
  
### 1. Create Node module for algorithms  
Aim to make this into a git subsystem later. TODO and link to gist.
```
> cd js_canvas/test_pages/u9_fp_random_target
> npm search algos		# check if there's already a package wit the name!
> mkdir -p lib/algos_sftest		# call it something else!!
> cd lib/algos_sftest
> npm init -y			# create module package.json file -y say yes to all
```
  
Add **algos_sftest** test code:
```
> nano index.js

File: u9_fp_random_target/lib/algos_sftest/index.js
// algos support module
// helpers
const cl = (str) => {
  console.log(str);
};

function algoInfo() {
  cl('[algos] Hello!');
};

// use export built in to export interface - shortcut for module.export
exports.algoInfo = algoInfo;

cl('FROM MODULE: algos_sftest');
```
Include it in app file (u9_fp_random_target.js) to test.
```
File: u9_fp_random_target/u9_fp_random_target.js

const algos = require('algos_sftest');
cl('IMPORTED MODULE: algos_sftest');
algos.algoInfo();
```
  
Create link to this package:
```
> cd u9_fp_random_target/lib/algos_sftest/    # module directory
> sudo npm link			# make link in /usr/local/lib/node_modules
added 1 package, and audited 3 packages in 1s
found 0 vulnerabilities

> ls /usr/local/lib/node_modules/algos		# check worked!
index.js		package.json

> cd ../..		# js_canvas/test_pages/u9_fp_random_target/
> sudo npm link algos
added 1 package, and audited 56 packages in 1s
11 packages are looking for funding
  run `npm fund` for details
found 0 vulnerabilities

> ls -la node_modules
lrwxr-xr-x   1 root   staff     12 10 Mar 07:46 algos -> ../lib/algos
```
  
So we don't get problem when running canvas-sketch like:
```
  → Installing dependencies:  
    algos_sftest  

npm ERR! code E404
npm ERR! 404 Not Found - GET https://registry.npmjs.org/algos_sftest - Not found
```
  
Edit package.json file:
```
> nano package.json

File: u9_fp_random_target/lib/algos_sftest/package.json
{
  "name": "u9_fp_random_target",
  "version": "1.0.0",
  "description": "",
  "main": "u9_fp_random_target.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "algos_sftest": "^1.0.0",		     < Add line left of arrow
    "canvas-sketch": "^0.7.4",
    "canvas-sketch-util": "^1.10.0"
  }
}
```  
  
### 2. Add tweakpane get a feel for sensible parameter settings  
Number of nodes, distance at which to connect to make a network thats not too over-connected.
See 1st 6 images below. Blue and red node are route start & finish nodes

### 3. Next steps
Create a graph from the nodes & link in the current frame.  
Think about the API to the Algo library.  
Components needed to implement Dijkstra:  
Prioriy Q (min Heap), Graph, Node (be able to sort by distance), and of course Dijkstra function.
  
### 4. Add enough functionality into module to find shortest path between two nodes.

**Basics to understand Dijkstra algorithm.**  
Dijkstra revision [L16 6.006](https://github.com/UnacceptableBehaviour/algorithms#l16---dijkstra) - Relaxation p648 CLRS
  
**DFS vs BFS**  
With DFS the search uses a **stack** to store new nodes as the graph is searched, this also lends itself to using recursion since it has an implicit stack in the call stack.  
  
With BFS a queue structure is used to store an process nodes, this is what is used by Dijkstra  
  
Dijkstra is a greedy algorithm (it makes the locally optimal choice at each stage).  
  
The first step is to process all the nodes adjacent to the **start node** and queue them up in order of shortest distance first. (Shortest distance is the optimal - greedy - next choice).  

The algorithm then repeats this step with each element in the Q:   
It pulls a node off the Q, goes through each adjacent node, calculates the distance of the adjacent node from the start and  places that adjacent node back in the Q according to its distance from the start.  
  
Note if an early node (processing wise) is a long distance away from the start, a multistep route with a smaller distance will be processed first because it will appear earlier in the queue. This ensures the shortest route requirement.  
  
The algorithm also maintains a set of **visited_nodes** to detect when the target node has been found.  
  
**Relaxation - fundamental concept:**  
d[v] length current SP from source (blue) to v   
-	(d[v] updates for each node as algorithm runs - set to ∞ to start)  
-	except for S which is 0 these all start at infinity until they are deduced  
  
𝛿(s,v) length of *a* shortest path between s & v  
  
∏[v] predecessor of v in the SP from s to v (used to reconstruct the SP)  
	∏[S] = NIL  
  
w(u,v) distance from u to v  
  
  
Relaxation operation:  
```
RELAX(u, v, w)
	if d[v] > d[u] + w(u, v) 		if dist from S to u + dist from u to v is < dist from S to v
		then d[v] = d[u] + w(u, v) 	then update v with new shortest path
			∏[v] = u			and update its predecessor with u
```
**It is basically saying:** if we have found a shorter route to v via u, update the details in v to reflect this.
  
Keep going until T is in the **visited_nodes**.  
  
| Abr | **TERMS** |
| - | - | 
S	|	Source
T	|	Target
SP	|	Shortest Path
DAG |	Directed Acyclic Graph
DFS | Depth First Search
BFS | Breadth First Search

**Some experiments:**  
| 1 | 2 | 3 | 
| - | - | - | 
| ![sk](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u9_fp_random_target/images/2022.03.10-17.10.44.png) | ![sk](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u9_fp_random_target/images/2022.03.10-19.37.25.png) | ![sk](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u9_fp_random_target/images/2022.03.10-19.38.12.png) |
| Code @ [u9_fp_random_target.js](https://github.com/UnacceptableBehaviour/js_canvas/blob/fc610f4ddc7dde1d54572d3e60bac26bbdf1ff84/test_pages/u9_fp_random_target/u9_fp_random_target.js) | testing line types | testing # of nodes | 
| ![sk](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u9_fp_random_target/images/2022.03.10-19.38.26.png) | ![sk](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u9_fp_random_target/images/2022.03.10-19.38.32.png) | ![sk](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u9_fp_random_target/images/2022.03.10-19.38.40.png) |
| testing connection types | testing connection types | testing connection types | 
| ![sk](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u9_fp_random_target/images/2022.03.13-19.55.17.png) | ![sk](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u9_fp_random_target/images/2022.03.13-19.31.46.png) | ![sk](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u9_fp_random_target/images/2022.03.13-19.32.50.png) |
| Code @ [u9_fp_random_target.js](https://github.com/UnacceptableBehaviour/js_canvas/blob/b06198baa8ad26ff6bed0ed5eb69aad1f8cb5b8f/test_pages/u9_fp_random_target/u9_fp_random_target.js)  git vs no to match lib | More nodes | More nodes | 
  
To see short animation navigate [here](https://github.com/UnacceptableBehaviour/js_canvas/blob/master/test_pages/u9_fp_random_target/anim/2022.03.15-19.28.22.mov) and click DOWNLOAD for mp4. (Ver: 0a697bf837f94b20292a3064da15a7357cf3e859)
  


# Resources
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
