import React from 'react'
import './movieCard.css'
import Rating from './rating'
import { connect } from 'react-redux'

const MovieCard = (props) => {
        const { film,
            onDelete,
            openModal,
             innerJSX,  getMovie, onEdit } = props

        const {
            id,
            title = 'No Title',
            img = require('../img/noimg.png'),
            stars,
        } = film
        return <div className="movie">
            <div>
                <div className={innerJSX ? "" : "overlay-container"} >
                    <div className="top-left">
                        {stars && <Rating stars={stars} />}
                    </div>
                    {innerJSX}

                    <img src={img} alt={title} />
                    <div className="overlay">
                        <div className="text">
                            <button type="button" value="delete" onClick={() => onDelete(id)} className='btn btn-info'><i className="far fa-trash-alt"></i></button>
                            <i className="far fa-edit" onClick={()=>{openModal(); getMovie(film); onEdit(true)}}></i>

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

    

export default connect(null, mapDispatchToProps)(MovieCard)