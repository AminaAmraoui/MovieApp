import React, {Component} from 'react';
import Modal from 'react-modal';
import '../App.css';
import {connect} from 'react-redux'
import { editMovie } from '../actions/actionCreator'
import {bindActionCreators} from 'redux'


class ModalFilm extends Component{

/******** Constructor ********/
constructor(props) {
  super(props)
  this.state = {
    valueTitle:this.props.innerFilm.title,
    valueStars:this.props.innerFilm.stars,
    /**states of modal */
    modalIsOpen: false
}

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
}

handleChangeTitle(event) {
    this.setState({valueTitle: event.target.value});
 }
 handleChangeStars(event) {
   this.setState({valueStars: event.target.value});
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

/****************** Render Method *********************/

  render() {
  return (
    <div className="container-fluid">
         
         
         <i className="far fa-edit" onClick={this.openModal}></i>

                    <Modal
                              isOpen={this.state.modalIsOpen}
                              onAfterOpen={this.afterOpenModal}
                              onRequestClose={this.closeModal}
                              contentLabel="Edit Movie"
                            >
                            <div className="addmovie-container">   
                              <h2>Edit Movie</h2>
                              <input type="text" name="newTitle" placeholder="Film Title" value={this.state.valueTitle} onChange={(e)=>{this.getNewInputs(e);this.handleChangeTitle(e)}}/>
                              <input type="text" name="newStars" placeholder="Film Rating" value={this.state.valueStars} onChange={(e)=>{this.getNewInputs(e);this.handleChangeStars(e)}}/>
                              <input type="file" name="newImg" placeholder="Film Img" onChange={(e)=>this.getNewImg(e)}/>
                              
                              <div className="addmovie-btn">
                                  
                                  <input type="button" value="Update"
                                            onClick={()=>
                                              {this.closeModal();  /** call multiple functions on onClick event */
                                              this.props.editMovie({ /**call editMovie: a function from actionCreator */
                                                title: this.state.newTitle || this.props.innerFilm.title,
                                                stars: Number(this.state.newStars)||Number(this.props.innerFilm.stars),
                                                img:this.state.newImg || this.props.innerFilm.img
                                          } ,this.props.innerFilm.id 
                                          )}}
                                    />
                                    <button type="button" value="Close" onClick={this.closeModal} className='btn btn-danger px-4'>Close</button>
                             </div>
                                                              
                              </div>
                            </Modal>          
    
    
    
    </div>
  )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
      editMovie
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(ModalFilm);
