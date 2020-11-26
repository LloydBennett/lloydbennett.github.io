(function(){
  let pageTriggers = document.querySelectorAll('[data-page-transition]');

  pageTriggers.forEach((item, i) => {
    item.addEventListener('click', (ev) => {
      ev.preventDefault();
      //console.log(item);
      let url = item.href;
      console.log(window.location);
    });
  });

}());
