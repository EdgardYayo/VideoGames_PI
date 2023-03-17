import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css";



export default function Landing(){
    return(
        <div className="cont_landing">
            <h1 id="title">Videogames</h1>
            <Link to='/home'>
                <button className="button_landing">🚪Enter🎮</button>
            </Link>
        </div>
    )
}