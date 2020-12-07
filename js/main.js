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
