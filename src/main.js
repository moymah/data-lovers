let arrayChampions = Object.values(LOL["data"]);
let data = Object.values(LOL);
let button = document.getElementsByClassName("champ-img");
let compareSelections = [];
let arrayValues = [];
let filtrado = arrayChampions;
document.getElementById("order-select").addEventListener("change", order);
document.getElementById("stats-select-id").addEventListener("change", changeStats)
document.getElementById("btnCompare").addEventListener("click", compare);
document.getElementById("filter2").addEventListener("change", filterSelection);


window.onload = function (){
  getChampion();
  showChampions(arrayChampions);
}
function callEvent(variab, funCall){
  for (let i of variab){
    i.addEventListener("click", funCall) 
  }
}
function getChampion(){
  LOL["data"]["Evelynn"]["img"] = "https://www.masterypoints.com/assets/img/lol/champion_icons/Evelynn.png";
  LOL["data"]["Leblanc"]["img"] = "https://www.masterypoints.com/assets/img/lol/champion_icons/Leblanc.png";
  LOL["data"]["TwistedFate"]["img"] = "https://www.masterypoints.com/assets/img/lol/champion_icons/TwistedFate.png";
}
function showChampions(currentArray){
  let championSection = document.getElementById("champion-list");
  championSection.innerHTML = `
    ${currentArray.map((champ) =>`
      <section class="champion">
        <img src ="${champ["img"]}" id=${champ["id"]} class="champ-img" />
        <section>
          <p label for="${champ["id"]}" class="champ-name"> ${champ["name"]} </p>
        </section>
      </section>
    `).join("")}
  ` 
  imgEvent();
}
function imgEvent(){
  if(document.getElementById("btnCompare").style.backgroundColor === "yellow"){
    callEvent(button, champChosen)
  }else{
    callEvent(button, selectProfile)
  }
}
function selectProfile(event){
  let selectChamp = event.target.id;
  if(document.getElementById("btnCompare").style.backgroundColor === "yellow"){
    document.getElementById("profile").style.visibility = "hidden";
  }else{
    document.getElementById("teste").style.visibility = "hidden";
    document.getElementById("profile").style.visibility = "visible";
    showProfile(selectChamp);
  }
}
function showProfile(chosen){
    document.getElementById("img-profile").src = data[3][chosen]["splash"];
    document.getElementById("profile-desc").innerHTML = data[3][chosen]["blurb"];
    document.getElementById("attack").innerHTML = "Attack: " + data[3][chosen]["info"]["attack"]
    document.getElementById("defense").innerHTML = "Defense: " + data[3][chosen]["info"]["defense"]
    document.getElementById("magic").innerHTML = "Magic: " + data[3][chosen]["info"]["magic"]
    document.getElementById("difficulty").innerHTML = "Difficulty: " + data[3][chosen]["info"]["difficulty"]
}
function order(event) {
  let option = event.target.value;
  let ordered;
  option === "Alfabetic" ? ordered = filtrado.sort(function(a, b){
      if(a["name"] < b["name"]){
        return -1
      }if (a["name"] > b["name"]){
        return 1;
      }
        return 0;
    }) : ordered = filtrado.sort(function (a, b){
      if (a["stats"][option] < b["stats"][option]){
        return -1;
      }if (a["stats"][option] > b["stats"][option]){
      return 1;
      }
      return 0;
    })
  showChampions(ordered)
}
function compare(){
  arrayValues = [];
  graphAdd();
  if(document.getElementById("btnCompare").style.backgroundColor === "yellow"){
    document.getElementById("teste").style.visibility = "hidden";
    document.getElementById("btnCompare").style.backgroundColor = "grey";
    document.getElementById("champ-image-section").innerHTML = "";
    callEvent(button, selectProfile)
  }else{
    document.getElementById("teste").style.visibility = "visible";
    document.getElementById("profile").style.visibility = "hidden";
    document.getElementById("btnCompare").style.backgroundColor = "yellow";
    document.getElementById("champ-image-section").innerHTML = "";
    callEvent(button, champChosen)
  }
}
function champChosen(event){
  let selected = event.target.id;
  if(document.getElementsByClassName("profile-selection").length >= 5){
    removeEvent();
  }else{
    let imagem = document.createElement("img");
    imagem.setAttribute("id", selected + "Image");
    imagem.setAttribute("class", "profile-selection")
    imagem.setAttribute("src", data[3][selected]["img"]);
    document.getElementById("champ-image-section").appendChild(imagem);
    compareSelections.push(selected);
    removeEvent();  
    arrayValues.push(chartInit(selected, document.getElementById("stats-select-id").value));
  }
  graphAdd(arrayValues[0], arrayValues[1], arrayValues[2], arrayValues[3], arrayValues[4])
}
function changeStats(){
  arrayValues = [];
  graphAdd();
  for(i of compareSelections){
    arrayValues.push(chartInit(i, document.getElementById("stats-select-id").value));
  }
  graphAdd(arrayValues[0], arrayValues[1], arrayValues[2], arrayValues[3], arrayValues[4])
}
function chartInit(idName, status){
  let data = Object.values(LOL);
  let statInitial = data[3][idName]["stats"][status];
  let valuesPerLvl = [statInitial];
  for(let i=0; i<17; i++){
    statInitial += data[3][idName]["stats"][status + "perlevel"];
    valuesPerLvl.push(statInitial)
  };
  return valuesPerLvl;
}
function graphAdd(c1, c2, c3, c4, c5){
  let ctx = document.getElementsByClassName("line-chart");
  if(window.bar != undefined) 
    window.bar.destroy(); 
  window.bar = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18"],
      datasets:[{
        label: "",
        data: c1,
        borderWidth: 4,
        borderColor: 'rgba(245, 3, 3, 0.85)',
        backgroundColor: 'transparent'
        }, 
        {
        label: "",
        data: c2,
        borderWidth: 4,
        borderColor: 'rgba(77,166,253,0.85)',
        backgroundColor: 'transparent'
        }, 
        {
        label: "",
        data: c3,
        borderWidth: 4,
        borderColor: 'rgba(250, 212, 0, 0.85)',
        backgroundColor: 'transparent'
        }, 
        {
        label: "",
        data: c4,
        borderWidth: 4,
        borderColor: 'rgba(102, 255, 0, 0.85)',
        backgroundColor: 'transparent'
        }, 
        {
        label: "",
        data: c5,
        borderWidth: 4,
        borderColor: 'rgba(255, 0, 242,0.85)',
        backgroundColor: 'transparent'
      }]
    },
    options:{
      legend:{ 
        labels:{
          padding: 20,
          boxWidth: 55,
        }
      }
    }
  });
}
function removeEvent(){
  let listCompare = Object.values(document.getElementsByClassName("profile-selection"));
  for (let i of listCompare){
    i.addEventListener("click", removeChosen) 
  }
}
function removeChosen(event){
  let select = event.target.id;
  let listCompare = Object.values(document.getElementsByClassName("profile-selection"));
  let position = listCompare.indexOf(event.target);
  document.getElementById("champ-image-section").removeChild(document.getElementById(select))
  arrayValues.splice(position, 1)
  compareSelections.splice(position, 1)
  graphAdd(arrayValues[0], arrayValues[1], arrayValues[2], arrayValues[3], arrayValues[4])
}
function filterSelection(event) {
  let idTag = event.target.id;
  if(idTag === "all"){
    showChampions(arrayChampions);
  }else{
    filtrado = arrayChampions.filter((personagem) => {
      return personagem.tags.includes(idTag);
    })
    showChampions(filtrado);
  }
}