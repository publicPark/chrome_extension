// dark
const DARK_MODE = "dark-mode";

const initialMode = localStorage.getItem("mode");
if (initialMode === DARK_MODE) document.body.classList.add(DARK_MODE);

const modeButton = document.querySelector("#mode-btn");
modeButton.addEventListener("click", () => {
  console.log("test", document.body.classList);
  document.body.classList.toggle(DARK_MODE);
  const isDarkMode = document.body.classList.contains(DARK_MODE);
  if (isDarkMode) localStorage.setItem("mode", DARK_MODE);
  else localStorage.removeItem("mode");
});
