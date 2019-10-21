(function(){

  var input = document.querySelectorAll('[data-input-field]');
  var heroCta = document.querySelectorAll('[data-hero-cta]');

  function updateInputContent() {
    let inputValue = this.value;

    if (inputValue === "") {
      this.classList.remove("has-input");
    } else {
      this.classList.add("has-input");
    }
  }

  function scrollToSection(e) {
    e.preventDefault();

    console.log('heyy!!!');
  }

  function init() {

    input.forEach(function(element, index) {
      element.addEventListener("focusout", updateInputContent);
    });

    heroCta.forEach(function(element, index){
      element.addEventListener('click', scrollToSection);
      console.log(index);
    });

	}

  window.load = function(){
    init();
  }

}());
