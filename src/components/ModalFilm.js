import React, { Component } from "react";
import Modal from "react-modal";
import "../App.css";
import { connect } from "react-redux";
import { editMovie, addMovie } from "../actions/actionCreator";
import { bindActionCreators } from "redux";

class ModalFilm extends Component {
  /******** Constructor ********/
  constructor(props) {
    super(props);
    this.state = {
      valueTitle: "",
      valueStars: 1,
    };
  }

  componentDidUpdate = prevProps => {
    console.log(this.props.edit)
    console.log(prevProps.edit)
    prevProps.edit !== this.props.edit &&
      this.setState({
        valueTitle: this.props.film.title,
        valueStars: this.props.film.stars,
        newImg: this.props.film.img
      });
  };

  getNewInputs = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  getNewImg = e => {
    var file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.setState({
        newImg: reader.result
      });
    };
  };
  /****************** */

  /****************** Render Method *********************/

  render() {
    return (
      <div className="container-fluid">
        <Modal
          ariaHideApp={false}
          isOpen={this.props.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.props.openModal}
          contentLabel={this.props.edit?"Edit Movie":"Add Movie"}
        >
          <div className="addmovie-container">
            
            {this.props.edit?<h2>Edit Movie</h2>:<h2>Add Movie</h2>}
            <input
              type="text"
              name="valueTitle"
              placeholder="Film Title"
              value={this.state.valueTitle}
              onChange={this.getNewInputs}
            />
            <input
              type="number"
              name="valueStars"
              placeholder="Film Rating"
              value={this.state.valueStars}
              onChange={this.getNewInputs}
              max="5"
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
                value={this.props.edit?"Update":"Add"}
                onClick={() => {
                  this.props.openModal();
                  this.props.edit ? (this.props.editMovie(
                    {
                      title: this.state.valueTitle,
                      stars: this.state.valueStars,
                      img: this.state.newImg
                    },
                    this.props.film.id
                  )):(this.props.addMovie({ 
                    id: Math.random(),
                    title: this.state.valueTitle,
                    stars: this.state.valueStars,
                    img:this.state.newImg
                }))
                }}
              />
              <button
                type="button"
                value="Close"
                onClick={this.props.openModal}
                className="btn btn-danger px-4"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      editMovie,
      addMovie
    },
    dispatch
  );
};

export default connect(
  null,
  mapDispatchToProps
)(ModalFilm);
