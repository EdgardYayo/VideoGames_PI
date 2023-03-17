import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByCreated, filterByGenre, getGenres, getName, orderAlpha, orderRating } from "../../redux/actions";
import "./Nav.css";



export default function Nav ({setCurrentPage, setOrder}){

    const dispatch = useDispatch()
    const allGenres = useSelector(state => state.genres)
    console.log(allGenres);
    const [name, setName] = useState('')


    useEffect(() => {
        dispatch(getGenres())
    }, [dispatch])

    const handleOrderAlpha = (e) => {
        e.preventDefault()
        dispatch(orderAlpha(e.target.value))
        setCurrentPage(1)
        setOrder(e.target.value)
    }

    const handleOrderRating = (e) => {
        e.preventDefault()
        dispatch(orderRating(e.target.value))
        setCurrentPage(1)
        setOrder(e.target.value)
    }

    const handleFilterGenre = (e) => {
        e.preventDefault()
        dispatch(filterByGenre(e.target.value))
        setCurrentPage(1)
    }


    const handleFilterCreated = (e) => {
        e.preventDefault()
        dispatch(filterByCreated(e.target.value))
        setCurrentPage(1)
    }


    const handleSearchName = (e) => {
        e.preventDefault()
        setName(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(getName(name))
        setName('')
    }

    return(
        <nav>
            <div className="cont_nav">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <input id="inp_nav" onChange={(e) => handleSearchName(e)} value={name} type="text" placeholder="🔎..." />
                    <button id="b_nav" type="submit">↵</button>    
                </form>
                <select onChange={(e) => handleOrderAlpha(e)}>
                    <option>Order Name</option>
                    <option value='A-Z'>A-Z</option>
                    <option value='Z-A'>Z-A</option>
                </select>
                <select onChange={(e) => handleOrderRating(e)}>
                    <option>Order Rating</option>
                    <option value='high'>High</option>
                    <option value='low'>Low</option>
                </select>
                <select onChange={(e) => handleFilterCreated(e)}>
                    <option value='all'>Filter Origin</option>
                    <option value='api'>Api</option>
                    <option value='created'>Created</option>
                </select>
                <select onChange={(e) => handleFilterGenre(e)}>
                    <option value='All'>Filter Genre</option>
                    { allGenres?.map(g => {
                        return (
                            <option key={g.id} value={g.name}>{g.name}</option>
                        )
                    })}
                </select>
            </div>
        </nav>
    )
}