(function($){
  //'use strict';
  
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
			var $this = $(this);
				
		  	
	    	if(handler.hasClass('list-link')) {

				target = $this.find('a').attr('href');

				if($navMenu.hasClass('is-open')){
					$navMenu.removeClass('is-open');
					$menuIcon.removeClass('is-open');
					$body.toggleClass('overflow-hidden');
				}

				
	  		} else {
	  			target = $this.attr('href');
	  		}
			
			
			$body.animate({
				  scrollTop: $(target).offset().top
			}, 600);
		  	

		} // end of handler function
		handler.on('click', handlerFunction);
	}

	
	function navigateToPage(pageURL) {

		var section = $('.dynamic');

		
		$('body').addClass('fadeOut');


		setTimeout(function(){

			section.load(pageURL+' .dynamic > *', function(event){
	    	// load new content and replace <main> content with the new one
		      	$('.wrapper').html(section);
		      	console.log('its working bro!');
		      	//...
		      	$('body').scrollTop(0).removeClass('fadeOut');
		      	
				if(pageURL != window.location){
					window.history.pushState({path:pageURL},'',pageURL);
				}
			});
			
		},2000);

		
		

	}

	

	$(window).on('popstate', function() {
		var newPage = location.pathname;
    	navigateToPage(newPage);
	});

	$menuIcon.on('click', navigationMenu);

  	$(function(){

		
		scrollTo($($ctaButton));
		scrollTo($('#message-me'));

		$('.wrapper').on('click', '.ajaxLoad', function (event) {
			
			if(Modernizr.history) {
				event.preventDefault();
				var pageURL = $(this).attr('href');
				
				navigateToPage(pageURL);

				
			}
			event.stopPropagation();
		});



		
  	});

})(jQuery);
