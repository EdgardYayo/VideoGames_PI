import axios from 'axios';
import swal from 'sweetalert';

export const GET_GAMES = 'GET_GAMES'
export const GET_DETAIL = 'GET_DETAIL'
export const GET_NAME = 'GET_NAME'
export const GET_GENRES = 'GET_GENRES'
export const POST_GAME = 'POST_GAME'
export const ORDER_ALPHA = 'ORDER_ALPHA'
export const ORDER_RATING = 'ORDER_RATING'
export const FILTER_BY_GENRE = 'FILTER_BY_GENRE'
export const FILTER_BY_CREATED = 'FILTER_BY_CREATED'



export const getGames = () => {
    return async function(dispatch){
        const games = await axios.get('http://localhost:3001/games')
        dispatch({
            type: GET_GAMES,
            payload: games.data
        })
    }
}


export const getDetail = (id) => {
    return async function(dispatch){
        const detail = await axios.get(`http://localhost:3001/games/${id}`)
        dispatch({
            type: GET_DETAIL,
            payload: detail.data
        })
    }
}

export const getName = (name) => {
    return async function(dispatch){
        try {
            const videoGame = await axios.get(`http://localhost:3001/games?name=${name}`)
            dispatch({
                type: GET_NAME,
                payload: videoGame.data
            })

        } catch (error) {
            swal('Game not found', 'try other name', 'error')
        }
    }
}



export const getGenres = () => {
    return async function(dispatch){
        const genres = await axios.get('http://localhost:3001/genres')
        dispatch({
            type: GET_GENRES,
            payload: genres.data
        })
    }
}


export const postGame = (payload) => {
    return async function(dispatch){
        const create = await axios.post('http://localhost:3001/games', payload)
        swal('New Videogame has been created', '', 'success')
        return create;
    }
}

export const orderAlpha = (payload) => {
    return {
        type: ORDER_ALPHA,
        payload
    }
}

export const orderRating = (payload) => {
    return {
        type: ORDER_RATING,
        payload
    }
}


export const filterByGenre = (payload) => {
    return {
        type: FILTER_BY_GENRE,
        payload
    }
}


export const filterByCreated = (payload) => {
    return {
        type: FILTER_BY_CREATED,
        payload
    }
}