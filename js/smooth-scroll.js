const MathUtils = {
    // map number x from range [a, b] to [c, d]
    map: (x, a, b, c, d) => (x - a) * (d - c) / (b - a) + c,
    // linear interpolation
    lerp: (a, b, n) => (1 - n) * a + n * b
};

const body = document.body;

let winsize;
let docScroll;

const calcWinsize = function(){
  winsize = {
    width: window.innerWidth,
    height: window.innerHeight
  };
  return winsize;
}

const getPageYScroll = function() {
  return docScroll = window.pageYOffset || document.documentElement.scrollTop;
}


calcWinsize();

window.addEventListener('resize', calcWinsize);
window.addEventListener('scroll', getPageYScroll);


class SmoothScroll {
  constructor() {
    console.log('heyy smooth!!');

    this.domElems = {
      main: document.querySelector('[ data-main ]')
    };

    this.domElems.scrollable = this.domElems.main.querySelector('[data-scroll]');
    this.domElems.content = this.domElems.main.querySelectorAll('[data-item]');
    console.log(this.domElems.scrollable);
    this.items = [];
    this.domElems.content.forEach((item) => {
      this.items.push(item);
      //this.items.push(new Item(item));
    });

    this.renderedStyles = {
      translationY: {
          previous: 0,
          current: 0,
          ease: 0.1,
          setValue: () => docScroll
      }
    };

    this.update();
    // previous = MathUtils.lerp(previous, current, ease)
    this.setSize();
    this.style();
    this.initEvents();
    requestAnimationFrame(() => this.render());
  }

  update() {
    for (const key in this.renderedStyles ) {
      this.renderedStyles[key].current = this.renderedStyles[key].previous = this.renderedStyles[key].setValue();
    }
    this.layout();
  }

  layout() {
    this.domElems.scrollable.style.transform = `translate3d(0,${-1*this.renderedStyles.translationY.previous}px,0)`;
  }

  setSize() {
    body.style.height = this.domElems.scrollable.scrollHeight + 'px';
  }

  style() {
    this.domElems.main.style.position = 'fixed';
    this.domElems.main.style.width = this.domElems.main.style.height = '100%';
    this.domElems.main.style.top = this.domElems.main.style.left = 0;
    this.domElems.main.style.overflow = 'hidden';
  }

  initEvents() {
    window.addEventListener('resize', () => this.setSize());
  }

  render() {
    for (const key in this.renderedStyles ) {
        this.renderedStyles[key].current = this.renderedStyles[key].setValue();
        this.renderedStyles[key].previous = MathUtils.lerp(this.renderedStyles[key].previous, this.renderedStyles[key].current, this.renderedStyles[key].ease);
    }
    this.layout();

    // for every item
    for (const item of this.items) {
      // if the item is inside the viewport call it's render function
      // this will update the item's inner image translation, based on the document scroll value and the item's position on the viewport
      if ( item.isVisible ) {
        item.render();
      }
    }

    // loop..
    requestAnimationFrame(() => this.render());
  }
}
