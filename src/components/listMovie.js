import React from 'react'
import './listMovie.css'
import MovieCard from './movieCard'

function Movies(props){
    return props.movieList.map((currentMovie) =>
        <div key={currentMovie.id}>
          <MovieCard film={currentMovie}/>
        </div>
      )
    }

export default Movies