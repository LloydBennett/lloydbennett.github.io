(function(){

  var input = document.querySelectorAll('[data-input-field]');
  var heroCta = document.querySelectorAll('[data-hero-cta]');
  console.log(heroCta);

  function updateInputContent() {
    let inputValue = this.value;

    if (inputValue === "") {
      this.classList.remove("has-input");
    } else {
      this.classList.add("has-input");
    }
  }

  function init() {

    console.log('heyyy');
    input.forEach(function(element, index) {
      element.addEventListener("focusout", updateInputContent);
    });


	}

  window.load = function(){
    init();
  }

}());
