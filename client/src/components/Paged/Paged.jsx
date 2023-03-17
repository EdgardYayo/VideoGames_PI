import React from "react";
import { Link } from "react-router-dom";
import "./Paged.css";


export default function Paged({totalGames, paged, gamesPerPage, currentPage}){
    const pagination = [];
    for(let i = 1; i <= Math.ceil(totalGames/gamesPerPage); i++){
        pagination.push(i)
    }

    const max = Math.max(...pagination)

    return(
        <div className="cont_paged">
            <ul className="list_paged">
            <Link to='/'>
                <div id='paged_div'>
                    <button className="button_paged">⭅Landing</button>
                </div>
            </Link>
            <button className="number_paged" onClick={ currentPage > 1 ? () => paged(currentPage - 1) : null}
            disabled={ currentPage === 1 ? true : false }>◀</button>
                { pagination.length && pagination?.map(number => {
                    return (
                        <button className="number_paged" key={number} onClick={() => paged(number)}>{number}</button>
                    )
                })}
            <button className="number_paged" onClick={ currentPage < max ? () => paged(currentPage + 1) : null}
            disabled={ currentPage === max ? true : false }>▶</button>
            </ul>
        </div>
    )


}