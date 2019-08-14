import React from 'react'
import './movieCard.css'
import Rating from './rating'
import {connect} from 'react-redux'
import ModalFilm from './ModalFilm'

const MovieCard =(props)=>{
    
    const {film = {},
    onDelete = () => {},
    onEdit = () => {}} = props
    const {
        id,
        title = 'No Title',
        img = require('../img/noimg.png'),
        stars,
    } = film
   
   return <div className="movie">
        <div>
        <div className={props.innerJSX ? "" : "overlay-container"} >
            <div className="top-left">
                {stars && <Rating stars={stars}/>}       
            </div>
            {props.innerJSX}
            
                    <img src={img} alt={title}/>
                    <div className="overlay">
                                <div className="text">
                                    <button type="button" value="delete" onClick={() => onDelete(id)} className='btn btn-info'><i className="far fa-trash-alt"></i></button>
                                    <ModalFilm innerFilm={film}/>
                                </div>
                    </div>
            </div>
        </div>
        <h2>{title}</h2>
    </div>

    
   
}

const mapDispatchToProps = dispatch => {
    return {
        onDelete: (id) => {
            dispatch({
                type: 'DELETE_MOVIE',
                id: id
            })
        }
    }
}

const MovieCardContainer =
    connect(null, mapDispatchToProps)(MovieCard)

export default MovieCardContainer