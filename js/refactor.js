(function(){

	/*
	 Global Variables
	 */
	var $navMenu = $('[data-nav-menu]'),
      $navMenuBg = $('[data-nav-menu] .nav-menu-bg'),
		  $animateScrollLinks = $('[data-animate-scroll]'),
      $button = $('.button'),
		  $htmlBody = $("html, body"),
      $body = $('body'),
		  $menuIcon = $('[data-toggle-menu]'),
		  $navBar = $('.nav-bar'),
		  $navLinks = $('[data-nav-menu-link]'),
      $contentWrapper = $('.wrapper'),
      $dynamicSection = $('.dynamic');

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

	function animatedScroll(event, $this){
		event.preventDefault();
		event.stopPropagation();

	  var scrollDestination = "#" + $($this).attr('href');

    $htmlBody.animate({
		    scrollTop: $(scrollDestination).offset().top
		}, 600);
	}

	/*
	 Initialising all the events
	 in our program.
	 */

	function addEvents() {
    $animateScrollLinks.on('click', function(){
      var _this = this;
      animatedScroll(event, _this);
    });
    new NavigationMenu($navMenu, $navLinks, $navMenuBg, $menuIcon, $navBar);
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
		init();
	});

}());
