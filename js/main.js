(function(){

  var input = document.querySelectorAll('[data-input-field]');
  var heroCta = document.querySelectorAll('[data-hero-cta]');
  var buttonLine = document.querySelector('[data-remove-class]');

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
    var bodyElement;
    var isSafari = navigator.vendor && navigator.vendor.indexOf('Apple') > -1 &&
               navigator.userAgent &&
               navigator.userAgent.indexOf('CriOS') == -1 &&
               navigator.userAgent.indexOf('FxiOS') == -1;
    var destination = this.getAttribute("href");

    // Scroll functionality works differently on safari

    if (isSafari) {
      bodyElement = $('body');
    }
    else {
      bodyElement = $('html, body');
    }

    $(bodyElement).animate({
      scrollTop: $(destination).offset().top
    }, 600);

  }

  function init() {
    input.forEach(function(element, index) {
      element.addEventListener("focusout", updateInputContent);
    });

    heroCta.forEach(function(element, index){
      element.addEventListener('click', scrollToSection);
    });

    buttonLine.addEventListener('animationend', () => {
      var $thisElem = event.target;
      if($thisElem.classList.contains('wow')){
        $thisElem.classList.remove('wow', 'anim-grow');
        $thisElem.setAttribute("style", "");
      };
    });
	}

  window.addEventListener('load', function(){
    init();
  });

}());
