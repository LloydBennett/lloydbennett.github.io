class SmoothScroll {
  constructor() {
    this.bindMethods();

    this.config = {
      height: window.innerHeight,
      width: window.innerWidth
    }

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

    this.rAF = null;

    this.init();
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
    const acc = diff / this.config.width

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
    this.on();
  }
}
