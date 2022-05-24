// Ex create a module that implements a page behaviour by clicking a button in the navbar

// Eventually be code from:  <script src='static/nutrient_traffic_lights.js'></script>
  //<script>      
  //  var recipes = {{ recipes|tojson }};       // convert info using tojson filter      
  //  console.log(`recipe_t JS ${recipes[0]['ri_name']} - inline CONCLUDED`);  // sanity check      
  //</script>
import {getCurrentPage, setCurrentPage, setUnloadCurrentPageCallback, createHTMLPageContainer} from './navbarMod.js';
  
var pageTarget;
var pageId = 'mathPaint_page';
var htmlSource = 'static/html/mathPaint.html';
var jsSource = 'static/js_modules/content/mathTiles.js';
var jsContainerId = 'maths_paint';
var buttonId = 'b_nav_math_tile';

// tidy up when another button is pressed
// maybe just hide page
function unload_page(idOfPressedButton) {
  // are we on the same page if so do nothing!
  if (getCurrentPage() === idOfPressedButton) {
    console.log('unload_math_tiles: SAME PAGE - DO NOTHING');
    return;
  }
  
  console.log(`module_page_mathPaint.js: ${buttonId} - unloading: stop RAF calls JS: ${jsSource}`);    
  console.log('run mathTile.js resetRAFcallback: - S');
  
  if (typeof(mathTiles) === 'function') {
    mathTilesKeepRunningAnimation = false;
    console.log(`run mathTile.js resetRAFcallback: ${typeof(mathTiles)} - E`);
  } else {
    console.log('run mathTile.js NOT LOADED! - E');
  }
  // delete page
  document.getElementById(pageTarget).replaceChildren();
}

function load_page() {
  // are we on the same page if so do nothing!
  if (getCurrentPage() === buttonId) {
    console.log('SAME PAGE - DO NOTHING');
    return;
  } else {
    setCurrentPage(buttonId);
  }
  
  console.log(`module_page_mathPaint.js: ${buttonId} - loading: ${htmlSource}`);

  setUnloadCurrentPageCallback(unload_page);
  
  //console.log(`module_page_mathPaint.js: ${pageId} - loading html: ${htmlSource}`);  
  //fetch(htmlSource)
  //.then(function(response) {
  //  return response.text();
  //})
  //.then(function(body) {
  //  document.getElementById(pageTarget).innerHTML = body;
  //});
  
  // construct page from JS land - very simple container
  console.log(`module_page_mathPaint.js: ${pageId} - constructing html`);
  createHTMLPageContainer(pageTarget, pageId, jsContainerId, 'mathTiles');
  
  // fix margin
  document.getElementById(pageId).style.padding = "0px";
  document.getElementById(jsContainerId).style.padding = "0px";
  document.getElementById(pageTarget).style.padding = "0px";
  
  console.log(`module_page_mathPaint.js: ${pageId} - loading JS: ${jsSource}`);

  if (typeof(mathTiles) === 'function') {

    console.log('mathTile.js ALREADY LOADED! restart animation');
    mathTilesKeepRunningAnimation = true;
    mathTiles(document.getElementById(jsContainerId));

  } else {

    fetch(jsSource)
    .then(function(response) {
      return response.text();
    })
    .then(function(text) {    
      var script = document.createElement("script");
      script.innerHTML = text;
      document.getElementById(jsContainerId).appendChild(script);
    });
    
  }  
}

export function getButtonInfo(containers){
  console.log(`module_page_mathPaint.js: registering ${pageId} - to ${containers.main}`);
  
  pageTarget = containers.main;
  
  var buttonInfo = {};

  buttonInfo.callback = load_page;
  buttonInfo.image    = ''; //'static/images/svg/blank.svg'; // or '' < will use text if no image
  buttonInfo.alt      = 'mathPaint';
  buttonInfo.text     = 'MP';
  buttonInfo.id       =  buttonId;
  
  return buttonInfo;
}


//export function getButtonUnloadInfo(containers){
//  console.log(`module_page_mathPaint.js: registering ${pageId} - to ${containers.main}`);
//  
//  pageTarget = containers.main;
//  
//  var buttonInfo = {};
//
//  buttonInfo.callback = unload_page;
//  buttonInfo.image    = ''; //'static/images/svg/blank.svg'; // or '' < will use text if no image
//  buttonInfo.alt      = 'mathPaintUnload';
//  buttonInfo.text     = 'MPU';
//  
//  return buttonInfo;
//}


export default getButtonInfo;
