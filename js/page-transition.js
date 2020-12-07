class PageTransitions {
  constructor() {
    this.pageTriggers = document.querySelectorAll('[data-page-transition]');
    this.wrapper = document.querySelector('[data-main]');

    this.init();
  }

  init() {
    this.pageTriggers.forEach((item, i) => {
      item.addEventListener('click', (ev) => {
        ev.preventDefault();
        let url = item.href;

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
        _this.insertNewPageContent(xhr.response);
      }
      else {
        console.log('failed!!');
      }
    }
  }

  insertNewPageContent(data) {
    let currentPageContent = document.querySelector('[data-scroll]');
    let htmlWrapper = document.createElement('div');
    let pageContent;

    htmlWrapper.innerHTML = data;


    this.wrapper.classList.add('website--hide-content','website--casestudy');


    // pageContent = htmlWrapper.querySelector('[data-scroll]');
    //
    // this.wrapper.appendChild(pageContent);
    // this.wrapper.removeChild(currentPageContent);
    // this.reloadFunctionality();
  }

  reloadFunctionality() {
    new Website();
  }
}
