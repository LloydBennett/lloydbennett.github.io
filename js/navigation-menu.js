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
    this.initializedMenu = false;
    this.init();
  }

  init() {
    this.addEvents();
    this.checkHeightOfMenus();
  }

  checkNavigationMenuState() {
    this.menuIsOpen = !this.menuIsOpen;

    if(!this.isAnimating) {
      this.body.classList.toggle('no-scrolling');
      this.parent.classList.toggle('is-open');
      this.navBar.classList.toggle('is-open');
      this.animate();
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

  checkHeightOfMenus() {
    let subMenu = this.subMenu;
    let mainMenu = this.mainMenu;

    if (subMenu.offsetHeight < mainMenu.offsetHeight) {
      subMenu.style.height = `${mainMenu.offsetHeight}px`;
    }
  }

  animate() {
    let _this = this;
    let duration = 620;
    this.isAnimating = true;

    if(this.menuIsOpen) {
      setTimeout(() => {
        this.showNavLinks();
        this.navBar.classList.add('appear');
      }, duration);
    }
    else {
      this.showNavLinks();
      this.navBar.classList.remove('appear');
    }
  }

  showNavLinks() {
    var delay,
        _this = this;

    this.parentLinks.forEach((elem, index) => {
      var elemChild = elem.querySelectorAll('.title-mask span');

      if (!_this.initializedMenu) {
        // add mouse over event

        if(elem.hasAttribute('data-scroll-to-bottom')) {
          _this.initializedMenu = true;

          elem.addEventListener('click', (e) => {
            _this.checkNavigationMenuState();
            _this.smoothScrolling(e, this);
          });
        }
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
          _this.isAnimating = false;
        });
      }
      setTimeout(() => {
        e.classList.toggle('appear');
      }, 200);
    });

    if(this.subMenuOpen) {
      setTimeout(() => {
        this.toggleSubMenu(this);
      }, 600);
    }
  }

  toggleSubMenu(_this) {
    let delay = 50;
    let subMenu = _this.subMenu;
    let mainMenu = _this.mainMenu;
    let mainMenuListItems = mainMenu.querySelectorAll('.nav-menu__list-item');
    let subMenuListItems = subMenu.querySelectorAll('.nav-menu__list-item');
    let socialMedia = document.querySelector('.nav-menu__socials');

    let showSubMenuLinks = (nodeList, delay, className, parentNode = null, afterElement = null) => {
      nodeList.forEach((e, i) => {
        setTimeout(() => {
          e.classList.toggle(className);

          if(i === nodeList.length - 1) {
            if(parentNode != null) {
              parentNode.classList.toggle(className);
            }

            if(afterElement != null) {
              afterElement.classList.toggle('appear');
            }
          }
        }, delay * i);
      });
    };

    _this.subMenuOpen = !_this.subMenuOpen;

    _this.closeSubMenuTrigger.classList.toggle('appear');
    _this.logo.classList.toggle('hide');
    _this.metaFrame.classList.toggle('flip-frame');

    showSubMenuLinks(mainMenuListItems, delay, "hide", _this.mainMenu, _this.subMenu);
    showSubMenuLinks(subMenuListItems, delay, "appear");
  }
}

NavigationMenu.prototype = {
  smoothScrolling: scrollToSection
}
