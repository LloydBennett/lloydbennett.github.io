class Loader {
  constructor(){
    this.loaderTl = new TimelineLite();
    this.loader = document.querySelector('[data-loader]');
    this.loaderBgStrips = document.querySelectorAll('.loader__bg .background-strip');
    this.heroBgStrips = document.querySelectorAll('[data-hero-strip]');
    this.loaderTimer = document.querySelector('[data-loader-timer]');
    this.heroTitles = document.querySelectorAll('[data-hero-titles]');
    this.init();
  }

  init() {
    this.animateLoader();
  }

  animateLoader() {
    var offsetDelay = "-=0.15";

    // pull in the percentage timer up
    // animate the timer to show how much has been loaded
    // hide the loader
    this.animateNodeList(this.loaderBgStrips, { height: 0 }, offsetDelay);
    this.animateNodeList(this.heroBgStrips, { height: "100%" }, offsetDelay);
    this.loaderTl.to(this.loader, 0.3, { opacity: 0, visibility: "hidden" });
    this.animateNodeList(this.heroTitles, { y: 0 }, offsetDelay);

    //this.animateContent();
    // animate the titles, paragraph and cta button
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
  animateContent() {

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
