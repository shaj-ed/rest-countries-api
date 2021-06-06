const body = document.querySelector("body");
const switchButton = document.querySelector(".toggle-button");

// Color theme switch
switchButton.addEventListener("click", () => {
  const moon = document.querySelector("#moon");
  if (!moon.classList.contains("fas")) {
    switchButton.innerHTML = ` <i class="fas fa-moon" id="moon"></i>
          Light Mode`;
  } else {
    switchButton.innerHTML = ` <i class="far fa-moon" id="moon"></i>
          Dark Mode`;
  }

  body.classList.toggle("switch-theme");
});
