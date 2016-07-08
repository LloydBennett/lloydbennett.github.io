(function($){
  //'use strict';
  //variables
	var $navMenu = $('.nav-menu'),
		$ctaButton = $('.cta'),
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
	/*function scrollTo(handler, target){

		function handlerFunction(event){
			event.preventDefault();
			var $this = $(this)

			navLinkHref = $this.find('a').attr('href');
		  	
	    	if(handler.hasClass('list-link')){
				
				if($navMenu.hasClass('is-open')){
					$navMenu.removeClass('is-open');
					$menuIcon.removeClass('is-open');
				}

				 checks to see if the user is not on the homepage when clicking on
				the .nav__list__link handler, if not then user is re-directed to the
				homepage and the target location 
				if(window.location.pathname !== "/"){
					window.location.hash = navLinkHref;
					window.location.pathname = "/";
					$this.addClass('active');
				}
				else{
					$('.list-link').removeClass('active');
					$this.addClass('active');
					$body.animate({
					  scrollTop: target.offset().top
				  	}, 600)
				}

	  		}
			else{
				$body.animate({
					scrollTop: target.offset().top
				}, 600);
		  	}

		} // end of handler function
		handler.on('click', handlerFunction);
	}*/

	  //field has input checker
	  
  	// want to check if the window is pass the position of its href
  	/*function addRemoveLinkClass(event){

		if($('.list-link').hasClass('active')){
		  var navLinkHref = $('.list-link').find('a').attr('href');

		  

		}
  	}*/


	  //dom ready
  	$(function(){

	  //mobile menu
		$menuIcon.on('click', navigationMenu);
		/*$(window).on("scroll", addRemoveLinkClass);*/


		//function calls
		/*scrollTo($ctaButton, $ctaTarget);
		scrollTo($('#contactme'), $footerTitle);
		scrollTo($('#aboutme'), $('.myinfo'));
		scrollTo($('#contact'), $footerTitle);
		scrollTo($('#portfolio'), $ctaTarget);*/

  	});

})(jQuery);
