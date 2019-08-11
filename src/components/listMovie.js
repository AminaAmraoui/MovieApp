import React from 'react'
import './listMovie.css'
import MovieCard from './movieCard'
import {connect} from 'react-redux'

function Movies(props){
    return props.movieList.map((currentMovie) =>
        <div key={currentMovie.id}>
          <MovieCard film={currentMovie}/>
        </div>
      )
    }

const mapStateToProps = state => {
      return {
          movieList:state.movies.filter(
            el =>
              el.stars >= state.starsFilter &&
              el.title.toLowerCase().includes(state.titleFilter.toLowerCase().trim())
            )
      }
}

const MovieListContainer = connect(mapStateToProps)(Movies)


export default MovieListContainer