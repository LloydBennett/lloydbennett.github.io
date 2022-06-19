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
    this.navAsideWrapper = this.parent.querySelector('[data-nav-aside-image-wrapper]');
    this.heroNavBar = document.querySelector('[data-nav-bar-hero]');
    this.body = document.body;
    this.subMenuTrigger = document.querySelector('[data-toggle-sub-menu]');
    this.closeSubMenuTrigger = document.querySelector('[data-close-submenu]');
    this.metaHr = document.querySelector('[data-meta-menu-hr]');
    this.metaFrame = document.querySelector('[data-meta-frame]');
    this.subMenu = document.querySelector('[data-sub-menu]');
    this.subMenuLinks = this.subMenu.querySelectorAll('.nav-menu__sub-item');
    this.mainMenu = document.querySelector('[data-main-menu]');
    this.logo = document.querySelector('[data-logo]');
    this.navSideImage = document.querySelectorAll('[data-nav-aside-image]');
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
  }

  initAnimation() {
    if(!this.isAnimating) {
      this.body.classList.toggle('no-scrolling');
      this.parent.classList.toggle('is-open');
      this.navBar.classList.toggle('is-open');
      this.heroNavBar.classList.toggle('is-sticky');
      this.animate();
    }
  }

  addEvents() {
    this.menuTrigger.forEach((el) => {
      el.addEventListener('click', () => {
        this.checkNavigationMenuState();
        this.initAnimation();
      });
    });

    // this.subMenuTrigger.addEventListener('click', (e) => {
    //   e.preventDefault();
    //   this.toggleSubMenu(this);
    // });
    //
    // this.closeSubMenuTrigger.addEventListener('click', (e) => {
    //   e.preventDefault();
    //   this.toggleSubMenu(this);
    // });
    //
    // this.subMenuLinks.forEach((el) => {
    //   el.addEventListener('mouseover', () => {
    //     this.showProjectImg(el);
    //   });
    //
    //   el.addEventListener('mouseleave', () => {
    //     this.showProjectImg();
    //   });
    // });

    this.parentLinks.forEach((el) => {
      el.addEventListener('mouseover', (e) => {
        this.parentLinks.forEach(element => element.classList.add("nav-menu-link--inactive"));
        el.classList.remove("nav-menu-link--inactive");
      });

      el.addEventListener('mouseleave', (e) => {
        this.parentLinks.forEach(element => element.classList.remove("nav-menu-link--inactive"));
      });
    });

  }

  showProjectImg(target) {
    let link = target? target.querySelector('a') : null;
    let projectLink = target? link.getAttribute('data-nav-menu-link') : null;

    this.navSideImage.forEach((item, i) => {
      let currentDataVal = item.getAttribute('data-nav-aside-image');

      if(currentDataVal === projectLink ) {
        item.classList.add('nav-menu-image--active');
      }
      else {
        item.classList.remove('nav-menu-image--active');
      }
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
    this.isAnimating = true;

    this.navTl.to(this.parentBg, {
      width: '100%',
      ease: Power2.easeOut,
      duration: 0.65
    });

    this.navTl.to(this.navAsideOverlay,
      { x: 0, ease: Power2.easeOut, duration: 0.5 }, "enter")
      .to(this.navAsideOverlay, {
        opacity: 0,
        ease: Power2.easeOut,
        duration: 0.5,
        delay: 0.5
      });

    this.navTl.to(this.navAsideWrapper, { opacity: 1, ease: Power2.easeOut, duration: 0.4 }, "-=0.8");

    this.showNavLinks();



    // if(this.menuIsOpen) {
    //   setTimeout(() => {
    //     this.showNavLinks();
    //     this.navBar.classList.add('appear');
    //   }, duration);
    // }
    // else {
    //   this.showNavLinks();
    //   this.navBar.classList.remove('appear');
    // }
  }

  showNavLinks() {

    this.parentLinks.forEach((elem, index) => {
      let elemChild = elem.querySelectorAll('.title-mask span');

      this.navTl.to(elemChild, {
        transform: 'translateY(0) skew(0)',
        ease: Power2.easeOut,
        duration: 0.4,
        stagger: {
          amount: 0.3
        }
      }, "enter");
    });

    this.navTl.fromTo(this.metaHr,
      { width: '0'} ,
      { width: '100%', ease: Power2.easeOut, duration: 0.4 }, "enter+=0.2"
    );

    this.navTl.fromTo(this.metaFrame,
      { y: 100 },
      { y: 0, ease: Power2.easeOut, duration: 0.3 },
    "enter+=0.4");

    this.navTl.fromTo(this.socialMediaLinks,
      { y: 100 },
      {
        y: 0,
        ease: Power2.easeOut,
        duration: 0.3,
        onComplete: () => { this.isAnimating = false; console.log('we done here!!')}
      }, "enter+=0.4");


    this.navTl.fromTo(this.navBar, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: Power2.easeOut }, "enter");


      // if (!_this.initializedMenu) {
      //   // add mouse over event
      //
      //   if(elem.hasAttribute('data-scroll-to-bottom')) {
      //     _this.initializedMenu = true;
      //
      //     elem.addEventListener('click', (e) => {
      //       _this.checkNavigationMenuState();
      //       _this.smoothScrolling(e, this);
      //     });
      //   }
      // }

    // if(this.subMenuOpen) {
    //   setTimeout(() => {
    //     this.toggleSubMenu(this);
    //   }, 600);
    // }
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
