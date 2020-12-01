class Loader {
  constructor(){
    this.loaderTl = new TimelineLite();
    this.heroTitle = document.querySelectorAll('[data-hero-title]');
    this.strips = document.querySelectorAll('[data-strips]');
    this.heroContentGroup = document.querySelectorAll('[data-hero-content-group]');
    this.navBar = document.querySelector('[ data-nav-bar-hero ]');
    this.metaInfo = document.querySelector('[data-meta-info]');

    this.init();
  }

  init() {
    this.animateLoader();
  }

  animateLoader() {
    let offsetDelay = "-=0.15";
    let homePage = document.getElementById('home');
    let caseStudy = document.querySelector('.casestudy');
    let heroTitleAnim = {
      y: 0,
      duration: 0.4,
      stagger: {
        amount: 0.4
      }
    }

    this.heroTitle.forEach((item, i) => {
      let letters = item.querySelectorAll('.title-mask span');
      if(i == this.heroTitle.length - 1) {
        this.loaderTl.to(letters, heroTitleAnim, "-=0.6");
      } else {
        this.loaderTl.to(letters, heroTitleAnim, "titles");
      }
    });

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
