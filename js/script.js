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

	
	/*function navigateToPage(pageURL) {

		$.get(pageURL)

			.done(function(data) {
				console.log('it is working!');
				var container = document.createElement("div"),
					markup = container.innerHTML = data,
					oldContent = $('.dynamic').first(),
					fragment = $(markup).find('.dynamic');
					fragment.css('display', 'none');

					$('.wrapper').html($(fragment));

					oldContent.fadeOut('500', function() {
						$(fragment).fadeIn('500');
						console.log(fragment);
						oldContent.remove();
					});
		
				if(!id == "next-project") {
				}
			})

	}

	function pageLoading(event) {
		
		if(Modernizr.history) {
			event.preventDefault();

			var pageURL = $(this).attr('href'),
			elementId = $(this).attr('id');

			window.history.pushState({path:pageURL},'',pageURL);

			navigateToPage(elementId, pageURL);
		}
	}

	var _popStateEventCount = 0;
	
	$(window).on('popstate', function (e) {
 
    	this._popStateEventCount++;
 
    	if ($.browser.webkit && this._popStateEventCount == 1) {
        	return;
    	}
    
    	navigateToPage(window.location.href);
	});*/



	
  	$(function(){

		$menuIcon.on('click', navigationMenu);
		scrollTo($($ctaButton));
		scrollTo($('#message-me'));

		$('.ajaxLoad').on('click', pageLoading);
		
  	});

})(jQuery);
