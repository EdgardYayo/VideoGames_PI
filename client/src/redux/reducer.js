import { FILTER_BY_CREATED, FILTER_BY_GENRE, GET_DETAIL, GET_GAMES, GET_GENRES, GET_NAME, ORDER_ALPHA, ORDER_RATING, POST_GAME } from "./actions";
import swa from 'sweetalert';

const initialState = {
    games: [],
    allGames: [],
    detail: {},
    genres: []

}


function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_GAMES:
            return {
                ...state,
                games: action.payload,
                allGames: action.payload,
            }
        case GET_DETAIL:
            return {
                ...state,
                detail: action.payload
            }
        case GET_GENRES:
            return {
                ...state,
                genres: action.payload
            }
        case GET_NAME:
            return {
                ...state,
                games: action.payload
            }
        case FILTER_BY_GENRE:
            let filterGenre;
            if (action.payload) {
                filterGenre = state.allGames.filter(elem => {

                    if (elem.genres.some(e => e.name === action.payload)) {
                        return elem.genres.map(el => el.name === action.payload)
                    } else {
                        return elem.genres.includes(action.payload)
                    }
                })
            }
            function isItEmpty(arr){
                if(arr.length === 0){
                    swa('There is no games with this genre at the moment', 'Please try another one', 'error')
                    return state.allGames;
                } else {
                    return arr;
                }
            }
            return {
                ...state,
                games: action.payload === 'All' ? state.allGames : isItEmpty(filterGenre)
            }
        case ORDER_ALPHA:
            if (action.payload === 'A-Z') {
                return {
                    ...state, games: [...state.games].sort((prev, next) => {
                        if (prev.name > next.name) return 1
                        if (prev.name < next.name) return -1
                        return 0
                    })
                }
            }

            if (action.payload === 'Z-A') {
                return {
                    ...state, games: [...state.games].sort((prev, next) => {
                        if (prev.name > next.name) return -1
                        if (prev.name < next.name) return 1
                        return 0
                    })
                }
            }
            else {
                return {
                    ...state,
                    games: state.games
                }
            }
        case ORDER_RATING:
            let orderRating;
            if (action.payload === 'high') {
                orderRating = state.games.sort((a, b) => b.rating - a.rating)
            } else if (action.payload === 'low') {
                orderRating = state.games.sort((a, b) => a.rating - b.rating)
            } else {
                orderRating = state.games
            }
            return {
                ...state,
                games: orderRating
            }
        case POST_GAME:
            return {
                ...state
            }
        case FILTER_BY_CREATED:
            let filtered;
            if (action.payload === 'created') {
                filtered = state.allGames.filter(g => g.createdInDb)
            } else if (action.payload === 'api') {
                filtered = state.allGames.filter(g => !g.createdInDb)
            } else {
                filtered = state.allGames
            }

            return {
                ...state,
                games: filtered
            }
        default:
            return {
                ...state
            }
    }
}

export default rootReducer