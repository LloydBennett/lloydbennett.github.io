class Loader {
  constructor(){
    this.loaderTl = new TimelineLite();
    this.loader = document.querySelector('[data-loader]');
    this.loaderBgStrips = document.querySelectorAll('.loader__bg .background-strip');
    this.heroBgStrips = document.querySelectorAll('[data-hero-strip]');
    this.loaderTimerContent = document.querySelectorAll('.loader__percentage');
    this.heroTitles = document.querySelectorAll('[data-hero-titles]');
    this.heroCopy = document.querySelector('[data-hero-copy]');
    this.heroBtn = document.querySelector('[data-hero-cta]');
    this.heroBtnLine = document.querySelector('[data-hero-cta] .button__line');
    this.metaInfo = document.querySelector('[data-meta-info]');
    this.loaderPercentage = document.querySelector('[data-loader-percentage]');
    this.finishedCalculating = false;

    this.init();
  }

  init() {
    this.animateLoader();
  }

  animateLoader() {
    this.animateNodeList(this.loaderTimerContent, { y: 0 }, "-=0.3");

    //call this function at the end of this animation
    this.calculateLoadTime(0);
  }

  animateNodeList(nodelist, props, offset) {
    nodelist.forEach((e, i) => {
      if(i == 0) {
        this.loaderTl.to(e, 0.3, props);
      }
      else {
        this.loaderTl.to(e, 0.3, props, offset);
      }
    });
  }

  calculateLoadTime(al) {
    this.loaderPercentage.innerHTML = al;
    al++;

    let timer = setTimeout(() => {
      this.calculateLoadTime(al);
    }, 40);

    if(al == 100) {
      clearInterval(timer);
      this.loaderPercentage.innerHTML = 100;
      this.revealContent();
    }
  }

  revealContent() {
    let offsetDelay = "-=0.15";

    this.animateNodeList(this.loaderTimerContent, { y: "100%" }, "-=0.3");
    this.animateNodeList(this.loaderBgStrips, { height: 0 }, offsetDelay);
    this.animateNodeList(this.heroBgStrips, { height: "100%" }, offsetDelay);
    this.loaderTl.to(this.loader, 0.3, { opacity: 0, visibility: "hidden" });
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
