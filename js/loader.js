class Loader {
  constructor(){
    this.loaderTl = new TimelineLite();
    this.heroTitle = document.querySelectorAll('[data-hero-title] .title-mask span');
    this.heroTitleMobile = document.querySelectorAll('[data-hero-title-mobile] .title-mask span');
    this.heroImgOverlay = document.querySelector('[data-hero-image] .overlay');
    this.heroImg = document.querySelector('[data-hero-image] img');
    this.heroImageMobile = document.querySelector('[data-hero-image-mobile] img');
    this.strips = document.querySelectorAll('[data-strips]');
    this.heroContentGroup = document.querySelectorAll('[data-hero-content-group]');
    this.navBar = document.querySelector('[ data-nav-bar-hero ]');
    this.metaInfo = document.querySelector('[data-meta-info]');
    this.loader = document.querySelector('[ data-loader ]');
    this.loaderStrips = document.querySelectorAll('[ data-loader-strip ]');
    this.body = document.querySelector('[data-body]');
    this.loaderSpinner = document.querySelector('[data-loader-spinner]');
    this.loaderSpinnerCircle = this.loaderSpinner.querySelector('circle');
    this.loaderContent = document.querySelector('[data-loader-content]');

    this.LSPINNER_WIDTH = this.loaderSpinner.getBoundingClientRect().width;
    this.LSPINNER_WIDTH_RULE = this.LSPINNER_WIDTH / 10;
    this.LSPINNER_RADIUS = (this.LSPINNER_WIDTH / 2) - (this.LSPINNER_WIDTH_RULE / 2) ;
    this.LSPINNER_CIRCUMFERENCE = 2 * Math.PI * this.LSPINNER_RADIUS;
    this.init();
  }

  init() {
    this.loaderSpinnerCircle.style.strokeDasharray = this.LSPINNER_CIRCUMFERENCE;
    this.body.classList.add('no-scrolling');
    this.calculatePageLoadTime(0);
  }

  animateLoader() {
    let homePage = document.getElementById('home');
    let caseStudy = document.querySelector('.website--casestudy');
    let heroTitleAnim = {
      y: 0,
      duration: 0.4,
      ease: Power2.in,
      stagger: {
        amount: 0.4
      }
    }

    this.loaderTl.to(this.loaderStrips,
      {
        height: "100%",
        duration: 0.6,
        ease: Power2.easeInOut,
        stagger: {
          amount: 0.3
        }
      }, "+=0.2");

    this.loaderTl.to(this.loaderContent, {
      opacity: 0,
      duration: 0.3,
      ease: Power2.easeIn
    }, "-=0.7");

    this.loaderTl.to(this.loader, {
      opacity: 0,
      visibility: "hidden",
      duration: 0.3,
      ease: "power2.in",
      oncomplete: () => { this.body.classList.remove('no-scrolling') }
    });


    this.loaderTl.to(this.heroTitleMobile, heroTitleAnim, "titles");
    this.loaderTl.to(this.heroTitle, heroTitleAnim, "titles");

    if (caseStudy) {
      this.loaderTl.fromTo(this.metaInfo, 0.6, { opacity: 0}, { opacity: 1, ease: "power2.inOut" }, "-=0.4");

      this.loaderTl.fromTo(this.heroImg, 0.3,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1 , ease: Power2.in },
      "last-elements-=0.4");

      this.loaderTl.fromTo(this.navBar, 0.6, { opacity: 0 }, { opacity: 1, ease: "power2.inOut" }, "last-elements-=0.4");
    }
    else {

      this.loaderTl.fromTo(this.heroImg, 0.5,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, ease: Power2.in },
      "others-=0.4");

      if(this.heroImageMobile) {
        this.loaderTl.fromTo(this.heroImageMobile, 0.5,
          { opacity: 0 },
          { opacity: 1, ease: Power2.in },
        "others-=0.25");
        console.log('yesss!');
      }

      this.loaderTl.fromTo(this.heroContentGroup,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4 }, "others-=0.3"
      );

      this.loaderTl.fromTo(this.metaInfo, 0.6, { opacity: 0}, { opacity: 1, ease: "power2.inOut" }, "others-=0.3");
      this.loaderTl.fromTo(this.navBar, 0.6, { opacity: 0 }, { opacity: 1, ease: "power2.inOut" }, "others-=0.3");
    }
  }

  calculatePageLoadTime(progress) {
    this.updateLoading(progress);
    progress++;

    let timer = setTimeout(() => {
      this.calculatePageLoadTime(progress);
    }, 30);

    if(progress > 100) {
      clearInterval(timer);
      this.animateLoader();
    }
  }

  updateLoading(amount) {
    let progress = amount / 100;
    let dashoffset = this.LSPINNER_CIRCUMFERENCE * (1 - progress);
    this.loaderSpinnerCircle.style.strokeDashoffset = dashoffset;
  }
}

window.addEventListener('load', (event) => {
  new Loader();
});
