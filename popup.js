//
const DARK_MODE = "dark-mode";

const initialMode = localStorage.getItem("mode");
if (initialMode === DARK_MODE) document.body.classList.add(DARK_MODE);

const button = document.querySelector("#mode-btn");
button.addEventListener("click", async () => {
  console.log("test", document.body.classList);
  document.body.classList.toggle(DARK_MODE);
  const isDarkMode = document.body.classList.contains(DARK_MODE);
  if (isDarkMode) localStorage.setItem("mode", DARK_MODE);
  else localStorage.removeItem();
});
