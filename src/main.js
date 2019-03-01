window.onload = function (){
  showChampions();
}
//let arrayChamp = Object.values(LOL);

 function getChampion(){
  LOL["data"]["Evelynn"]["img"] = "https://www.masterypoints.com/assets/img/lol/champion_icons/Evelynn.png";
  LOL["data"]["Leblanc"]["img"] = "https://www.masterypoints.com/assets/img/lol/champion_icons/Leblanc.png";
  LOL["data"]["TwistedFate"]["img"] = "https://www.masterypoints.com/assets/img/lol/champion_icons/TwistedFate.png";
  return Object.values(LOL["data"]);
}

function showChampions(){
  let championSection = document.getElementById("champion-list");
  championSection.innerHTML = `
  ${getChampion().map((champ) =>`
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
  let button = document.getElementsByClassName("champ-img");
  for (let i of button){
  i.addEventListener("click", showProfile) 
  }
}

function showProfile(event){
  let data = Object.values(LOL);
  let selectChamp = event.target.id;
  document.getElementById("profile").style.visibility = "visible";
  console.log(data)
  document.getElementById("img-profile").src = data[3][selectChamp]["splash"];
  document.getElementById("profile-desc").innerHTML = data[3][selectChamp]["blurb"];
  document.getElementById("attack").innerHTML = "Attack: " + data[3][selectChamp]["info"]["attack"]
  document.getElementById("defense").innerHTML = "Defense: " + data[3][selectChamp]["info"]["defense"]
  document.getElementById("magic").innerHTML = "Magic: " + data[3][selectChamp]["info"]["magic"]
  document.getElementById("difficulty").innerHTML = "Difficulty: " + data[3][selectChamp]["info"]["difficulty"]
  console.log(selectChamp);
}
//document.getElementById("btnCompare").addEventListener("click", compare);

/*function compare(){
  let button = document.getElementsByClassName("champ-img");
  for (let i of button){
    i.style.border = "2px solid grey"; 
    i.addEventListener("click", selectionChampion)
    }
}
function selectionChampion(event){
  let selected = event.target.id;
  let data = Object.values(LOL);
  let imagem = document.createElement("img");
  console.log(selected)
  if(document.getElementById(selected).style.border == "2px solid blue"){
    document.getElementById("teste").removeChild(document.getElementById("teste").childNodes[0]);
    document.getElementById(selected).style.border = "2px solid grey"
  }else{
    imagem.setAttribute("src", data[3][selected]["img"]);
    document.getElementById("teste").appendChild(imagem);
   document.getElementById(selected).style.border = "2px solid blue";
}
}*/

document.getElementById("filter2").addEventListener("change", filterSelection);


function filterSelection(event) {
  let idTag = filter2.value;
  let data = getChampion();
  let filtrado = data.filter((personagem) => {
    return personagem.tags.includes(idTag);
  })
  console.log(filtrado);
 
  }

  /*function typeFilter(){
    let filteredPokemon = POKEMON.pokemon.filter(pokemon => {
    return (pokemon.type.includes(selectTypeElement.value));
});*/