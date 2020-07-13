class NavigationMenu {
  constructor() {
    this.navTl = new TimelineLite();
    this.parent = document.querySelector('[data-nav-menu]');
    this.parentLinks = document.querySelectorAll('[data-nav-menu-link]');
    this.navBar = this.parent.querySelector('[data-nav-bar]');
    this.menuTrigger = document.querySelectorAll('[data-toggle-menu]');
    this.parentBg = this.parent.querySelector('[data-nav-menu-bg]');
    this.navAsideOverlay = this.parent.querySelector('[data-nav-aside-overlay]');
    this.navAsideImage = this.parent.querySelector('[data-nav-aside-image]');
    this.menuIsOpen = false;
    this.subMenuOpen = false;
    this.isAnimating = false;
    this.body = document.body;
    this.subMenuTrigger = document.querySelector('[data-toggle-sub-menu]');
    this.closeSubMenuTrigger = document.querySelector('[data-close-submenu]');
    this.metaFrame = document.querySelector('[data-meta-frame]');
    this.subMenu = document.querySelector('[data-sub-menu]');
    this.mainMenu = document.querySelector('[data-main-menu]');
    this.logo = document.querySelector('[data-logo]');
    this.init();
  }

  init() {
    this.addEvents();
  }

  checkNavigationMenuState() {
    this.menuIsOpen = !this.menuIsOpen;
    console.log('heyy!');

    if(!this.isAnimating) {
      this.body.classList.toggle('no-scrolling');
      this.parent.classList.toggle('is-open');
      this.navBar.classList.toggle('is-open');
      this.animate();
      //if(this.subMenuOpen) this.toggleSubMenu(this);
    }
  }

  addEvents() {
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
  }

  animate () {
    this.isAnimating = true;

    this.parentBg.addEventListener('transitionend', () => {
      this.navTl.to(this.navBar, 0.4, { opacity: "1" });
      this.showNavLinks();
    });

    // get all the nav links
    // loop through the title mask spans
    // animate each title mask span
  }

  showNavLinks() {
    var delay,
        _this = this;

    this.parentLinks.forEach(function(elem, index) {
      var elemChild = elem.querySelectorAll('.title-mask span');

      if(elem.hasAttribute('data-scroll-to-bottom') && _this.menuIsOpen) {
        elem.addEventListener('click', function(e) {
          this.checkNavigationMenuState();
          this.smoothScrolling(e, this);
        });
      }

      console.log(elemChild);

      elemChild.forEach((item, i) => {
        //_this.menuIsOpen? delay = 150 * index : delay = 300;
        delay = 150 * index;

        setTimeout(function() {
          item.classList.toggle('appear');
          console.log(index + ":" + delay);
        }, delay);
      });

      // if(index === _this.parentLinks.length - 1) {
      //   elem.addEventListener('transitionend', () => {
      //     setTimeout(function() {
      //       _this.isAnimating = false;
      //     }, 400);
      //   });
      // }
    });
  }

  toggleSubMenu(_this) {
    _this.subMenuOpen = !_this.subMenuOpen;
    _this.metaFrame.classList.toggle('flip-frame');
    _this.subMenu.classList.toggle('appear');
    _this.mainMenu.classList.toggle('hide');
    _this.closeSubMenuTrigger.classList.toggle('appear');
    _this.logo.classList.toggle('hide');
    console.log(_this.subMenuOpen);
  }
}

NavigationMenu.prototype = {
  smoothScrolling: scrollToSection
}
