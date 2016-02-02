(function($){
  //'use strict';
  //variables
  var $navMenu = $('.nav__list'),
      $ctaButton = $('.btn--primary'),
      $ctaTarget = $('#cta-target'),
      $body = $("html, body"),
      $menuIcon = $('.nav__menu-icon');


      function mobileMenu(event){
        $navMenu.toggleClass('is-open');
        $menuIcon.toggleClass('is-open');
        /*$('body').toggleClass('nav-is-open');*/
      }

      //call to action scrolling functionality
      function scrollTo(handler, target){

        function handlerFunction(event){
          event.preventDefault();
          //checks to see whether the handler is a nav__list__link
          if(handler.hasClass('nav__list__link')){
            var $this = $(this),
            navLinkHref = $this.find('a').attr('href');

            /* checks to see if the user is not on the homepage when clicking on
            the .nav__list__link handler, if not then user is re-directed to the
            homepage and the target location */
            if(window.location.pathname !== "/"){
              window.location.hash = navLinkHref;
              window.location.pathname = "/";
              $this.addClass('nav__list__link--active');

            }
            else{
              $('.nav__list__link').removeClass('nav__list__link--active');
              $this.addClass('nav__list__link--active');
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
      }

      //field has input checker
      function fieldFocusOut(formField){

        formField.focusout(function(){
          var $inputVal = $(this).val();

          if($inputVal === ""){
            $(this).removeClass('has-input');
          }
          else{
            $(this).addClass('has-input');
          }

        });
      }
      
      function addRemoveLinkClass(event){

        if($('.nav__list__link').hasClass('nav__list__link--active')){
          var navLinkHref = $('.nav__list__link').find('a').attr('href');

          console.log(navLinkHref);
          // want to check if the window is pass the position of its href

        }
      }

      function highLightItem(event){
        $('.search-icon').addClass('is--searching');
      }


      //dom ready
      $(function(){
        var $footerTitle = $('.footer__upper .block__title');

          //mobile menu
          $menuIcon.on('click', mobileMenu);
          $(window).on("scroll", addRemoveLinkClass);
          $('input.input__search').focusout(function(){
            $('.search-icon').removeClass('is--searching');
          });
          $('input.input__search').focus(highLightItem);

          //function calls
          scrollTo($ctaButton, $ctaTarget);
          scrollTo($('#contactme'), $footerTitle);
          scrollTo($('#aboutme'), $('.myinfo'));
          scrollTo($('#contact'), $footerTitle);
          scrollTo($('#portfolio'), $ctaTarget);
          fieldFocusOut($('.input__group input'));
          fieldFocusOut($('.input__group textarea'));
      });

})(jQuery);
