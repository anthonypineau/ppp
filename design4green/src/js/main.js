const listeBP = document.querySelector("#listeBP");
const listeBPChecked = new Array();
const phases = ["Aucune phase", "Administration", "Conception", "Réalisation", "Acquisition", "Déploiement", "Utilisation", "Maintenance", "Fin de vie", "Revalorisation"];

fetch("../../data/data.json")
.then(response => {
   return response.json();
}).then(data => {
    data.forEach(d => {
      const div = document.createElement("div");
      div.classList.add("card");
      div.classList.add(d.category)
      div.textContent=d.name;
      if(d.incontournable){
        div.classList.add("incontournable");
        div.classList.add("selected");
        listeBPChecked.push(d);
      }else{
        div.classList.add("contournable");
        div.addEventListener("click", () => {
            if(div.classList.contains("selected")){
                div.classList.remove("selected");
                if(document.querySelector(".active").id=="selected"){
                  filterSelection("selected");
                }
                listeBPChecked.splice(listeBPChecked.indexOf(d), 1);
            }else{
                div.classList.add("selected");
                listeBPChecked.push(d);
            }
        });
      }
      listeBP.appendChild(div);
    });
    filterSelection("all");
});

function filterSelection(filter) {
  const cards = document.querySelectorAll(".card");
  if (filter == "all") filter = "card";
  cards.forEach((c) => {
    c.classList.remove("show");
    if (c.classList.contains(filter)){
      c.classList.add("show");
    }
  });
}

document.querySelectorAll(".submit").forEach((i) => {
  i.addEventListener("click", () => {
    const divTable = document.querySelector(".table");
    divTable.innerHTML="";
    const button = document.createElement("button");
    button.textContent="Télécharger le fichier";
    button.addEventListener("click", () => {
      const csv = [];
      const rows = document.querySelectorAll("table tr");
      rows.forEach((r) => {
        const row = [], cols = r.querySelectorAll("td, th");
        cols.forEach((c) => {
          row.push(c.innerText);
        }); 
        csv.push(row.join(";"));
      });
      const downloadLink = window.document.createElement('a');
      const universalBOM = "\uFEFF";
      downloadLink.setAttribute('href', 'data:text/csv; charset=utf-8,' + encodeURIComponent(universalBOM+csv.join("\n")));
      downloadLink.setAttribute('download', 'gantt.csv');
      document.body.appendChild(downloadLink);
      downloadLink.click();
    });
    button.classList.add("button");
    divTable.appendChild(button);
    const table = document.createElement("table");
    phases.forEach((p) => {
      const thead = document.createElement("thead");
      const trhead = document.createElement("tr");
      const thPhase = document.createElement("th");
      const thStep = document.createElement("th");
      const thIndicateur = document.createElement("th");
      

      thPhase.textContent=p;
      thStep.textContent="Étapes clés";
      thIndicateur.textContent="Indicateurs";
      

      trhead.appendChild(thPhase);
      trhead.appendChild(thStep);
      trhead.appendChild(thIndicateur);
      thead.appendChild(trhead);
      table.appendChild(thead);
      const tbody = document.createElement("tbody");
      const listeBPCheckedFilter = listeBPChecked.filter((e) => { return p==e.lifecycle; });
      listeBPCheckedFilter.forEach((i) => {
        const trbody = document.createElement("tr");
        const tdPhase = document.createElement("td");
        const tdStep = document.createElement("td");
        const tdIndicateur = document.createElement("td");
        
        tdPhase.textContent=i.name;
        tdStep.textContent=i.keystep;
        if(i.indicator!=""){
          tdIndicateur.textContent=i.indicator+", x : "+i.indicatorX+", y :"+i.indicatorY;
        }else{
          tdIndicateur.textContent="Aucuns indicateurs";
        }
        
        trbody.appendChild(tdPhase);
        trbody.appendChild(tdStep);
        trbody.appendChild(tdIndicateur);
        tbody.appendChild(trbody);
      });
      table.appendChild(tbody);
    });
    divTable.appendChild(table);
    const button2 = document.createElement("button");
    button2.textContent="Télécharger le fichier";
    button2.addEventListener("click", () => {
      const csv = [];
      const rows = document.querySelectorAll("table tr");
      rows.forEach((r) => {
        const row = [], cols = r.querySelectorAll("td, th");
        cols.forEach((c) => {
          row.push(c.innerText);
        }); 
        csv.push(row.join(";"));
      });
      const downloadLink = window.document.createElement('a');
      const universalBOM = "\uFEFF";
      downloadLink.setAttribute('href', 'data:text/csv; charset=utf-8,' + encodeURIComponent(universalBOM+csv.join("\n")));
      downloadLink.setAttribute('download', 'gantt.csv');
      document.body.appendChild(downloadLink);
      downloadLink.click();
    });
    button2.classList.add("button");
    divTable.appendChild(button2);
  });
});

const btns = document.querySelectorAll("#myBtnContainer .btn");
btns.forEach((b) => {
    b.addEventListener("click", function() {
        const current = document.querySelector(".active");
        current.classList.remove("active");
        this.classList.add("active");
        filterSelection(b.id);
      });
});