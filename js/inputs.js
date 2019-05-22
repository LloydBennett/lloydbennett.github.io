const updateInputContent = (input) => {
  let input = document.querySelector(".input__field");
  let inputValue = input.value;

  if (value) {
    input.classList.add("has-input");
  } else {
    input.classList.remove("has-input");
  }
};
