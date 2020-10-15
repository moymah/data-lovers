import React from 'react';
import './ChampIcon.css'

export default function (props) {
    return (
        <section className="champion" onClick={props.onClick}>
        <img src ={props.imgsrc} id={props.id} alt={props.text} className="champ-img" />
        <section>
          <p htmlFor={props.id} className="champ-name">{props.text}</p>
        </section>
      </section>
    );
}