class Loader {
  constructor(){
    this.loaderTl = new TimelineLite();
    this.heroTitle = document.querySelectorAll('[data-hero-title]');
    this.heroMobileImgOverlay = document.querySelector('[data-home-mobile-image] .overlay');
    this.heroMobileImg = document.querySelector('[data-home-mobile-image] img');
    this.strips = document.querySelectorAll('[data-strips]');
    this.heroContentGroup = document.querySelectorAll('[data-hero-content-group]');
    this.navBar = document.querySelector('[ data-nav-bar-hero ]');
    this.metaInfo = document.querySelector('[data-meta-info]');
    this.loader = document.querySelector('[ data-loader ]');

    this.init();
  }

  init() {
    this.animateLoader();
  }

  animateLoader() {
    let homePage = document.getElementById('home');
    let caseStudy = document.querySelector('.casestudy');
    let heroTitleAnim = {
      y: 0,
      duration: 0.4,
      stagger: {
        amount: 0.4
      }
    }

    this.loaderTl.to(this.loader, { opacity: 0, visibility: "hidden", duration: 0.6, ease: "power2.in" });

    this.heroTitle.forEach((item, i) => {
      let letters = item.querySelectorAll('.title-mask span');

      if(homePage) {
        if(i == this.heroTitle.length - 1) {
          this.loaderTl.to(letters, heroTitleAnim, "-=0.6");
        } else {
          this.loaderTl.to(letters, heroTitleAnim, "titles");
        }
        this.loaderTl.to(this.heroMobileImgOverlay,
        {
          x: "100%",
          duration: 0.7,
          ease: "power2.inOut"
        }, "titles");
      }
      else {
        this.loaderTl.to(letters, heroTitleAnim, "titles");
      }
    });

    if(homePage) {
      this.loaderTl.fromTo(this.heroMobileImg,
        { scale: 1.2 },
        { scale: 1, duration: 0.5, ease: "power2.out"},
      "-=0.7");
    }

    this.loaderTl.fromTo(this.heroContentGroup,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4 }, "-=0.5"
    );

    this.loaderTl.fromTo(this.metaInfo, 0.6, { opacity: 0}, { opacity: 1, ease: "power2.inOut" }, "last-elements-=0.4");
    this.loaderTl.fromTo(this.navBar, 0.6, { opacity: 0 }, { opacity: 1, ease: "power2.inOut" }, "last-elements-=0.4");
  }
}

window.addEventListener('load', (event) => {
  new Loader();
});
