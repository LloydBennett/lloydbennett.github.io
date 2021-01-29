class Loader {
  constructor() {
    this.loaderTl = gsap.timeline();
    this.heroTitle = document.querySelectorAll('[data-hero-title] .title-mask span');
    this.heroTitleMobile = document.querySelectorAll('[data-hero-title-mobile] .title-mask span');
    this.heroImg = document.querySelectorAll('[data-hero-image]');
    this.heroImageMobile = document.querySelector('[data-hero-image-mobile] img');
    this.strips = document.querySelectorAll('[data-strips]');
    this.heroContentGroup = document.querySelectorAll('[data-hero-content-group]');
    this.navBar = document.querySelector('[ data-nav-bar-hero ]');
    this.fadeContent = document.querySelectorAll('[data-fade-element]');
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
      transform: "translateY(0) skewY(0)",
      duration: 0.65,
      ease: Power2.easeOut,
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

    this.heroImg.forEach((item, i) => {
      let imageTop = item.getBoundingClientRect().top;
      let delay = 5;

      if(window.innerHeight < imageTop) {
        gsap.registerPlugin(ScrollTrigger);

        gsap.fromTo(item,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: Power2.easeOut,
            scrollTrigger: {
              trigger: item,
              start: "top bottom-=20%"
            }
          }
        );
      }
      else {
        this.loaderTl.fromTo(item, 0.6,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: Power2.easeOut
          },
          `others-=0.${delay - i}`);
      }
    });

    if(this.heroImageMobile) {
      this.loaderTl.fromTo(this.heroImageMobile, 0.6,
        { opacity: 0 },
        { opacity: 1, ease: Power2.easeOut },
      "others-=0.3");
    }

    if(this.heroContentGroup) {
      this.loaderTl.fromTo(this.heroContentGroup,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: Power2.easeOut }, "others-=0.6"
      );
    }

    if(this.fadeContent) {
      this.loaderTl.fromTo(this.fadeContent, 0.6,
        { opacity: 0 },
        { opacity: 1, ease: Power2.in },
      "others-=0.4");
    }

    this.loaderTl.fromTo(this.metaInfo, 0.6, { opacity: 0 }, { opacity: 1, ease: Power2.in }, "others-=0.4");
    this.loaderTl.fromTo(this.navBar, 0.6, { opacity: 0 }, { opacity: 1, ease: Power2.in }, "others-=0.4");
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
