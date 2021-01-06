function initializeFunctionality() {
  new NavigationMenu();
  new SmoothScroll();
  new PageTransitions();
  new Form();
}

window.addEventListener('load', function(){
  initializeFunctionality();
});
