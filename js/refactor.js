(function(){
	/*
	 Global Variables
	 */
	var $navMenu = $('.nav-menu'),
		$ctaButton = $('.cta-button'),
		$htmlBody = $("html, body"),
        $body = $('body'),
		$menuIcon = $('#open-menu'),
		$navLinks = $('.list-link'),
        $contentWrapper = $('.wrapper'),
        $dynamicSection = $('.dynamic');

	/*
	Initialising all the functions
	in our program.
	 */

	function init() {
		addEvents();
	}

	/*
	 Checks whether the navigation
	 menu is opened or closed
	 */

	function checkNavigationMenuState() {
		$body.toggleClass('overflow-hidden');
		$navMenu.toggleClass('is-open');
		$menuIcon.toggleClass('is-open');
		animateNavLinks();
	}

    /*
     Sets isOpen to false
     removes animation css classes to
     nav menu and icon for open state
     */

	function animateNavLinks() {
		var delay;
        $navLinks.each(function(index, elem) {
            delay = 90 * index;
            $(elem).on('click', 'a', animatedScroll);
            setTimeout(function(){
                $(elem).toggleClass('appear');
            }, delay);
        });
    }

	function animatedScroll(event){
		event.preventDefault();

		var $this = $(this),
			scrollDestination = ($(event.target).hasClass('list-link')) ?
							$this.find('a').attr('href') : $this.attr('href');

		checkNavigationMenuState();
		$htmlBody.animate({
			scrollTop: $(scrollDestination).offset().top
		}, 600);
	}

	/*
	 Initialising all the events
	 in our program.
	 */

	function addEvents() {
		$menuIcon.on('click', checkNavigationMenuState);
        $ctaButton.on('click', animatedScroll);
        $contentWrapper.on('click', '.ajaxLoad', isHistoryAPISupported);
	}

    function navigateToPage(pageURL) {
        $contentWrapper.addClass('fadeOut');

		setTimeout(function(){

            $dynamicSection.load(pageURL+' .dynamic > *', function(event){
                // load new content and replace <main> content with the new one
                $body.scrollTop(0);
                $contentWrapper.html($dynamicSection).removeClass('fadeOut');
                //...
                pageURL != window.location && window.history.pushState({path:pageURL},'',pageURL);
            });

        }, 1000);

    }

    function isHistoryAPISupported(event) {

        if(Modernizr.history) {
            event.preventDefault();
            var pageURL = $(this).attr('href');
            navigateToPage(pageURL);
        }
        event.stopPropagation();
    }

    $(window).on('popstate', function(event) {
        var newPage = location.pathname;
        event.state && navigateToPage(newPage);
    });


	$(function(){
		init();
	});

}());