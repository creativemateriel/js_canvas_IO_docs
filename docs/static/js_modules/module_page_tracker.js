// Ex create a module that implements a page behaviour by clicking a button in the navbar

// Eventually be code from:  <script src='static/nutrient_traffic_lights.js'></script>
  //<script>      
  //  var recipes = {{ recipes|tojson }};       // convert info using tojson filter      
  //  console.log(`recipe_t JS ${recipes[0]['ri_name']} - inline CONCLUDED`);  // sanity check      
  //</script>
var pageTarget;
var pageId = 'tracker_page_parent';
var htmlSource = 'static/html/tracker.html';
var jsSource = '';//'static/js_modules/content/mathTiles.js';
var jsContainerId = 'tracker_page';

import {setUnloadCurrentPageCallback, createHTMLPageContainer} from './navbarMod.js';

// tidy up when another button is pressed
// maybe just hide page
function unload_page() {
  // are we on the same page if so do nothing!
  if (document.getElementById(pageTarget).querySelector('.container')) {
    let currentPage = document.getElementById(pageTarget).querySelector('.container').id;
    console.log(`module: unload_page\n> pageTarget:${pageTarget} =? id ${currentPage}`);
    console.log(`TRACKER: currentPage:${currentPage} =? pageId ${pageId}`);
    // if (currentPage === pageId) return;
    // TODO add eventhandler to check which button actaully pressed
  }
  
  console.log(`module_page_tracker.js: ${pageId} - UNLOADING`);    
  // delete page
  document.getElementById(pageTarget).replaceChildren();
}

function load_page() {
  console.log(`module_page_tracker.js: ${pageId} - loading: ${htmlSource}`);
  
  // are we on the same page if so do nothing!
  if (document.getElementById(pageTarget).querySelector('.container')) {
    let currentPage = document.getElementById(pageTarget).querySelector('.container').id;
    console.log(`> - - module_page_tracker.js: load_page\n - pageTarget:${pageTarget} - id ${currentPage}`);
    if (currentPage === pageId) return;
  }

  setUnloadCurrentPageCallback(unload_page);
  
  fetch(htmlSource)
  .then(function(response) {
    return response.text();
  })
  .then(function(body) {
    document.getElementById(pageTarget).innerHTML = body;
  });
  
  // construct page from JS land - very simple container
  //console.log(`module: ${pageId} - constructing html`);
  //createHTMLPageContainer(pageTarget, pageId, jsContainerId, '');  
}

export function getButtonInfo(containers){
  console.log(`module_page_tracker.js: registering ${pageId} - to ${containers.main}`);
  
  pageTarget = containers.main;
  
  var buttonInfo = {};

  buttonInfo.callback = load_page;
  buttonInfo.image    = 'static/images/svg/pencil.svg'; // or '' < will use text if no image
  buttonInfo.alt      = 'tracker';
  buttonInfo.text     = 'TR';
  
  return buttonInfo;
}

export default getButtonInfo;
