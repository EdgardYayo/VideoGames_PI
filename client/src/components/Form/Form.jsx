import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { getGenres, postGame } from "../../redux/actions";
import "./Form.css";
import swal from 'sweetalert';




export default function Form() {

    const dispatch = useDispatch()
    const allGenres = useSelector(state => state.genres)
    const history = useHistory()
    const [input, setInput] = useState({
        name: '',
        released: '',
        rating: 0,
        platforms: [],
        genres: [],
        description: '',
        image: ''
    })

    const [errors, setErrors] = useState({})

    const validate = (input) => {
        let errors = {};
        if (!input.name) {
            errors.name = 'Name is required';
        } else if (!/^[a-zA-Z0-9-() .]+$/.test(input.name)) {
            errors.name = 'You must use letters, numbers, parenthesis or scripts';
        }
        else if (input.name.length > 20) {
            errors.name = "The name is too long";
        };


        if (!input.image.length || !/^(ftp|http|https):\/\/[^ "]+$/.test(input.image)
        ) {
            errors.image = 'Invalid URL format for image';
        };


        if (!input.description) {
            errors.description = 'Drescription is required';
        } else if (input.description.length > 400) {
            errors.description = 'The description is too long. (Max = 400 characters)';
        };


        if (!input.released) {
            errors.released = 'Released is required';
        } else if (input.released.length < 10) {
            errors.released = "Enter data for released: yyyy-mm-dd";
        }
        if (input.released.length > 10 || !/^[0-9-]+$/.test(input.released)) {
            errors.released = "Valid released date is required(yyyy-mm-dd)"
        }


        if (!input.rating) {
            errors.rating = 'Rating is required';
        } else if (input.rating > 5) {
            errors.rating = 'Rating must not be greater than 5';
        } else if (input.rating < 1.0) {
            errors.rating = 'Rating must not be less than 1.0';
        };

        return errors;
    }

    const handleChange = (e) => {
        if (e.target.parentNode.id === 'platforms') {
            if (e.target.checked) {
                setInput({
                    ...input,
                    platforms: input.platforms.concat(e.target.name)
                })
            } else {
                setInput({
                    ...input,
                    platforms: input.platforms.filter(x => e.target.name !== x)
                })
            }
        } else {
            setInput({
                ...input,
                [e.target.name]: e.target.value
            });
            setErrors(validate({
                ...input,
                [e.target.name]: e.target.value
            }))
        }
    }

    const handleSelect = (e) => {
         if (input.genres.includes(e.target.value)) {
             swal('You must choose different genres', 'Please select other genre', 'error' )
         } else if (input.genres.length < 2) {
            setInput({
                ...input,
                genres: [...new Set([...input.genres, e.target.value])]
            })
            e.target.value = 'Select Genres'
        } else {
            swal('Two genres at most', '', 'error')
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            !errors.name &&
            !errors.image &&
            !errors.description &&
            !errors.released &&
            !errors.rating
        ) {
            dispatch(postGame(input)); //cambiar
            setInput({
                name: '',
                released: '',
                rating: 0,
                platforms: [],
                genres: [],
                description: '',
                image: ''
            });
            history.push('/home')
        } else {
            swal('Error. Check the form', 'You must be missing somenthing', 'error');
        }
    }

    const handleDelete = (e) => {
        setInput({
            ...input,
            genres: input.genres.filter(g => g !== e)
        })
    }

    useEffect(() => {
        dispatch(getGenres())
    }, [dispatch])

    return (
        <form className="cont_form" onSubmit={(e) => handleSubmit(e)}>
            <strong className="stg">Create Videogame</strong>
            <Link to='/home'>
                <button className='b_form' id='b_form2'>Home🏠</button>
            </Link>
            <div className="div_form">
                <label>Name:</label>
                <input value={input.name} name='name' onChange={(e) => handleChange(e)} />
                <p>{errors.name}</p>
            </div>
            <div className="div_form" id="rel_form" >
                <label>Released:</label>
                <input value={input.released} name='released' onChange={(e) => handleChange(e)} type='date' />
                <p>{errors.released}</p>
            </div>
            <div className="div_form">
                <label>Rating {input.rating}🌟:</label>
                <input value={input.rating} step='0.1' name='rating' onChange={(e) => handleChange(e)} type='range' min='1' max='5'/>
                <p>{errors.rating}</p>
            </div>
            <div className="check_form">
                <label style={{marginRight: "5px", padding:"2px 5px"}}>Platforms:</label>
                <div id='platforms' className="check_form">
                    <input onChange={e => handleChange(e)} name='PC' type="checkbox" id="PC" />
                    <label id='e_plat' htmlFor="PC">PC.</label>
                    <input onChange={e => handleChange(e)} name='iOS' type="checkbox" id="iOS" />
                    <label id='e_plat' htmlFor="iOS">iOS.</label>
                    <input onChange={e => handleChange(e)} name='Android' type="checkbox" id="Android" />
                    <label id='e_plat' htmlFor="Android">Android.</label>
                    <input onChange={e => handleChange(e)} name='macOS' type="checkbox" id="macOS" />
                    <label id='e_plat' htmlFor="macOS">macOS.</label>
                    <input onChange={e => handleChange(e)} name='PlayStation 4' type="checkbox" id="PlayStation 4" />
                    <label id='e_plat' htmlFor="PlayStation 4">PlayStation 4.</label>
                    <input onChange={e => handleChange(e)} name='PlayStation 5' type="checkbox" id="PlayStation 5" />
                    <label id='e_plat' htmlFor="PlayStation 5">PlayStation 5.</label>
                    <input onChange={e => handleChange(e)} name='XBOX' type="checkbox" id="XBOX" />
                    <label id='e_plat' htmlFor="XBOX">XBOX.</label>
                    <input onChange={e => handleChange(e)} name='PS Vita' type="checkbox" id="PS Vita" />
                    <label id='e_plat' htmlFor="PS Vita">PS Vita.</label>
                </div>
            </div>
            <div className="genres_form">
                <select onChange={(e) => handleSelect(e)}>
                    <option>Select Genres</option>
                    {allGenres?.map(g => {
                        return (
                            <option key={g.id} value={g.name}>{g.name}</option>
                        )
                    })}
                </select>
                {input.genres.map(g => {
                    return (
                        <div key={g}>
                            <p>{g}<button className="delete" id="delete" onClick={() => handleDelete(g)}>✘</button></p>
                        </div>
                    )
                })}
            </div>
            <div className="div_form" id="des_form">
                <label>Description:</label>
                <textarea style={{ borderRadius: "10px", marginLeft:"5px"}} value={input.description} onChange={(e) => handleChange(e)} name='description' />
                <p>{errors.description}</p>
            </div>
            <div className="div_form">
                <label>Image:</label>
                <input value={input.image} onChange={(e) => handleChange(e)} name='image' />
                <p>{errors.image}</p>
            </div>

            { input.name && input.image && input.description && input.released && input.rating && input.platforms.length && input.genres.length ? <button className='b_form' type="submit">Create</button> : <p id="p_form">Must fill all the form</p> }
        </form>
    )
}