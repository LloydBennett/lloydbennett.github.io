(function(){

  var input = document.querySelectorAll('[data-input-field]');
  var heroCta = document.querySelectorAll('[data-hero-cta]');
  var buttonLine = document.querySelector('[data-remove-class]');
  var htmlBody = document.querySelector('html, body');

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
    e.stopPropagation();

    var destination = this.getAttribute("href");



    $(htmlBody).animate({
      scrollTop: $(destination).offset().top
    }, 600);

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

  window.addEventListener('load', function(){
    init();
  });

}());
