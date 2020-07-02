(function(){

  var input = document.querySelectorAll('[data-input-field]');
  var heroCta = document.querySelectorAll('[data-hero-cta]');
  var buttonLine = document.querySelector('[data-remove-class]');
  var menuTrigger = document.querySelectorAll('[data-toggle-menu]');
  var navMenu = document.querySelector('[data-nav-menu]');
  var navMenuLinks = document.querySelectorAll('[data-nav-menu-link]');
  var navBar = document.querySelector('[data-nav-bar]');
  var homePage = document.getElementById('home');

  function updateInputContent() {
    let inputValue = this.value;

    if (inputValue === "") {
      this.classList.remove("has-input");
    } else {
      this.classList.add("has-input");
    }
  }

  function init() {
    input.forEach(function(element, index) {
      element.addEventListener("focusout", updateInputContent);
    });

    heroCta.forEach(function(element, index){
      element.addEventListener('click', (e) => {
        scrollToSection(e, element)
      });
    });

    if(homePage) {
      buttonLine.addEventListener('animationend', () => {
        var $thisElem = event.target;
        if($thisElem.classList.contains('wow')){
          $thisElem.classList.remove('wow', 'anim-grow');
          $thisElem.setAttribute("style", "");
        };
      });
    }

    new NavigationMenu(navMenu, navMenuLinks, menuTrigger, navBar);
	}

  window.addEventListener('load', function(){
    init();
  });

}());
