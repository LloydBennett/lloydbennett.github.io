function NavigationMenu(parent, parentLinks, menuTrigger, navBar) {
  this.parent = parent;
  this.parentLinks = parentLinks;
  this.navBar = navBar;
  this.menuTrigger = menuTrigger;
  this.menuIsOpen = false;
  this.subMenuOpen = false;
  this.isAnimating = false;
  this.body = $('[data-body]');
  this.subMenuTrigger = document.querySelector('[data-toggle-sub-menu]');
  this.closeSubMenuTrigger = document.querySelector('[data-close-submenu]');
  this.metaFrame = document.querySelector('[data-meta-frame]');
  this.subMenu = document.querySelector('[data-sub-menu]');
  this.mainMenu = document.querySelector('[data-main-menu]');
  this.logo = document.querySelector('[data-logo]');
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
    let _this = this;
    this.menuTrigger.forEach((el) => {
      el.addEventListener('click', () => {
        _this.checkNavigationMenuState();
      });
    });

    this.subMenuTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      this.toggleSubMenu(this);
    });

    this.closeSubMenuTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      this.toggleSubMenu(this);
    });
  },
  toggleSubMenu:(_this) => {
    _this.subMenuOpen = !_this.subMenuOpen;
    _this.metaFrame.classList.toggle('flip-frame');
    _this.subMenu.classList.toggle('appear');
    _this.mainMenu.classList.toggle('hide');
    _this.closeSubMenuTrigger.classList.toggle('appear');
    _this.logo.classList.toggle('hide');
    console.log(_this.subMenuOpen);
  },
  smoothScrolling: scrollToSection,
  init: function() {
    this.addEvents();
  }
}
