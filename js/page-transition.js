class PageTransitions {
  constructor() {
    this.pageTriggers = document.querySelectorAll('[data-page-transition]');
    this.wrapper = document.querySelector('[data-main]');
    this.body = document.querySelector('body');
    this.currentTrigger;
    this.currentTriggerMorphElem;
    this.currentTriggerParent;

    this.init();
  }

  init() {

    this.pageTriggers.forEach((item, i) => {
      this.setHeightOfOverlays(item);

      item.addEventListener('click', (ev) => {
        ev.preventDefault();

        let url = item.href;
        this.currentTrigger = item;
        this.currentTriggerParent = item.parentNode;
        this.currentTriggerMorphElem = this.currentTriggerParent.querySelector('.card__morph');
        this.getPageData(url);
      });
    });


  }

  getPageData(url) {
    let xhr =  new XMLHttpRequest();
    let _this = this;

    xhr.open('GET', url);
    xhr.send();

    xhr.onreadystatechange = function () {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;

      if (xhr.status === 200) {
        //_this.insertNewPageContent(xhr.response);
        _this.animate(xhr.response);
      }
      else {
        console.log('failed!!');
      }
    }
  }

  getNewHTML(data) {
    let htmlWrapper = document.createElement('div');
    htmlWrapper.innerHTML = data;

    let pageContent = htmlWrapper.querySelector('[data-scroll]');

    return pageContent;
  }

  insertNewPageContent(newPage) {
    let currentPageContent = document.querySelector('[data-scroll]');

    //this.wrapper.appendChild(newPage);
    //this.wrapper.removeChild(currentPageContent);
    // this.reloadFunctionality();
  }

  reloadFunctionality() {
    new Website();
  }

  setHeightOfOverlays(trigger) {
    let triggerParent = trigger.parentNode;
    let cardMorph = triggerParent.querySelector('.card__morph');
    //let cardThumb = triggerParent.querySelector('.card__thumbnail');
    let width = trigger.offsetWidth;
    let height = trigger.offsetHeight;
    let top = trigger.getBoundingClientRect().top;
    let left = trigger.getBoundingClientRect().left;
    let bodyRect = document.body.getBoundingClientRect();

    cardMorph.style.width = `${width}px`;
    cardMorph.style.height = `${height}px`;
    cardMorph.style.top = `${top - bodyRect.top }px`;
    cardMorph.style.left = `${left - bodyRect.left }px`;
  }

  animate(htmlElement) {
    let tl = new TimelineLite();
    let newHTML = this.getNewHTML(htmlElement);
    let heroImage = newHTML.querySelector('[data-hero-image]');
    let heroImageHeight = heroImage.offsetHeight;

    //console.log(width);
    //this.body.classList.add('no-scrolling');
    this.wrapper.classList.add('website--hide-content','website--casestudy');

    this.currentTriggerMorphElem.style.opacity = 1;


    tl.to(this.currentTriggerMorphElem,{
      width: window.innerWidth,
      left: 0,
      ease: Power2.easeIn,
      duration: 0.4
    }, "+=0.3");

    console.log(heroImage);
    // tl.to(this.currentTriggerMorphElem,{
    //   height: heroImageHeight,
    //   ease: Power2.easeIn,
    //   duration: 0.4
    // });

    //this.insertNewPageContent(newHTML);
  }
}
