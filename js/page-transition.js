class PageTransitions {
  constructor() {
    this.pageTriggers = document.querySelectorAll('[data-page-transition]');
    this.wrapper = document.querySelector('[data-main]');
    this.body = document.querySelector('body');
    this.currentTrigger;
    this.currentTriggerMorphElems = [];
    this.currentTriggerParent;
    this.url;

    this.init();
  }

  init() {

    this.pageTriggers.forEach((item, i) => {
      this.setHeightOfOverlays(item);

      item.addEventListener('click', (ev) => {
        ev.preventDefault();
        ev.stopPropagation();

        this.url = item.href;
        this.currentTrigger = item;
        this.currentTriggerParent = item.parentNode;
        // this.currentTriggerMorphElem = this.currentTriggerParent.querySelector('.card__morph');
        this.getPageData(this.url);
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
        _this.animateTransition(xhr.response);
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

    this.wrapper.appendChild(newPage);
    this.wrapper.removeChild(currentPageContent);
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
    let intViewportHeight = window.innerHeight;
    //let windowBottom =
    //let newTopPos = (top * intViewportHeight) / 100;
    //console.log(newTopPos);


    cardMorph.style.width = `${width}px`;
    cardMorph.style.height = `${height}px`;
    cardMorph.style.top = `${top - bodyRect.top }px`;
    //cardMorph.style.top = "20%";
    //cardMorph.style.top = "466.515625px";
    cardMorph.style.left = `${left - bodyRect.left }px`;

    //this.wrapper.removeChild(cardMorph);
    this.body.insertBefore(cardMorph, this.wrapper);
    this.currentTriggerMorphElems.push(cardMorph);
  }

  animateTransition(htmlElement) {
    let _this = this;
    let tl = new TimelineLite();
    let transitionName = getTransitionEndEventName();
    let newHTML = this.getNewHTML(htmlElement);
    let currentTriggerAttr = this.currentTrigger.dataset.pageTransition;
    let heroSelectorName = "#" + currentTriggerAttr + " " + "[data-hero-image]";
    let heroImage;
    let heroImageHeight;
    let currentMorphItem;

    this.currentTriggerMorphElems.forEach((item) => {
      if (item.dataset.cardMorph === currentTriggerAttr) {
        currentMorphItem = item;
      }
    });

    this.wrapper.addEventListener(transitionName, () => {
      //window.scrollTo(0,0);
      _this.insertNewPageContent(newHTML);
      heroImage = document.querySelector(heroSelectorName);
      heroImageHeight = heroImage.offsetHeight;
      let heroImageXpos = heroImage.getBoundingClientRect().top;

      tl.to(currentMorphItem, {
        width: window.innerWidth,
        left: 0,
        ease: Power2.easeIn,
        duration: 0.4
      }, "+=0.3");

      tl.to(currentMorphItem, {
        height: heroImageHeight,
        ease: Power2.easeIn,
        duration: 0.4
      }, "+=0.3");

      // tl.to(currentMorphItem,{
      //   top: heroImageXpos,
      //   ease: Power2.easeIn,
      //   duration: 0.8,
      //   onComplete: () => {
      //     window.scrollTo(0, 0);
      //     //_this.body.classList.add('no-scrolling');
      //   }
      // });
      _this.updateURL();

    });

    tl.to(currentMorphItem, {
      opacity: 1,
      ease: Power2.easeIn,
      duration: 0.4,
      onComplete: () => {
        this.wrapper.classList.add('website--hide-content','website--casestudy');
      }
    });


    //currentMorphItem.style.opacity = 1;

    // setTimeout(() => {
    //   this.body.classList.add('no-scrolling');
    //
    // }, 3000);


    //this.insertNewPageContent(newHTML);
  }
  updateURL() {
    if (this.url != window.location) {
      window.history.pushState({path:this.url},'',this.url);
    }
  }
}
