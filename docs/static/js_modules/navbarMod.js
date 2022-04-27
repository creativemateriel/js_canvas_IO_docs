// Naive navbar implementation - experimenting w/ modules

//                      index.html
// add buttons to       <div class="btn-group" id="navButtons">
// display content in   <div class="container pwa_page" id="pwa_page">
// and                  <div class="container pwa_page" id="pwa_page_footer">

// read: https://www.javascript-coder.com/button/javascript-button-p1/

var navButtonsId = 'nav_buttons';
var navButnCnt = 0;

export function getContainers(){
  var containers = {};
  
  containers.main   = 'pwa_page';
  containers.footer = 'pwa_page_footer';  
  
  console.log(`navbarMod.js Return containers ${containers.main}`);
  return(containers);
}

// EG
//<button id='bt_weigh_in'>
//    <a href="{{url_for('weigh_in')}}"><img src="static/images/PNG/balance-scale.png" alt="tick" srcset="static/images/svg/balance-scale.svg"></a>
//</button>
//
export function addNavbutton(buttonInfo){
  console.log(`navbarMod.js ADDING BUTTON - - - - to ${buttonInfo.alt} - S`);  
  var navbar = document.getElementById(navButtonsId);
  
  let callback = buttonInfo.callback;
  let image = buttonInfo.image;
  let alt  = buttonInfo.alt;
  let text = buttonInfo.text;
  
  var navButton  = document.createElement('button');

  navButton.id = `b_nav_${navButnCnt}`;  
  navButton.onclick = callback;
  if (buttonInfo.image !== ''){
    navButton.innerHTML = `<img src="${image}">`; // '<img src="static/images/PNG/balance-scale.png">'  
  } else {    
    navButton.textContent = buttonInfo.text;          
  }
  
  navbar.appendChild(navButton);
  
  navButnCnt += 1;
  console.log("navbarMod.js ADDING BUTTON - - - - E");
  
  return(navButton.id)
}

export function removeNavbutton(buttonInfo){
  console.log(`navbarMod.js BUTTON REMOVED - - - - to ${navButtonsId} - * * NOT * *  IMPLEMENTED`);
  console.log(`navbarMod.js BUTTON REMOVED - - - - to ${navButtonsId} - * * NOT * *  IMPLEMENTED`);
}
