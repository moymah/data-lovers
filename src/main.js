let dataList = Object.values(LOL["data"]);
let button = document.getElementsByClassName("champ-img");
let arrayDeChamp = [];
let arrayDeHP = [];

function callEvent(variab, funCall){
  for (let i of variab){
    i.addEventListener("click", funCall) 
   }
}

window.onload = function (){
  getChampion();
  showChampions(dataList);
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
    callEvent(button, selectionChampion)
  }else{
    callEvent(button, showProfile)
   }
  }


function showProfile(event){
  let data = Object.values(LOL);
  let selectChamp = event.target.id;
  if(document.getElementById("btnCompare").style.backgroundColor === "grey"){
  document.getElementById("profile").style.visibility = "visible";
  document.getElementById("img-profile").src = data[3][selectChamp]["splash"];
  document.getElementById("profile-desc").innerHTML = data[3][selectChamp]["blurb"];
  document.getElementById("attack").innerHTML = "Attack: " + data[3][selectChamp]["info"]["attack"]
  document.getElementById("defense").innerHTML = "Defense: " + data[3][selectChamp]["info"]["defense"]
  document.getElementById("magic").innerHTML = "Magic: " + data[3][selectChamp]["info"]["magic"]
  document.getElementById("difficulty").innerHTML = "Difficulty: " + data[3][selectChamp]["info"]["difficulty"]
  console.log(selectChamp);
}}

document.getElementById("btnCompare").addEventListener("click", compare);

function compare(){
  if(document.getElementById("btnCompare").style.backgroundColor === "yellow"){
    document.getElementById("teste").style.visibility = "hidden";
    document.getElementById("btnCompare").style.backgroundColor = "grey";
    document.getElementById("champ-image-section").innerHTML = "";
    callEvent(button, showProfile)
  }else{
    document.getElementById("teste").style.visibility = "visible";
    document.getElementById("profile").style.visibility = "hidden";
    document.getElementById("btnCompare").style.backgroundColor = "yellow";
    document.getElementById("champ-image-section").innerHTML = "";
    callEvent(button, selectionChampion)
  }
}
function selectionChampion(event){
  let selected = event.target.id;
  let data = Object.values(LOL);
  if(document.getElementsByClassName("profile-selection").length >= 5){
    removeChamp();
  }else{
  document.getElementById("chart-section").style.visibility = "visible";
  let imagem = document.createElement("img");
  imagem.setAttribute("id", selected + "Image");
  imagem.setAttribute("class", "profile-selection")
  imagem.setAttribute("src", data[3][selected]["img"]);
  document.getElementById("champ-image-section").appendChild(imagem);
  removeChamp();
  let championCompare = document.getElementsByClassName("profile-selection").length;
  arrayDeChamp.push(selected)
  arrayDeHP.push(chartInit(selected));
  console.log(arrayDeHP)
  graphAdd(arrayDeHP[0], arrayDeHP[1], arrayDeHP[2], arrayDeHP[3], arrayDeHP[4])
  }
}

function chartInit(idName){
  let data = Object.values(LOL);
  let hpInit = data[3][idName]["stats"]["hp"];
  var dataHP =[hpInit];
  for(let i=0; i<17; i++){
    hpInit += data[3][idName]["stats"]["hpperlevel"];
    dataHP.push(hpInit)
  };
  return dataHP;
}
console.log(chartInit());

function graphAdd(c1, c2, c3, c4, c5){
  var ctx = document.getElementsByClassName("line-chart");
  var chartGraph = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18"],
    datasets:[{
      label: "",
      data: c1,
      borderWidth: 6,
      borderColor: 'rgba(245, 3, 3, 0.85)',
      backgroundColor: 'transparent'
      }, 
      {
      label: "",
      data: c2,
      borderWidth: 6,
      borderColor: 'rgba(77,166,253,0.85)',
      backgroundColor: 'transparent'
      }, 
      {
      label: "",
      data: c3,
      borderWidth: 6,
      borderColor: 'rgba(250, 212, 0, 0.85)',
      backgroundColor: 'transparent'
      }, 
      {
      label: "",
      data: c4,
      borderWidth: 6,
      borderColor: 'rgba(102, 255, 0, 0.85)',
      backgroundColor: 'transparent'
      }, 
      {
      label: "",
      data: c5,
      borderWidth: 6,
      borderColor: 'rgba(255, 0, 242,0.85)',
      backgroundColor: 'transparent'
      }
    ]
  }
});
}


function removeChamp(){
  let championCompare = document.getElementsByClassName("profile-selection");
  var x = Object.values(championCompare);
  callEvent(championCompare, function(event){ 
      let select = event.target.id;
      let position = x.indexOf(event.target);
      arrayDeHP[position] = [];
      document.getElementById("champ-image-section").removeChild(document.getElementById(select))
      graphAdd(arrayDeHP[0], arrayDeHP[1], arrayDeHP[2], arrayDeHP[3], arrayDeHP[4])
    })
  }
  
document.getElementById("filter2").addEventListener("change", filterSelection);

function filterSelection(event) {
  let idTag = event.target.id;
  if(idTag === "all"){
    showChampions(dataList);
  }else{
  let filtrado = dataList.filter((personagem) => {
    return personagem.tags.includes(idTag);
  })
  showChampions(filtrado);
  }
  }