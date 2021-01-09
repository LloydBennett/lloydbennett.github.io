function initializeFunctionality() {
  new NavigationMenu();
  new SmoothScroll();
  new PageTransitions();
  new Form();
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
