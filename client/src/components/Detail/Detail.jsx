import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../redux/actions";
import { Link } from 'react-router-dom'
import './Detail.css';




export default function Detail(props) {
    const { id } = props.match.params
    const dispatch = useDispatch()
    const detail = useSelector(state => state.detail)
    console.log(detail)

    useEffect(() => {
        dispatch(getDetail(id))
    }, [dispatch, id])

    return (
        <div className="cont_detail">
            <Link to='/home'>
                <button id="b_detail">Back to Home</button>
            </Link>
            <h3 className="name_detail">{detail.name}</h3>
            <img className="img_detail" src={detail.image} alt='game' />
            <div className="second_detail">
                <h4>Platforms: {typeof detail.platforms === "object"
                ? detail.platforms.map((e) => e).join(", ")
                : detail.platforms?.split(",").join(", ")}🕹️</h4>
                <h4>Rating: {detail.rating}♡</h4>
                <h4>Released: {detail.released}</h4>
                <h4>Genres: {detail.genres?.map(g => g.name + ' ')}</h4>
            </div>
            <p className="descript_detail">Description: {detail.description?.replace(/(<([^>]+)>)/gi, "")}</p>
        </div>
    )
}