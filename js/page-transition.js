function PageTransition(target) {
  this.target = target;

  this.init();
}


PageTransition.prototype = {
  init: function(){
    this.addEvents;
  },
  addEvents: function(){
    var _this = $(this);

    this.target.onclick = function(){
      this.navigateToPage.bind(event, _this);
    });
  },
  navigateToPage: function(event, $this){
    console.log($this);
  },
  animatePage: function(animationType) {

  }
}
