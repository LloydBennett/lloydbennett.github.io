(function($){
  //'use strict';
  //variables
	var $navMenu = $('.nav-menu'),
		$ctaButton = $('.cta-button'),
		$body = $("html, body"),
		$menuIcon = $('.hamburger');


	function navigationMenu(event) {
		var navItems = $('.list .list-link');
		
		$navMenu.toggleClass('is-open');
		$menuIcon.toggleClass('is-open');
		$body.toggleClass('overflow-hidden');


		navItems.each(function(index, el) {
			var duration = 300,
				delay = 90 * index;

			scrollTo($(el));

			if($navMenu.hasClass('is-open')) {
				setTimeout(function(){
					$(el).addClass('appear');
				}, delay);

			}else {
				$(el).removeClass('appear');
			}

		});

  	}

	  //call to action scrolling functionality
	function scrollTo(handler){

		function handlerFunction(event){
			event.preventDefault();
			var $this = $(this),
				target = $this.find('a').attr('href');
		  	
	    	if(handler.hasClass('list-link')){
				
				if($navMenu.hasClass('is-open')){
					$navMenu.removeClass('is-open');
					$menuIcon.removeClass('is-open');
					$body.toggleClass('overflow-hidden');
				}

				
	  		}
			
			console.log(target);
			$body.animate({
				  scrollTop: $(target).offset().top
			}, 600);
		  	

		} // end of handler function
		handler.on('click', handlerFunction);
	}

	  

  	$(function(){

		$menuIcon.on('click', navigationMenu);
		scrollTo($($ctaButton));
		scrollTo($('#message-me'));
		
  	});

})(jQuery);
