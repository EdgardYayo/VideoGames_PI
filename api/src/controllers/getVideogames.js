const axios = require('axios')
const { Videogame, Genre } = require('../db')
const { API_KEY } = process.env;

const getGames = async () => {
    const URL = `https://api.rawg.io/api/games?key=d4dfed4573fe44ecb8f1ddf8124451e3`
    let pages = 0;
    let results = [];
    let promise = await axios.get(URL);
    while(pages < 6){
    pages++;
    const apiGames = promise.data.results.map(v => {
        return {
            id:v.id,
            name:v.name,
            released: v.released,
            image: v.background_image,
            rating: v.rating,
            platforms: v.platforms.map(p => p.platform.name),
            genres: v.genres.map(g => g.name)
        }
    })
    results = [...results, ...apiGames]
    promise = await axios.get(promise.data.next) 
}
   // return apiGames;
    const dbGames = await Videogame.findAll({
        include:{
            model:Genre,
            attributes:["name"],
            throught:{
                attributes:[]
            }
        }
    })

   const totalGames = results.concat(dbGames);

//    const listGames = totalGames.map( vg => {
//     return {
//         name:vg.name,
//         id:vg.id,
//         released:vg.released,
//         image:vg.image,
//         platforms:vg.platforms,
//         genres:vg.genres,
//         rating:vg.rating,
//         createdInDb:vg.createdInDb
//     }
//    })
   return totalGames;
}


const gameDetail = async (id) => {
    if(!isNaN(id)){
        const dataApi = await axios.get(`https://api.rawg.io/api/games/${id}?key=d4dfed4573fe44ecb8f1ddf8124451e3`)
        const detail = dataApi.data;


        const gameApiDetail = {
            image: detail.background_image,
            name: detail.name,
            genres: detail.genres,
            description: detail.description,
            released: detail.released,
            rating: detail.rating,
            platforms: detail.platforms.map(p => p.platform.name).toString()
        };

        return gameApiDetail;
    }

    if(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(id)){
        const detailDb = await Videogame.findByPk(id, {
            include:[ {
                model: Genre,
                attributes:["name"],
                throught:{
                    attributes:[],
                }
            }]
        })

        const gameDbInfo = {
            image: detailDb.dataValues.image,
            name: detailDb.dataValues.name,
            genres: detailDb.dataValues.genres,
            description: detailDb.dataValues.description,
            released: detailDb.dataValues.released,
            rating: detailDb.dataValues.rating,
            platforms: detailDb.dataValues.platforms,
            createdInDb: detailDb.dataValues.createdInDb
        }

        return gameDbInfo;
    }
    
}


const createGame = async (name, description, released, rating, image, genres, platforms) => {
    if(!name || !description || !platforms || !image){
        throw ("missing data for create a videogame")
    } else {
        const newGame = await Videogame.create({
            name,
            description,
            released,
            rating,
            image,
            genres,
            platforms

        })

        const newGenre = await Genre.findAll({
            where: {
                name: genres
            }
        })

        newGame.addGenre(newGenre);
        return newGame;
    }
}




module.exports = {
    getGames,
    gameDetail,
    createGame
}