const config = {
  height: window.innerHeight,
  width: window.innerWidth
}

let imageRevel = document.querySelectorAll('[data-image-reveal] [ data-image-overlay ]');
gsap.registerPlugin(ScrollTrigger);

imageRevel.forEach(item => {
  let itemParentNode = item.parentNode;
  let itemImage = itemParentNode.querySelector('img');

  let tlScroll = gsap.timeline({
    scrollTrigger: {
      trigger: item,
      start: "top center"
    }
  });

  tlScroll.to(item, {
    x: "100%",
    duration: 0.7,
    ease: "power2.inOut"
  });

  tlScroll.fromTo(itemImage,
    { scale: 1.2 },
    { scale: 1, duration: 0.5, ease: "power2.out" },
  "-=0.4");
});

class SmoothScroll {
  constructor() {
    this.bindMethods();

    this.data = {
      ease: 0.1,
      current: 0,
      last: 0,
      rounded: 0
    }

    this.dom = {
      el: document.querySelector('[data-main]'),
      content: document.querySelector('[data-scroll]')
    }

    this.rAF = null

    this.init()
  }

  bindMethods() {
    ['scroll', 'run', 'resize']
    .forEach((fn) => this[fn] = this[fn].bind(this))
  }

  setStyles() {
    Object.assign(this.dom.el.style, {
      position: 'fixed',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      overflow: 'hidden'
    })
  }

  setHeight() {
    document.body.style.height = `${this.dom.content.getBoundingClientRect().height}px`
  }

  resize() {
    this.setHeight()
    this.scroll()
  }

  scroll() {
    this.data.current = window.scrollY
  }

  run() {
    this.data.last += (this.data.current - this.data.last) * this.data.ease
    this.data.rounded = Math.round(this.data.last * 100) / 100

    const diff = this.data.current - this.data.rounded
    const acc = diff / config.width

    this.dom.content.style.transform = `translate3d(0, -${this.data.rounded}px, 0)`;
    this.requestAnimationFrame();
  }

  on() {
    this.setStyles()
    this.setHeight()
    this.addEvents()

    this.requestAnimationFrame()
  }

  off() {
    this.cancelAnimationFrame()

    this.removeEvents()
  }

  requestAnimationFrame() {
    this.rAF = requestAnimationFrame(this.run)
  }

  cancelAnimationFrame() {
    cancelAnimationFrame(this.rAF)
  }

  destroy() {
    document.body.style.height = '';

    this.data = null;

    this.removeEvents()
    this.cancelAnimationFrame()
  }

  resize() {
    this.setHeight()
    this.data.rounded = this.data.last = this.data.current;
  }

  addEvents() {
    window.addEventListener('resize', this.resize, { passive: true })
    window.addEventListener('scroll', this.scroll, { passive: true })
  }

  removeEvents() {
    window.removeEventListener('resize', this.resize, { passive: true })
    window.removeEventListener('scroll', this.scroll, { passive: true })
  }

  init() {
    this.on()
  }
}
