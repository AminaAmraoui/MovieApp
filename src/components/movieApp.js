import React, {Component} from 'react';
import Modal from 'react-modal';
import '../App.css';
import FilmSerach from './search'
import MovieCard from './movieCard'
import Movies from './listMovie'
import RatingSearch from './ratingSearch'
import LoaderHOC from '../HOC/LoaderHOC'


const theFilms = [
  {
    id:'1',
    img:'http://www.gstatic.com/tv/thumb/v22vodart/16815150/p16815150_v_v8_ac.jpg',
    title:'The perfection',
    stars:4
  },
  {
    id:'2',
    img:'https://i.pinimg.com/474x/7e/78/bf/7e78bfc0e0f907f0dc15003e9c537d73.jpg',
    title:'The Lion King',
    stars:5
  },
  {
    id:'3',
    img:'http://www.gstatic.com/tv/thumb/v22vodart/16169325/p16169325_v_v8_aa.jpg',
    title:'Bird Box',
    stars:3
  },
  {
    id:'4',
    img:'http://www.gstatic.com/tv/thumb/v22vodart/16169325/p16169325_v_v8_aa.jpg',
    title:'Bird Box',
    stars:3
  },
  {
    id:'5',
    img:'http://www.gstatic.com/tv/thumb/v22vodart/16169325/p16169325_v_v8_aa.jpg',
    title:'Bird Box',
    stars:3
  }
]

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};



class MovieApp extends Component{

/******** Constructor ********/
constructor(props) {
  super(props)
  this.state = {
    minRating: 1,
    movies: theFilms,
    titleSearch:'',
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

/** Filtring list of movies  Method*/
getVisibleMovies() {
  return this.state.movies.filter(
    el =>
      el.stars >= this.state.minRating &&
      el.title.toLowerCase().includes(this.state.titleSearch.toLowerCase().trim())
    )
}

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
        <FilmSerach 
          filmname={this.state.titleSearch}
          onChange={(newtitleSearch) => {
            this.setState({
              titleSearch: newtitleSearch
            })
          }}/>
        <RatingSearch 
          stars={this.state.minRating}
           onChange={(rating) => {
            this.setState({
              minRating: rating
            })
          }}/>
      </div>

       {/***** Display List of movies & add a movie******/}

       <div className="display-movies">
          <div className="list-movies">
            <Movies movieList={this.getVisibleMovies()} />
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
                                              this.addNewMovie({
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

export default LoaderHOC(MovieApp);
