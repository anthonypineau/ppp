import { nav, openmenu } from "./modules/variables.js";
import { loadHTMLFile } from "./modules/loadHTMLfile.js";

loadHTMLFile("home");

openmenu.addEventListener("click", () => {
  console.log("test");
  nav.classList.toggle("responsive")  
});

