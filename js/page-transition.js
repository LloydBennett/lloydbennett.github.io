class PageTransitions {
  constructor() {
    this.pageTriggers = document.querySelectorAll('[data-page-transition]');
    this.wrapper = document.querySelector('[data-main]');
    this.body = document.querySelector('body');
    this.currentTrigger;
    this.currentTriggerMorphElems = [];
    this.currentTriggerParent;
    this.url;
    this.tl = new TimelineLite();

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

    this.wrapper.removeChild(currentPageContent);
    this.wrapper.appendChild(newPage);
  }

  reloadFunctionality() {
    //initializeFunctionality();
    new NavigationMenu();
    new SmoothScroll();
    new Form();
  }

  setHeightOfOverlays(trigger) {
    let triggerParent = trigger.parentNode;
    let cardMorph = triggerParent.querySelector('.card__morph');
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
    cardMorph.style.left = `${left - bodyRect.left }px`;

    this.body.insertBefore(cardMorph, this.wrapper);
    this.currentTriggerMorphElems.push(cardMorph);
  }

  animateTransition(htmlElement) {
    let _this = this;
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
      // else {
      //   this.body.removeChild(item);
      // }
    });

    this.wrapper.addEventListener(transitionName, () => {
      //window.scrollTo(0,0);
      _this.insertNewPageContent(newHTML);
      heroImage = document.querySelector(heroSelectorName);
      heroImageHeight = heroImage.offsetHeight;
      let heroImageXpos = heroImage.getBoundingClientRect().top;

      this.tl.to(currentMorphItem, {
        width: window.innerWidth,
        left: 0,
        ease: Power2.easeIn,
        duration: 0.4
      }, "+=0.3");

      this.tl.to(currentMorphItem, {
        height: heroImageHeight,
        ease: Power2.easeIn,
        duration: 0.4,
        onComplete: ()=> {
          _this.endAnimation(currentMorphItem);
        }
      }, "+=0.3");

      // this.tl.to(currentMorphItem,{
      //   top: heroImageXpos,
      //   ease: Power2.easeIn,
      //   duration: 0.8,
      //   onComplete: () => {
      //     window.scrollTo(0, 0);
      //     //_this.body.classList.add('no-scrolling');
      //   }
      // });


    });

    this.tl.to(currentMorphItem, {
      opacity: 1,
      ease: Power2.easeIn,
      duration: 0.4,
      onComplete: () => {
        this.wrapper.classList.add('website--hide-content','website--casestudy');
      }
    });
  }

  updateURL() {
    if (this.url != window.location) {
      window.history.pushState({path:this.url},'',this.url);
    }
  }

  endAnimation(morphElem){
    let heroTitle = document.querySelectorAll('[data-hero-title] .title-mask span');
    let heroImgOverlay = document.querySelector('[data-hero-image] .overlay');
    let heroImg = document.querySelector('[data-hero-image] img');
    let metaInfo = document.querySelector('[data-meta-info]');
    let navBar = document.querySelector('[ data-nav-bar-hero ]');

    let heroTitleAnim = {
      y: 0,
      duration: 0.4,
      stagger: {
        amount: 0.4
      }
    }

    this.wrapper.classList.remove('website--hide-content');
    heroImgOverlay.style.transform = "translateX(100%)";

    this.tl.to(heroTitle, heroTitleAnim);

    this.tl.fromTo(metaInfo, 0.6, { opacity: 0}, { opacity: 1, ease: "power2.inOut" }, "-=0.4");

    this.tl.fromTo(navBar, 0.6, { opacity: 0 }, { opacity: 1, ease: "power2.inOut" }, "last-elements-=0.4");
    this.tl.to(morphElem, 0.6,
    {
      opacity: 0,
      ease: "power2.inOut"
      // onComplete: () => {
      //   //this.body.removeChild(morphElem);
      // }
    });
    console.log("page transitioned!");

    this.updateURL();
    this.reloadFunctionality();
  }
}
