function getTransitionEndEventName() {
  var transitions = {
      "transition"      : "transitionend",
      "OTransition"     : "oTransitionEnd",
      "MozTransition"   : "transitionend",
      "WebkitTransition": "webkitTransitionEnd"
   }
  let bodyStyle = document.body.style;
  for(let transition in transitions) {
      if(bodyStyle[transition] != undefined) {
        return transitions[transition];
      }
  }
}

class Website {
  constructor(){
    this.init();
  }

  init() {
    new NavigationMenu();
    new SmoothScroll();
    new PageTransitions();
    new Form();
  }
}

window.addEventListener('load', function(){
  new Website();
});
