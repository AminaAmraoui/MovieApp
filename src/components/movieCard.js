import React from 'react'
import './movieCard.css'
import Rating from './rating'

const MovieCard =(props)=>{

    let film=props.film
    
    /* props.film===undefined && (film={title:'',img:'https://www.mearto.com/assets/no-image-83a2b680abc7af87cfff7777d0756fadb9f9aecd5ebda5d34f8139668e0fc842.png',
                                stars:0}) */
   
   return <div className="movie">
        <div>
            <div className="top-left">
                {film.stars && <Rating stars={film.stars}/>}               
            </div>
            {props.innerJSX}
            {film.img && <img src={film.img} alt={film.title}/>}
        </div>
        <h2>{film.title}</h2>
    </div>
}

export default MovieCard