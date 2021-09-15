export function loadHTMLFile(name){
    fetch("../../src/views/"+name+".html")
    .then(response => {
      return response.text()
    })
    .then(data => {
      document.querySelector("#app").innerHTML = data;
    });
}