(function(){

  var input = document.querySelectorAll('[data-input-field]');
  var heroCta = document.querySelectorAll('[data-hero-cta]');
  var buttonLine = document.querySelector('[data-remove-class]');
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

    new NavigationMenu();
    new SmoothScroll();
    new PageTransitions();
	}

  window.addEventListener('load', function(){
    init();
  });

}());
