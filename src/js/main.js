import { nav, openmenu, links } from "./modules/variables.js";
import { loadHTMLFile } from "./modules/loadHTMLfile.js";

loadHTMLFile("home");

openmenu.addEventListener("click", () => {
  nav.classList.toggle("responsive")  
});

links.forEach((link) => {
  link.addEventListener("click", () => {
    loadHTMLFile(link.id);
  });
});

/* à voir
const dropdown = document.querySelector(".dropdown");

dropdown.addEventListener("click", () => {
  document.querySelector(".dropdown-content").classList.toggle("show");
});

window.onclick = function(e) {
  if (!e.target.matches('.dropdown')) {
      var myDropdown = document.querySelector(".dropdown-content");
      if (myDropdown.classList.contains('show')) {
          myDropdown.classList.remove('show');
      }
  }
}
*/