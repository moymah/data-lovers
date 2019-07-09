import React, {useState, useEffect} from 'react';
import ChampIcon from '../components/ChampIcon'

export default function (props) {
  const [data, setData] = useState([]);

useEffect(() => {
  fetch('https://ddragon.leagueoflegends.com/cdn/9.13.1/data/pt_BR/championFull.json')
  .then(response => response.json())
  .then(values =>  setData(Object.values(values["data"])))
}, [])

useEffect(()=> {  console.log(data) }, [data])

function showChampions(currentArray){
  return currentArray.map((champ) => {
  const source = "https://ddragon.leagueoflegends.com/cdn/9.13.1/img/champion/" + champ["image"].full;
    return <ChampIcon id={champ["id"]} text={champ["name"]} imgsrc={source}/>
  })
}
    
  return (
    <div className="App">
      <header id="header-menu">
        <nav class="header-menu inln-flex">
          <ul class="menu-list menu-side inln-flex">
            <li><a href="index.html">Home</a></li>
            <li><a href="champions.html">Champions</a></li>
            <li><a href="https://signup.br.leagueoflegends.com/pt/signup/index#/" target="_blank">Play</a></li>
          </ul>
        </nav>
      </header>
      {showChampions(data)}
    </div>
  );
}