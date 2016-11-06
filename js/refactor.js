(function(){

	/*
	 Global Variables
	 */

	var $navMenu = $('.nav-menu'),
		$ctaButton = $('.cta-button'),
		$htmlBody = $("html, body"),
        $body = $('body'),
		$menuIcon = $('#open-menu'),
		$navLinks = $('.list-link a'),
        $contentWrapper = $('.wrapper'),
        $dynamicSection = $('.dynamic'),
		delay = 90,
		isOpen = false;

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
		(!isOpen)? openMenu() : closeMenu();
		//$body.removeClass('overflow-hidden');
	}

	/*
	 Sets isOpen to true adds
	 animation css classes to nav
	 menu and icon for open state
	 */

	function openMenu() {
		isOpen = true;
		$navMenu.addClass('is-open');
		$menuIcon.addClass('is-open');
        animateNavLinks();
	}

    /*
     Sets isOpen to false
     removes animation css classes to
     nav menu and icon for open state
     */

	function closeMenu() {
		isOpen = false;
		//$(el).removeClass('appear');
		$navMenu.removeClass('is-open');
		$menuIcon.removeClass('is-open');
	}

    /*
     Sets isOpen to false
     removes animation css classes to
     nav menu and icon for open state
     */

	function animateNavLinks() {
        $navLinks.each(function(index, elem) {
            delay *= index;
            $(elem).on('click', animatedScroll);

            setTimeout(function(){
                $(elem).addClass('appear');
            }, delay);
        });
    }


	function animatedScroll(event){
		var scrollDestination,
			$this = $(this);

		event.preventDefault();

		$(event.target).hasClass('list-link') && openMenu();
        scrollDestination = $this.attr('href');

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