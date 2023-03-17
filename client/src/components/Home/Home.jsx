import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getGames } from "../../redux/actions";
import Game from "../Game/Game";
import Loader from "../Loader/Loader";
import Paged from "../Paged/Paged";
import Nav from "../Nav/Nav";
import './Home.css'



export default function Home() {

    const dispatch = useDispatch()
    const totalGames = useSelector(state => state.games)
    console.log(totalGames)


    const [currentPage, setCurrentPage] = useState(1);
    const [gamesPerPage, setGamesPerPage] = useState(15);
    const [order, setOrder] = useState('');

    const lastIndex = currentPage * gamesPerPage;
    const firstIndex = lastIndex - gamesPerPage;
    const currentGames = totalGames.slice(firstIndex, lastIndex);


    const paged = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(getGames())
    }

    useEffect(() => {
        dispatch(getGames())
    }, [dispatch])

    return (
        <div className="cont_home">
            <section className="nav_home" id="nav">
                <Nav className="search_home" setCurrentPage={setCurrentPage} setOrder={setOrder} />
                <button onClick={(e) => handleClick(e)}>Reset Games and Filters🔄</button>
                <Link to='/form'>
                    <button>Create Videogame🎮🕹️👾</button>
                </Link>
            </section>
            <section className="card_home">
                {currentGames.length ? currentGames?.map(g => {
                    return (
                        <Link className='link_home' to={'/game/' + g.id}>
                            <Game
                                name={g.name}
                                image={g.image}
                                genres={g.genres}
                                rating={g.rating}
                            />
                        </Link>
                    )
                }) : <Loader/> }
            </section>
            <Paged
                gamesPerPage={gamesPerPage}
                totalGames={totalGames.length}
                paged={paged}
                currentPage={currentPage}
            />
        </div>
    )
}