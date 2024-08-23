// Switch function
const switchTheme = () => {
  //Get the root element and the data-theme value
  const rootElem = document.documentElement;
  let dataTheme = rootElem.getAttribute("data-theme"),
    newTheme;

  newTheme = dataTheme === "light" ? "dark" : "light"; // if dataTheme = light then new Theme will be = dark else will be equal to light

  //Set the new HTML attribute
  rootElem.setAttribute("data-theme", newTheme);

  //Set the new local storage item
  localStorage.setItem("theme", newTheme);
};

// Add event listener for the theme switcher
document
  .querySelector("#theme-switcher")
  .addEventListener("click", switchTheme);
