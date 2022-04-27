// Ex create a module that implements a page behaviour by clicking a button in the navbar

// Eventually be code from:  <script src='static/nutrient_traffic_lights.js'></script>
  //<script>      
  //  var recipes = {{ recipes|tojson }};       // convert info using tojson filter      
  //  console.log(`recipe_t JS ${recipes[0]['ri_name']} - inline CONCLUDED`);  // sanity check      
  //</script>
var pageTarget;
var pageId = 'home_page';
var htmlSource = 'static/html/home.html';

function load_page() {
  console.log(`module_page_home.js: ${pageId} - loading: ${htmlSource}`);
  
  fetch(htmlSource)
  .then(function(response) {
    return response.text();
  })
  .then(function(body) {
    document.getElementById(pageTarget).innerHTML = body;
  });
}

export function getButtonInfo(containers){
  console.log(`module_page_home.js: registering ${pageId} - to ${containers.main}`);
  
  pageTarget = containers.main;
  
  var buttonInfo = {};

  buttonInfo.callback = load_page;
  buttonInfo.image    = 'static/images/svg/home.svg'; // or '' < will use text if no image
  buttonInfo.alt      = 'nutritable';
  buttonInfo.text     = 'NT';
  
  return buttonInfo;
}

export default getButtonInfo;
