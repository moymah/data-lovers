import React from 'react';
import './ChampIcon.css'

export default function (props) {
    return (
        <section className= "champion">
        <img src ={props.imgsrc} id={props.id} className="champ-img" />
        <section>
          <p label for={props.id} className="champ-name">{props.text}</p>
        </section>
      </section>
    );
}