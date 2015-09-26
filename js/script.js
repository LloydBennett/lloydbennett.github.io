//variables
var $navMenu = $('.nav__list'),
    $ctaButton = $('.btn--primary'),
    $ctaTarget = $('#cta-target');

//call to action scrolling functionality
function scrollTo(handler, target){
  /*
  we check to see whether the hander has a class of
  nav__list__link and assign nav__list__link--active to it.

  When then want to remove the the nav__list__link--active class
  when another link has been clicked.

  */
  handler.on('click', function(event){
    event.preventDefault();
    $("html, body").animate({
        scrollTop: target.offset().top
    }, 600);
    $(this).removeClass('nav__list__link--active');

    if(handler.hasClass('nav__list__link')){
      $(this).addClass('nav__list__link--active');

      setTimeout(function(){
        handler.removeClass('nav__list__link--active')
      }, 5000);
    }
  });
}

//field has input checker
function fieldFocusOut(formField){

  formField.focusout(function(){
    var $inputVal = $(this).val();

    if($inputVal === ""){
      $(this).removeClass('has-input');
    }else{
      $(this).addClass('has-input');
    }

  });
}


//dom ready
$(function(){

  //mobile menu
  $('.nav__menu-icon').on('click', function(){
    $('.nav__list').slideToggle(300);
  });

  window.onscroll = function(){
    if(this.pageYOffset > 400){
      $('.nav').addClass('nav--scrolling');
      $('.logo img').attr('src', '../images/logoblue.svg');
    }else {
      $('.nav').removeClass('nav--scrolling');
      $('.logo img').attr('src', '../images/logowhite.svg');
    }
  }



  //function calls
  scrollTo($ctaButton, $ctaTarget);
  scrollTo($('#contactme'), $('.footer__upper .block__title'));
  scrollTo($('#aboutme'), $('.myinfo'));
  scrollTo($('#contact'), $('.footer__upper .block__title'));
  scrollTo($('#portfolio'), $ctaTarget);
  fieldFocusOut($('.input__group input'));
  fieldFocusOut($('.input__group textarea'));
});

/* Preparation:
   - Problem: We dont have a menu for desktop screens.
   We also want to avoid using any positioning hacks on the styling of
   the menu.

   - Solution: Use JavaScript to re-position the menu html code into
   the header when the website is viewed on larger screens and then moved back
   to its orginal place for mobile screens.
*/

/*Plan:
 - If statement checking to see if the browser width is than 960px
 - If the condition is true we want to get the navigation menu ul
 - Append the navigation to the header*/








if($(window).width() >= 960){
  $navMenu.appendTo('.nav .wrapper');
}

$(window).resize(function(){
  if($(this).width() >= 960){
    $navMenu.appendTo('.nav .wrapper');
  }
  else {
    $navMenu.insertBefore('.header__masthead');
  }

});


/*
- Check whether the browser window has been resized less than 960px at any point after
the browser window width has been 960px and over.
 - Check the browser width less than 960
 - Check if the navMenu parent is header*/
/*if ($(window).resize().width < 960){ //&& $('.wrapper').has(navMenu)){
  //navMenu.insertBefore('.header');
  console.log('Hi guys');
}*/


/*
 - If the condition is true then we want to move the navigation menu ul back
 to its orginal place.

 */
