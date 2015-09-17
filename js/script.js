//variables
var $navMenu = $('.nav__list'),
    $ctaButton = $('.btn--primary'),
    $ctaTarget = $('#cta-target');
//call to action scrolling functionality
function scrollTo(handler, target){
  handler.on('click', function(){
    $("html, body").animate({
        scrollTop: target.offset().top
    }, 600);
  });
}

//dom ready
$(function(){

  //mobile menu
  $('.nav__menu-icon').on('click', function(){
    $('.nav__list').slideToggle(300);
  });
  scrollTo($ctaButton, $ctaTarget);
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
