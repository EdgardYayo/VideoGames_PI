import React from "react";
import './Game.css';



export default function Game ({name, image, genres, rating}){
    
    return (
        <div className="cont_game">
            <h3 className="name_game">{name}</h3>
            <img className="img_game" src={image} alt='game'/>
            <p className="details_game">Genres: {
             genres.every(e => typeof e === 'string' ) ? genres?.map(g => g + ' ') : genres?.map(g => g.name + ' ')
             }</p>
            <p className="details_game">Rating: {rating}⭐</p>
        </div>
    )
}