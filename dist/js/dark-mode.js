const body=document.querySelector("body"),switchButton=document.querySelector(".toggle-button");switchButton.addEventListener("click",(()=>{document.querySelector("#moon").classList.contains("fas")?switchButton.innerHTML=' <i class="far fa-moon" id="moon"></i>\n          Dark Mode':switchButton.innerHTML=' <i class="fas fa-moon" id="moon"></i>\n          Light Mode',body.classList.toggle("switch-theme")}));