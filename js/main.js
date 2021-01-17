function initializeFunctionality() {
  activateScrollTriggerEvents();
  new NavigationMenu();
  new PageTransitions();
  new Form();
}

function activateScrollTriggerEvents() {
  gsap.registerPlugin(ScrollTrigger);

  let imageRevel = document.querySelectorAll('[data-image-reveal]');
  let textWipe = document.querySelectorAll('[data-text-wipe]');

  imageRevel.forEach(item => {
    let tlScroll = gsap.timeline({
      scrollTrigger: {
        trigger: item,
        start: "top center"
      }
    });

    tlScroll.fromTo(item,
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
    );
  });

  textWipe.forEach(item => {
    let itemSpan = item.querySelectorAll('.title-mask span');

    let tlScroll = gsap.timeline({
      scrollTrigger: {
        trigger: item,
        start: "top center"
      }
    });

    tlScroll.to(itemSpan, {
      transform: "translateY(0) skewY(0)",
      duration: 0.5,
      ease: Power2.easeOut,
      stagger: {
        amount: 0.3
      }
    });
  });
}

window.addEventListener('load', function() {
  let scrollToSectionTrig = document.querySelectorAll('[data-scroll-to-section]');

  let scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true
  });

  function scrollToSection(e) {
    e.preventDefault();
    e.stopPropagation();

    let href = this.getAttribute("href");
    let destination = document.querySelector(href);

    scroll.scrollTo(destination);
  }

  scrollToSectionTrig.forEach((item) => {
    item.addEventListener('click', scrollToSection);
  });

  initializeFunctionality();
});
