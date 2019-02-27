window.onload = function (){
  showChampions();
}
//let arrayChamp = Object.values(LOL);


function getChampion(){
  LOL["data"]["Evelynn"]["img"] = "https://www.masterypoints.com/assets/img/lol/champion_icons/Evelynn.png"
  LOL["data"]["Leblanc"]["img"] = "https://www.masterypoints.com/assets/img/lol/champion_icons/Leblanc.png"  
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
  b();
}

function b(){
  let button = document.getElementsByClassName("champ-img");
  for (let i of button){
  i.addEventListener("click",a) 
  }
}

function a(event){
  let selectChamp = event.target.id;
  console.log(selectChamp);
}