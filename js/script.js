(function(){

	/*
	 Global Variables
	 */

  var $body = $('body'),
      $contentWrapper =  $('.wrapper'),
      $htmlBody = $("html, body"),
      $dynamicSection = $('.dynamic');

  var domVariables = function(){
    return {
      $navMenu: $('[data-nav-menu]'),
      $navMenuBg: $('[data-nav-menu] .nav-menu-bg'),
      $animateScrollLinks: $('[data-animate-scroll]'),
      $button: $('.button'),
      $hoverBg: $('.button-bg-hover'),
      $menuIcon: $('[data-toggle-menu]'),
      $navBar: $('.nav-bar'),
      $navLinks: $('[data-nav-menu-link]')
    }
  }
	
	/*
	Initialising all the functions
	in our program.
	 */

	function init() {
		addEvents(domVariables());
	}

  function onFocus() {
    $(this).removeClass('setPos');
    $(this).addClass('hover');
  }

  function offFocus() {
    $(this).removeClass('hover');
    $(this).addClass('setPos');
  }

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

	function addEvents(vars) {
    console.log('heyy!!');

    vars.$animateScrollLinks.on('click', function(){
      var _this = this;
      animatedScroll(event, _this);
    });
    new NavigationMenu(vars.$navMenu, vars.$navLinks, vars.$navMenuBg, vars.$menuIcon, vars.$navBar);
    vars.$button.hover(onFocus, offFocus);
    $contentWrapper.on('click', '[data-page-transition]', isHistoryAPISupported);
	}

	/*
	 // load new page requested content and replaces with old content,
	 	whilst changing the url in the address bar.
	 */
  function animateToPage(pageURL, animationType) {
    $contentWrapper.addClass('fadeOut');

    setTimeout(function(){
      $dynamicSection.load(pageURL+' .dynamic > *', function(event){
				$body.scrollTop(0);
        $contentWrapper.html($dynamicSection).removeClass('fadeOut');
			 	if (pageURL != window.location) {
          window.history.pushState({path:pageURL},'',pageURL);
          init();
        }
      });

    }, 1000);
  }

	function isHistoryAPISupported(event) {
		event.preventDefault();
    event.stopPropagation();
		var pageURL = getPageURL($(this));
    var pageAnimationType = getPageTransitionType($(this));
		animateToPage(pageURL, pageAnimationType);
  }

  function getPageURL(element) {
    return $(element).attr('href');
  }

  function getPageTransitionType(element){
    return $(element).data('page-transition');
  }

  $(window).on('popstate', function(event) {
    var newPage = location.pathname;
    if (event.state) navigateToPage(newPage);
  });


	$(function(){
		init();
	});

}());
