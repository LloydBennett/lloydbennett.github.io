function scrollToSection(e, $this) {
  e.preventDefault();
  e.stopPropagation();
  var bodyElement;
  var isSafari = navigator.vendor && navigator.vendor.indexOf('Apple') > -1 &&
             navigator.userAgent &&
             navigator.userAgent.indexOf('CriOS') == -1 &&
             navigator.userAgent.indexOf('FxiOS') == -1;
  var destination = $this.getAttribute("href");

  // Scroll functionality works differently on safari

  if($this.hasAttribute('data-scroll-to-bottom')) {
    window.scrollTo(0,document.body.scrollHeight);
    return;
  }

  if (isSafari) {
    bodyElement = $('body');
  }
  else {
    bodyElement = $('html, body');
  }

  $(bodyElement).animate({
    scrollTop: $(destination).offset().top
  }, 600);

}