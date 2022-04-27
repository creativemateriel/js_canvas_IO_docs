// Ex create a module that implements a page behaviour by clicking a button in the navbar

// Eventually be code from:  <script src='static/nutrient_traffic_lights.js'></script>
  //<script>      
  //  var recipes = {{ recipes|tojson }};       // convert info using tojson filter      
  //  console.log(`recipe_t JS ${recipes[0]['ri_name']} - inline CONCLUDED`);  // sanity check      
  //</script>
var pageTarget;
var pageId = 'mathPaint_page';
var htmlSource = 'static/html/mathPaint.html';
var jsSource = 'static/js_modules/content/mathTiles.js';

function load_page() {
  console.log(`module_page_mathPaint.js: ${pageId} - loading html: ${htmlSource}`);
  
  fetch(htmlSource)
  .then(function(response) {
    return response.text();
  })
  .then(function(body) {
    document.getElementById(pageTarget).innerHTML = body;
  });

  
  console.log(`module_page_mathPaint.js: ${pageId} - loading JS: ${jsSource}`);
  
  fetch(jsSource)
  .then(function(response) {
    return response.text();
  })
  .then(function(text) {    
    var script = document.createElement("script");
    script.innerHTML = text;
    document.getElementById(pageTarget).appendChild(script);
    //or
    //document.body.appendChild(script);    
  });
}

export function getButtonInfo(containers){
  console.log(`module_page_mathPaint.js: registering ${pageId} - to ${containers.main}`);
  
  pageTarget = containers.main;
  
  var buttonInfo = {};

  buttonInfo.callback = load_page;
  buttonInfo.image    = ''; //'static/images/svg/blank.svg'; // or '' < will use text if no image
  buttonInfo.alt      = 'mathPaint';
  buttonInfo.text     = 'MP';
  
  return buttonInfo;
}

export default getButtonInfo;
