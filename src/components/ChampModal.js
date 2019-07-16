import React, {useState, useEffect} from 'react';
import './ChampModal.css';

export default function (props) {

  const [selectedSkill, setSelectedSkill] = useState("");
  const [titleSkill, setTitleSkill] = useState("");

  useEffect(() => {
    setSelectedSkill(props.champion["passive"]["description"]);
    setTitleSkill(props.champion["passive"]["name"]);
  }, [props.champion])

  const style = {
    backgroundImage: `url(https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${props.champion["id"]}_0.jpg)`,
    backgroundPosition: "center",
    backgroundSize: "cover",
  }

  function setSkill(mode, skill){
    if(mode === "passive") {
      setTitleSkill(props.champion[mode]["name"]);
      setSelectedSkill(props.champion[mode]["description"]);
    }else{ 
      setTitleSkill(props.champion[mode][skill]["name"]);
      setSelectedSkill(props.champion[mode][skill]["description"])
    }
  }

  function mapStats(statClass, statType, accum, descrip){
    const cssClass = `stats ${statClass}`;
    let acronm = "";
    if(accum !== "none") {
      acronm = `(+${props.champion["stats"][accum]} por nível)` 
    }
    return <p className="stats-format">
      <span className={cssClass}>
        {descrip}:
      </span>
      <p className="stat-descrip">{props.champion["stats"][statType]} {acronm}</p>
    </p>
  }

  return(
  <section className="main-modal" style={style}>
    <main className="grid">
      <img className="image-profile" src={`https://ddragon.leagueoflegends.com/cdn/9.13.1/img/champion/${props.champion["id"]}.png`} alt="Imagem do Campeão"></img>
      <section className="skill-profile">
        <h1 className="ta-center" >HABILIDADES</h1>
        <img onClick={() => setSkill("passive")} src={`https://ddragon.leagueoflegends.com/cdn/9.13.1/img/passive/${props.champion["passive"]["image"]["full"]}`} alt="passive"></img>
        <img onClick={() => setSkill("spells", "0")} src={`https://ddragon.leagueoflegends.com/cdn/9.13.1/img/spell/${props.champion["spells"]["0"]["image"]["full"]}`} alt="Skill Q"></img>
        <img onClick={() => setSkill("spells", "1")} src={`https://ddragon.leagueoflegends.com/cdn/9.13.1/img/spell/${props.champion["spells"]["1"]["image"]["full"]}`} alt="Skill W" ></img>
        <img onClick={() => setSkill("spells", "2")} src={`https://ddragon.leagueoflegends.com/cdn/9.13.1/img/spell/${props.champion["spells"]["2"]["image"]["full"]}`} alt="Skill E"></img>
        <img onClick={() => setSkill("spells", "3")} src={`https://ddragon.leagueoflegends.com/cdn/9.13.1/img/spell/${props.champion["spells"]["3"]["image"]["full"]}`} alt="Skill R"></img>
      </section>
      <article className="skill-descrip-profile">
        <p className="ta-center">{titleSkill.toUpperCase()}</p>
        <p>{selectedSkill}</p>
      </article>
      <section className="content-modal">
        <article className="about-champion-modal">
          <h1 className="title-profile ta-center">{props.champion["name"].toUpperCase()}</h1>
          <article className="descrip-profile">
            <p>{props.champion["lore"]}</p>
          </article>
        </article>
        <div className="block-stat">
          <section className="first-block-stat">
            {mapStats("stat-hp", "hp", "hpperlevel", "Vida")}
            {mapStats("stat-ad", "attackdamage", "attackdamageperlevel", "Dano de Ataque")}
            {mapStats("stat-velat", "attackspeed", "attackspeedperlevel", "Velocidade de Ataque")}
            {mapStats("stat-ms", "movespeed", "none", "Velocidade de Movimento")}
          </section>
          <section className="second-block-stat">
            {mapStats("stat-reghp", "hpregen", "hpregenperlevel", "Regeneração de Vida")}
            {mapStats("stat-armor", "armor", "armorperlevel", "Armadura")}
            {mapStats("stat-mr", "spellblock", "spellblockperlevel", "Resistência Mágica")}
          </section>
        </div>
      </section>
    </main>
  </section>
  );
}