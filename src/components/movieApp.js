import React, {Component} from 'react';
import Modal from 'react-modal';
import '../App.css';
import FilmSerach from './search'
import MovieCard from './movieCard'
import Movies from './listMovie'
import RatingSearch from './ratingSearch'
import LoaderHOC from '../HOC/LoaderHOC'
import {connect} from 'react-redux'
import { addMovie } from '../actions/actionCreator'
import {bindActionCreators} from 'redux'


class MovieApp extends Component{

/******** Constructor ********/
constructor(props) {
  super(props)
  this.state = {
    /**states of modal */
    modalIsOpen: false,
    newTitle:'',
    newStars:0,
    newImg:''
}

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
}

/** Modal methods */
openModal() {
  this.setState({modalIsOpen: true});
}

closeModal() {
  this.setState({modalIsOpen: false});
}

getNewInputs(event){
  this.setState({
    [event.target.name]: event.target.value
  })
}
getNewImg(event){
  var file = event.target.files[0]
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      this.setState({
        newImg: reader.result
      })
    }
}
/****************** */

/** Add a new Movie */
addNewMovie(newMovie) {
  this.setState({
    movies: this.state.movies.concat(newMovie)
  })
}

/****************** Render Method *********************/

  render() {
  return (
    <div className="container">
     
      {/***** Banner *********/}
      <div className="intro">
        <h1>Movie App</h1>
      </div>

     {/***** Search by name & rating ********/}

     {/** MovieApp receives from RatingSearch  (i+1 of Rating component) 
        and places it in rating variable*/}
      <div className="search-container">
        <FilmSerach />
        <RatingSearch />
      </div>

       {/***** Display List of movies & add a movie******/}

       <div className="display-movies">
          <div className="list-movies">
            <Movies />
          </div>
          <div className="add-movie">
            <MovieCard innerJSX={<input type="button" value="+" 
                                        className="add-btn" 
                                        onClick={this.openModal}/>} 
                  
                        film={{}}/>

                    <Modal
                              isOpen={this.state.modalIsOpen}
                              onAfterOpen={this.afterOpenModal}
                              onRequestClose={this.closeModal}
                              contentLabel="Add New Movie"
                            >
                            <div className="addmovie-container">   
                              <h2>Add New Movie</h2>
                              <input type="text" name="newTitle" placeholder="Film Title" onChange={(e)=>this.getNewInputs(e)}/>
                              <input type="text" name="newStars" placeholder="Film Rating" onChange={(e)=>this.getNewInputs(e)}/>
                              <input type="file" name="newImg" placeholder="Film Img" onChange={(e)=>this.getNewImg(e)}/>
                              
                              <div className="addmovie-btn">
                                  
                                  <input type="button" value="Add"
                                            onClick={()=>
                                              {this.closeModal();  /** call multiple functions on onClick event */
                                              this.props.addMovie({ /**call addMovie: a function from actionCreator */
                                              id: Math.random(),
                                              title: this.state.newTitle,
                                              stars: Number(this.state.newStars),
                                              img:this.state.newImg
                                          })}}
                                    />
                                    <button type="button" value="Close" onClick={this.closeModal} className='btn btn-danger px-4'>Close</button>
                             </div>
                                                              
                              </div>
                            </Modal>          
          </div>
      </div>
    
    
    
    </div>
  )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
      addMovie
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(LoaderHOC(MovieApp));
