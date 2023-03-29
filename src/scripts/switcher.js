const switcherTheme = document.getElementById("themeSwitch");
const input = document.querySelector(".theme-switch__label");
const theme = document.querySelector("[data=theme]");


input.addEventListener("click", function() {
  if (switcherTheme.checked) {
    theme.href = "./src/styles/style_light.css";
  } else {
    theme.href = "./src/styles/style_dark.css";
  }
})
