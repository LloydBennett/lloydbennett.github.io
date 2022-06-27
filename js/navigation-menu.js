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
    this.subMenuTrigger = document.querySelectorAll('[data-toggle-sub-menu]');
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

    this.subMenuTrigger.forEach((el, i) => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('heyyy!!');
        this.toggleSubMenu();
      });
    });


    this.subMenuLinks.forEach((el) => {
      el.addEventListener('mouseover', () => {
        this.showProjectImg(el);
      });

      el.addEventListener('mouseleave', () => {
        this.showProjectImg();
      });
    });

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

    if(!this.menuIsOpen) {
      this.navTl.clear();

      if(this.subMenuOpen) {
        setTimeout(() => {
          this.toggleSubMenu(this);
          this.isAnimating = false;
        }, 600);
      }
      return;
    }


    this.navTl.fromTo(this.parentBg,
      { width: 0 },
      { width: '100%', ease: Power2.easeOut, duration: 0.65 });

    this.navTl.fromTo(this.navAsideOverlay,
      { x: "100%" }, { x: 0, ease: Power2.easeOut, duration: 0.5 }, "enter")
      .fromTo(this.navAsideOverlay, { opacity: 1 }, { opacity: 0, ease: Power2.easeOut, duration: 0.5, delay: 0.5 });

    this.navTl.fromTo(this.navAsideWrapper, { opacity: 0 }, { opacity: 1, ease: Power2.easeOut, duration: 0.4 }, "-=0.8");

    this.showNavLinks();
  }

  showNavLinks() {
    this.parentLinks.forEach((elem, index) => {
      let elemChild = elem.querySelectorAll('.title-mask span');

      this.navTl.fromTo(elemChild,
        { y: 100, skewY: 4},
        {
        y: 0,
        skewY: 0,
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
  }

  toggleSubMenu() {
    let closeSubMenuTrigger = document.querySelector('[data-back]');

    this.subMenuOpen = !this.subMenuOpen;

    closeSubMenuTrigger.classList.toggle('appear');
    this.logo.classList.toggle('hide');
    this.metaFrame.classList.toggle('flip-frame');
    this.subMenu.classList.toggle('appear');
    this.mainMenu.classList.toggle('hide');
  }
}
