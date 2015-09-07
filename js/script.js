//add all functions here



$(document).ready(function(){
  //add all function calls here




  $('.nav__menu-icon').on('click', function(){
    $('.nav__list').slideToggle(300);
  });

});

if($(window).resize().width() >= 960){
  $('.nav__list').appendTo('.nav .wrapper');
}
/*else if($(window).width() < 960 && $('.nav__list').parent('.wrapper')) {
  $('.nav__list').prepend('.header');
}*/
