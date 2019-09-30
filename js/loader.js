class Loader {
  constructor(){
    this.loaderTl = new TimelineLite();
    this.heroBgStrips = document.querySelectorAll('[data-hero-strip]');
    this.heroTitles = document.querySelectorAll('[data-hero-titles]');
    this.heroCopy = document.querySelector('[data-hero-copy]');
    this.heroBtn = document.querySelector('[data-hero-cta]');
    this.heroBtnLine = document.querySelector('[data-hero-cta] .button__line');
    this.metaInfo = document.querySelector('[data-meta-info]');
    this.footer = document.query('[data-footer]');
    this.finishedCalculating = false;

    this.init();
  }

  init() {
    this.animateLoader();
  }

  animateNodeList(nodelist,props, offset, duration = 0.3) {
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

    this.animateNodeList(this.heroBgStrips, { height: "100%" }, offsetDelay);
    this.animateNodeList(this.heroTitles, { y: 0 }, "-=0.22");
    this.loaderTl.fromTo(this.heroCopy, 0.3, { opacity: 0, y: 50 }, { opacity: 1, y: 0 });
    this.loaderTl.fromTo(this.heroBtn, 0.3, { opacity: 0 }, { opacity: 1 }, "last-elements");
    this.loaderTl.fromTo(this.heroBtnLine, 0.05, { width: 0 }, { width: "100%" }, offsetDelay);
    this.loaderTl.fromTo(this.metaInfo, 0.6, { opacity: 0}, {opacity: 1}, "last-elements");
  }
}

window.addEventListener('load', (event) => {
  new Loader();
});
