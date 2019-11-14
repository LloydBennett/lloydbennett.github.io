function NavigationMenu(parent, parentLinks, menuTrigger, navBar) {
  this.parent = parent;
  this.parentLinks = parentLinks;
  this.navBar = navBar;
  this.menuTrigger = menuTrigger;
  this.menuIsOpen = false;
  this.isAnimating = false;
  this.body = $('[data-body]');

  this.init();
}

NavigationMenu.prototype = {
  checkNavigationMenuState: function(){
    this.menuIsOpen = !this.menuIsOpen;

    if(!this.isAnimating) {
      $(this.body).toggleClass('no-scrolling');
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
      var elemChild = elem.querySelector('a');
      _this.menuIsOpen? delay = (100 * index) + 200 : delay = 300;

      if(elemChild.hasAttribute('data-scroll-to-bottom') && _this.menuIsOpen) {
        elemChild.addEventListener('click', function(e) {
          _this.checkNavigationMenuState();
          _this.smoothScrolling(e, this);
        });
      }

      if(index === _this.parentLinks.length - 1) {
        elem.addEventListener('transitionend', () => {
          setTimeout(function() {
            _this.isAnimating = false;
          }, 400);
        });
      }

      setTimeout(function() {
        $(elem).toggleClass('appear');
      }, delay);

    });

  },
  addEvents: function() {
    var _this = this;
    this.menuTrigger.addEventListener('click', () => {
      _this.checkNavigationMenuState();
    });
  },
  smoothScrolling: scrollToSection,
  init: function() {
    this.addEvents();
  }
}
