(function(){

  var slides = document.querySelectorAll("[data-slide]");
  var firstSlide = slides[0];
  var scrollifyOptions = {
    section : slides,
    scrollSpeed: 800,
    updateHash: false,
    before: function(index) {
      var activeSlide = slides[index];

      slides.forEach(function(item, index, arr) {
        item.classList.remove('active');
      });

      activeSlide.classList.add('active');
    },
    setHeights: false
  };
  var input = document.querySelectorAll('[data-input-field]');

  function updateInputContent() {
    let inputValue = this.value;

    if (inputValue === "") {
      this.classList.remove("has-input");
    } else {
      this.classList.add("has-input");
    }
  }

  function checkWindowSize(){
    if($(window).width() < 960) {
       $.scrollify.disable();

    }
    else {
      $.scrollify.enable();
      $.scrollify(scrollifyOptions);
    }
  }

  function init() {

    input.forEach(function(element, index){
      element.addEventListener("focusout", updateInputContent);
    });

    checkWindowSize();
    $(window).resize(checkWindowSize);
	}

  $(function(){
		init();
	});

}());
