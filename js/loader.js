class Loader {
  constructor(){
    this.loaderTl = new TimelineLite();
    this.loader = document.querySelector('[data-loader]');
    this.loaderBgStrips = document.querySelectorAll('.loader__bg .background-strip');
    this.heroBgStrips = document.querySelectorAll('[data-hero-strip]');
    this.loaderTimer = document.querySelector('[data-loader-timer]');
    this.heroTitles = document.querySelectorAll('[data-hero-titles]');
    this.heroCopy = document.querySelector('[data-hero-copy]');
    this.heroBtn = document.querySelector('[data-hero-cta]');
    //this.heroBtnLine = document.querySelector('[data-hero-cta]::after');
    this.init();
  }

  init() {
    this.animateLoader();
  }

  animateLoader() {
    var offsetDelay = "-=0.15";
    console.log(this.heroBtnLine);
    // pull in the percentage timer up
    // animate the timer to show how much has been loaded
    // hide the loader
    this.animateNodeList(this.loaderBgStrips, { height: 0 }, offsetDelay);
    this.animateNodeList(this.heroBgStrips, { height: "100%" }, offsetDelay);
    this.loaderTl.to(this.loader, 0.3, { opacity: 0, visibility: "hidden" });
    this.animateNodeList(this.heroTitles, { y: 0 }, "-=0.22");
    this.loaderTl.fromTo(this.heroCopy, 0.3, { opacity: 0, y: 50 }, { opacity: 1, y: 0 });
    this.loaderTl.fromTo(this.heroBtn, 0.3, { opacity: 0 }, { opacity: 1 });
    //this.loaderTl.fromTo(this.heroBtnLine, 0.3, { width: 0 }, { width: "100%" }, offsetDelay);
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
}

window.addEventListener('load', (event) => {
  new Loader();
});

  // // percentage loader reaches 100%;
  // //   // background strip slides up
  // //   // loader disappears
  // var loaderPercentage = document.querySelector('[data-percentage-value]');
  // var percentageValue = loaderPercentage.dataset.percentageValue;
  // var backgroundStrips = document.querySelectorAll('[data-hero-strip]');
  //
  // function loaderTimer() {
  //   setInterval(function() {
  //     if(percentageValue === 100) {
  //       clearInterval();
  //       animateLoader();
  //       return;
  //     } else {
  //       percentageValue++;
  //       loaderPercentage.innerHTML = percentageValue;
  //     }
  //   }, 10);
  // }
  //
  // function animateLoader() {
  //   var loader = document.querySelector('.loader');
  //
  //   loader.addEventListener("transitionend", function() {
  //     backgroundStrips.forEach(function(elem){
  //       console.log(elem);
  //       //elem.classList.add('bg-grow');
  //     });
  //   });
  //
  //   loader.classList.add('loader--hide');
  // }
  //
  // function loader () {
  //   loaderPercentage.addEventListener("animationend", function() {
  //     setTimeout(loaderTimer, 800);
  //   });
  // }
  //
  // window.addEventListener('load', function(){
  //   loader();
  // });
