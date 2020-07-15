class NavigationMenu {
  constructor() {
    this.navTl = new TimelineLite();
    this.parent = document.querySelector('[data-nav-menu]');
    this.parentLinks = document.querySelectorAll('[data-nav-menu-link]');
    this.navBar = this.parent.querySelector('[data-nav-bar]');
    this.socialMediaLinks = this.parent.querySelectorAll('.nav-menu__socials .link');
    this.menuTrigger = document.querySelectorAll('[data-toggle-menu]');
    this.parentBg = this.parent.querySelector('[data-nav-menu-bg]');
    this.navAsideOverlay = this.parent.querySelector('[data-nav-aside-overlay]');
    this.navAsideImage = this.parent.querySelector('[data-nav-aside-image]');
    this.body = document.body;
    this.subMenuTrigger = document.querySelector('[data-toggle-sub-menu]');
    this.closeSubMenuTrigger = document.querySelector('[data-close-submenu]');
    this.metaHr = document.querySelector('[data-meta-menu-hr]');
    this.metaFrame = document.querySelector('[data-meta-frame]');
    this.subMenu = document.querySelector('[data-sub-menu]');
    this.mainMenu = document.querySelector('[data-main-menu]');
    this.logo = document.querySelector('[data-logo]');
    this.menuIsOpen = false;
    this.subMenuOpen = false;
    this.isAnimating = false;
    this.init();
  }

  init() {
    this.addEvents();
  }

  checkNavigationMenuState() {
    this.menuIsOpen = !this.menuIsOpen;
    console.log(`Animation state: ${this.isAnimating}`);
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

  animate() {
    this.isAnimating = true;
    this.showNavLinks();
    this.navBar.classList.toggle('appear');
    //this.showElements();
    // let showElements = () => {
    //   this.showNavLinks();
    // }

    // if(this.menuIsOpen) {
    //   this.parentBg.addEventListener('transitionend', () => {
    //     this.showElements();
    //   });
    // }
    // else {
    //   this.showNavLinks();
    //   this.navTl.to(this.navBar, 0.4, { opacity: "0" });
    // }
  }
  showNavLinks() {
    var delay,
        _this = this;
    console.log('show nav links');
    this.parentLinks.forEach((elem, index) => {
      var elemChild = elem.querySelectorAll('.title-mask span');

      if(elem.hasAttribute('data-scroll-to-bottom') && _this.menuIsOpen) {
        elem.addEventListener('click', function(e) {
          _this.checkNavigationMenuState();
          _this.smoothScrolling(e, this);
        });
      }

      elemChild.forEach((item, i) => {
        _this.menuIsOpen? delay = 20 * i : delay = 0;

        setTimeout(function() {
          item.classList.toggle('appear');
        }, delay);
      });

      this.metaHr.classList.toggle('appear');
      this.metaFrame.classList.toggle('appear');
    });

    this.socialMediaLinks.forEach((e, i) => {
      if(i === this.socialMediaLinks.length - 1) {
        e.addEventListener('transitionend', () => {
          // setTimeout(function() {
          //   _this.isAnimating = false;
          // }, 400);
          _this.isAnimating = false;
        });
      }
      setTimeout(() => {
        e.classList.toggle('appear');
      }, 200);

    });
  }

  // showElements() {
  //   // console.log(this);
  //   this.showNavLinks();
  //   this.navTl.to(this.navBar, 0.4, { opacity: "1" });
  // }

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
