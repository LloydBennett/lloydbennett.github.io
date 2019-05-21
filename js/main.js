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
    firstSlide.classList.add('active');

    checkWindowSize();
    $(window).resize(checkWindowSize);
	}

  $(function(){
		init();
	});

}());
