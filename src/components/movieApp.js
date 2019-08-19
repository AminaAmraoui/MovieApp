import React, { Component } from "react";
import "../App.css";
import FilmSerach from "./search";
import MovieCard from "./movieCard";
import ModalFilm from "./ModalFilm";
import RatingSearch from "./ratingSearch";
import LoaderHOC from "../HOC/LoaderHOC";
import { connect } from "react-redux";
import { addMovie } from "../actions/actionCreator";
import { bindActionCreators } from "redux";

class MovieApp extends Component {
  /******** Constructor ********/
  constructor(props) {
    super(props);
    this.state = {
      newTitle: "No Title",
      newStars: 1,
      edit: false,
      /**states of modal */
      modalIsOpen: false,
      movie: { title: "", stars: 1 }
    };
  }

  getMovie = movie => {
    this.setState({ movie });
  };
  onEdit = edit => {
    this.setState({ edit });
  };
  openModal = () => {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen
    });
  };

  getNewInputs(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  getNewImg(event) {
    var file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.setState({
        newImg: reader.result
      });
    };
  }
  /****************** */

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

        
          <div className="list-movies">
            <div className="list-movies-map">
            {this.props.movieList.map(currentMovie => (
              <MovieCard
                film={currentMovie}
                modalIsOpen={this.state.modalIsOpen}
                openModal={this.openModal}
                key={currentMovie.id}
                getMovie={this.getMovie}
                onEdit={this.onEdit}
              />
            ))}
          </div>
            <MovieCard
              innerJSX={
                <input
                  type="button"
                  value="+"
                  className="add-btn"
                  onClick={() => {
                    this.openModal();
                    this.onEdit(false);
                    this.setState({
                  movie: { title: "", stars: 1, img: "" }

                    })
                  }}
                />
              }
              film={{ img: "", title: "" }}
            />
          </div>

          <ModalFilm
            edit={this.state.edit}
            film={this.state.movie}
            modalIsOpen={this.state.modalIsOpen}
            openModal={this.openModal}
          />
        </div>
      
    );
  }
}

const mapStateToProps = state => {
  return {
    movieList: state.movies.filter(
      el =>
        el.stars >= state.starsFilter &&
        el.title.toLowerCase().includes(state.titleFilter.toLowerCase().trim())
    )
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      addMovie
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoaderHOC(MovieApp));

{
  /* <Modal
              isOpen={this.state.modalIsOpen}
              onAfterOpen={this.afterOpenModal}
              onRequestClose={this.openModal}
              contentLabel="Add New Movie"
            >
              <div className="addmovie-container">
                <h2>Add New Movie</h2>
                <input
                  type="text"
                  name="newTitle"
                  placeholder="Film Title"
                  onChange={e => this.getNewInputs(e)}
                />
                <input
                  type="text"
                  name="newStars"
                  placeholder="Film Rating"
                  onChange={e => this.getNewInputs(e)}
                />
                <input
                  type="file"
                  name="newImg"
                  placeholder="Film Img"
                  onChange={e => this.getNewImg(e)}
                />

                <div className="addmovie-btn">
                  <input
                    type="button"
                    value="Add"
                    onClick={() => {
                      this.openModal(); 



                      this.props.addMovie({
                       
                        
                        id: Math.random(),
                        title: this.state.newTitle,
                        stars: Math.min(5, Number(this.state.newStars)),
                        img: this.state.newImg
                      });
                    }}
                  />
                  <button
                    type="button"
                    value="Close"
                    onClick={this.openModal}
                    className="btn btn-danger px-4"
                  >
                    Close
                  </button>
                </div>
              </div>
            </Modal> */
}
