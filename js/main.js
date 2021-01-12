function initializeFunctionality() {
  activateScrollTriggerEvents();
  new NavigationMenu();
  //new SmoothScroll();
  new PageTransitions();
  new Form();
}

function activateScrollTriggerEvents() {
  gsap.registerPlugin(ScrollTrigger);

  let imageRevel = document.querySelectorAll('[data-image-reveal]');
  let textWipe = document.querySelectorAll('[data-text-wipe]');

  imageRevel.forEach(item => {
    // let itemOverlay = item.querySelector('[data-image-overlay]');
    //let itemImage = item.querySelector('[data-image-reveal-content]');

    let tlScroll = gsap.timeline({
      scrollTrigger: {
        trigger: item,
        start: "top center"
      }
    });

    tlScroll.fromTo(item,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
    );
  });

  textWipe.forEach(item => {
    let itemSpan = item.querySelectorAll('span');

    let tlScroll = gsap.timeline({
      scrollTrigger: {
        trigger: item,
        start: "top center"
      }
    });

    tlScroll.to(itemSpan, {
      y: 0,
      duration: 0.4,
      ease: Power2.in,
      stagger: {
        amount: 0
      }
    });
  });
}

window.addEventListener('load', function() {
  let scrollToSectionTrig = document.querySelectorAll('[data-scroll-to-section]');

  function scrollToSection(e) {
    e.preventDefault();
    e.stopPropagation();

    let href = this.getAttribute("href");
    let hrefElement = document.querySelector(href);

    let destination = hrefElement.getBoundingClientRect().top;

    window.scrollTo({
      top: destination,
      left: 0,
      behaviour: 'smooth'
    });
  }

  scrollToSectionTrig.forEach((item) => {
    item.addEventListener('click', scrollToSection);
  });

  initializeFunctionality();
});
