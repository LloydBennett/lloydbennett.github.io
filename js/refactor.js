(function(){

	/*
	 Global Variables
	 */
	var $navMenu = $('[data-nav-menu]'),
		  $animateScrollLinks = $('[data-animate-scroll]'),
      $button = $('.button'),
		  $htmlBody = $("html, body"),
      $body = $('body'),
		  $menuIcon = $('[data-toggle-menu]'),
		  $navBar = $('.nav-bar'),
		  $navLinks = $('[data-nav-menu-link]'),
      $contentWrapper = $('.wrapper'),
      $dynamicSection = $('.dynamic'),
		  menuIsOpen = false;

	/*
	Initialising all the functions
	in our program.
	 */

	function init() {
		addEvents();
	}

  // function onHover {
  //   $button.css({})
  // }

  function offFocus($this) {
    var hoverBg = $this.find('.button-bg-hover');
    hoverBg.animate({
    transform : -100,
  }, 500, function() {

  })
    $($this).find('.button-bg-hover').css({ "-webkit-transform":"translate(100%,0)"});
    // $buttonHover.css({ 'transform' : 'translate("100%")'});
  }

  // function offFocus($this) {
  //   //var hoverBg = $this.find('.button-bg-hover');
  //
  //   $($this).find('.button-bg-hover').css({ "-webkit-transform":"translate(100%,0)"});
  //   // $buttonHover.css({ 'transform' : 'translate("100%")'});
  // }
	/*
	 Checks whether the navigation
	 menu is opened or closed
	 */

	function checkNavigationMenuState() {
		menuIsOpen = !menuIsOpen;
		//$body.toggleClass('overflow-hidden');

		$navMenu.toggleClass('is-open');
		$menuIcon.toggleClass('is-open');
		$navBar.toggleClass('is-open');
		animateNavLinks(menuIsOpen);
	}

    /*
     Sets isOpen to false
     removes animation css classes to
     nav menu and icon for open state
     */

	function animateNavLinks(isOpen) {
		var delay;

    $navLinks.each(function(index, elem) {
      isOpen? delay = (150 * index) + 400 : delay = 90 * index;

      setTimeout(function(){
        $(elem).toggleClass('appear');
      }, delay);

    });
  }

	function animatedScroll(event, $this){
		event.preventDefault();
		event.stopPropagation();

	  var scrollDestination = "#" + $($this).attr('href');

    console.log($(scrollDestination).offset().top);
    //console.log($(scrollDestination));
		//if(menuIsOpen) checkNavigationMenuState();

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
    $animateScrollLinks.on('click', function(){
      var _this = this;
      animatedScroll(event, _this);
    });
    // $button.mouseenter( function() {
    //   var _this = this;
    //   offFocus(_this);
    // });
    $contentWrapper.on('click', '.ajaxLoad', isHistoryAPISupported);
	}

	/*
	 // load new page requested content and replaces with old content,
	 	whilst changing the url in the address bar.
	 */
    function navigateToPage(pageURL) {
        $contentWrapper.addClass('fadeOut');

		setTimeout(function(){
            $dynamicSection.load(pageURL+' .dynamic > *', function(event){
				$body.scrollTop(0);
                $contentWrapper.html($dynamicSection).removeClass('fadeOut');
			 	if (pageURL != window.location) window.history.pushState({path:pageURL},'',pageURL);
            });

        }, 1000);

    }

	function isHistoryAPISupported(event) {
		event.preventDefault();
        event.stopPropagation();
		var pageURL = $(this).attr('href');
		navigateToPage(pageURL);
    }

    $(window).on('popstate', function(event) {
        var newPage = location.pathname;
        if (event.state) navigateToPage(newPage);
    });


	$(function(){
    //console.log(this);
    //$(this).scrollTop(0);
		init();
	});

}());
