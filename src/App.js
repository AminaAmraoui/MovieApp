import React, { Component } from 'react'
import './App.css';
import MovieApp from './components/movieApp'
import {Provider} from 'react-redux'
import store from './store'


class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      isLoading : true
    };
  }


  /**when mounting the App, isLoading changes to true */
  componentDidMount=() => {
    setTimeout(()=>{
      this.setState({ isLoading : !this.state.isLoading });
    }, 500);
  } 

  render(){
    return <Provider store={store}>
    <MovieApp isLoading ={this.state.isLoading}/>
  </Provider>
  }
}



export default App;
