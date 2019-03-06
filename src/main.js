let dataList = Object.values(LOL["data"]);
let button = document.getElementsByClassName("champ-img");

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
    document.getElementById("teste").innerHTML = "";
    callEvent(button, showProfile)
  }else{
    document.getElementById("teste").style.visibility = "visible";
    document.getElementById("profile").style.visibility = "hidden";
    document.getElementById("btnCompare").style.backgroundColor = "yellow";
    document.getElementById("teste").innerHTML = "";
    callEvent(button, selectionChampion)
  }
}
function selectionChampion(event){
  let selected = event.target.id;
  let data = Object.values(LOL);
  if(document.getElementsByClassName("profile-selection").length >= 5){
    removeChamp();
  }else{
  let imagem = document.createElement("img");
  imagem.setAttribute("id", selected + "image");
  imagem.setAttribute("class", "profile-selection")
  console.log(selected)
  imagem.setAttribute("src", data[3][selected]["img"]);
  document.getElementById("teste").appendChild(imagem);
  removeChamp();
  }
}


function removeChamp(){
  let championCompare = document.getElementsByClassName("profile-selection");
  callEvent(championCompare, function(event){ 
      let select = event.target.id;
      document.getElementById("teste").removeChild(document.getElementById(select))
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