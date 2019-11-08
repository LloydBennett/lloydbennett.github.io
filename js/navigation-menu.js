function NavigationMenu(parent, parentLinks, menuTrigger, navBar) {
  this.parent = parent;
  this.parentLinks = parentLinks;
  //this.parentBackground = parentBackground;
  this.navBar = navBar;
  this.menuTrigger = menuTrigger;
  this.menuIsOpen = false;
  this.isAnimating = false;

  this.init();
}

NavigationMenu.prototype = {
  checkNavigationMenuState: function(){
    this.menuIsOpen = !this.menuIsOpen;

    if(!this.isAnimating) {
      $(this.parent).toggleClass('is-open');
      $(this.menuTrigger).toggleClass('is-open');
      $(this.navBar).toggleClass('is-open');
      this.animate();
    }
  },
  animate: function() {
    var delay,
        _this = this;

    this.isAnimating = true;

    this.parentLinks.forEach(function(elem, index) {
      _this.menuIsOpen? delay = (100 * index) + 200 : delay = 90 * index;

      setTimeout(function(){
        $(elem).toggleClass('appear');
      }, delay);

    });

    setTimeout(function(){
      _this.isAnimating = false;
    }, 400);

    // this.parentBackground.bind('webkitTransitionEnd', function(){
    //   setTimeout(function(){
    //     _this.isAnimating = false;
    //   }, 400);
    // });

  },
  addEvents: function() {
    var _this = this;
    this.menuTrigger.addEventListener('click', () => {
      _this.checkNavigationMenuState();
    });
  },
  init: function() {
    console.log('this is working');
    this.addEvents();
  }
}
