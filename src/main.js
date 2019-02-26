window.onload = function (){
  showChampions();
}

function getChampion(){
    return Object.values(list["data"]);
  }
  console.log(getChampion());

function showChampions(){
  let championSection = document.getElementById("champion-list");
  championSection.innerHTML = `
  ${getChampion().map((champ) =>`
      <section class="champion">
        <img src ="${champ["img"]}" class="champ-img" />
        <section>
        <p class="champ-name"> ${champ["name"]} </p>
        </section>
      </section>
    `).join("")}
  `
}