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
  b();
}

function b(){
  let button = document.getElementsByClassName("champ-img");
  for (let i of button){
  i.addEventListener("click",a) 
  }
}

function a(event){
  let data = Object.values(LOL);
  let selectChamp = event.target.id;
  console.log(data)
  document.getElementById("img-profile").src = data[3][selectChamp]["img"];
  console.log(selectChamp);
}

var filterList = getElementById("filter-list");
filterList.addEventListener("click", filterSelection);

function filterSelection() {
  let filter = filterList.value;
  let listPlayer = document.getElementById("champion-list");
  listPlayer.innerHTML="";
  for (ability in data[filter]) {
    for (i in data[filter][ability]){
      var img = document.createElement("img");
      img.src = data [filter][ability][i]["image"];
      listPlayer.appendChild(image);

    }

  }

};