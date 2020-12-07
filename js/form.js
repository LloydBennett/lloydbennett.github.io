class Form {
  constructor() {
    this.input = document.querySelectorAll('[data-input-field]');
    this.init();
  }

  init() {
    let _this = this;

    this.input.forEach(function(element, index) {
      element.addEventListener("focusout", () => { _this.updateInputContent() });
    });
  }

  updateInputContent() {
    let inputValue = event.target.value;

    if (inputValue === "") {
      event.target.classList.remove("has-input");
    } else {
      event.target.classList.add("has-input");
    }
  }
}
