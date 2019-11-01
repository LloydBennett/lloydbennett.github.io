class Loader {
  constructor(){
    this.loaderTl = new TimelineLite();
    this.heroBgStrips = document.querySelectorAll('[data-hero-strip]');
    this.heroTitles = document.querySelectorAll('[data-hero-titles]');
    this.heroCopy = document.querySelector('[data-hero-copy]');
    this.heroBtn = document.querySelector('[data-hero-cta]');
    this.heroBtnLine = document.querySelector('[data-hero-cta] .button__line');
    this.metaInfo = document.querySelector('[data-meta-info]');
    this.footer = document.querySelector('[data-footer]');
    this.heroImage = document.querySelector('[data-hero-image]');
    this.heroHorizLine = document.querySelector('[data-hero-hr]');
    this.heroDetailsListItems = document.querySelectorAll('[data-hero-details-item]');
    this.finishedCalculating = false;

    this.init();
  }

  init() {
    this.animateLoader();
  }

  animateNodeList(nodelist, props, offset, duration = 0.3) {
    nodelist.forEach((e, i) => {
      if(i == 0) {
        this.loaderTl.to(e, duration, props);
      }
      else {
        this.loaderTl.to(e, duration, props, offset);
      }
    });
  }

  animateLoader() {
    let offsetDelay = "-=0.15";
    let homePage = document.getElementById('home');
    let caseStudy = document.querySelector('.casestudy');

    this.animateNodeList(this.heroBgStrips, { height: "100%" }, offsetDelay);
    this.animateNodeList(this.heroTitles, { y: 0 }, "-=0.22");

    if(homePage) {
      this.loaderTl.fromTo(this.heroCopy, 0.3, { opacity: 0, y: 50 }, { opacity: 1, y: 0 });
      this.loaderTl.fromTo(this.heroBtn, 0.3, { opacity: 0 }, { opacity: 1 }, "last-elements");
      this.loaderTl.fromTo(this.heroBtnLine, 0.3, { width: 0 }, { width: "100%" }, offsetDelay);
    }
    else if(caseStudy) {
      this.loaderTl.fromTo(this.heroImage, 0.3, { opacity: 0, x: 50 }, { opacity: 1, x: 0 });
      this.loaderTl.fromTo(this.heroHorizLine, 0.3, { width: 0 }, { width: 100 }, "last-elements");
      this.animateNodeList(this.heroDetailsListItems, { y: 0 }, "-=0.05", 0.2);
    }

    this.loaderTl.fromTo(this.metaInfo, 0.6, { opacity: 0}, { opacity: 1 }, "last-elements");
    this.loaderTl.fromTo(this.footer, 0.3, { opacity: 0 }, { opacity: 1 });
  }
}

window.addEventListener('load', (event) => {
  new Loader();
});
