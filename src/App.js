import React, { Component } from 'react'
import './App.css';
import MovieApp from './components/movieApp'


class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      isLoading : true
    };
  }


  componentDidMount=() => {
    setTimeout(()=>{
      this.setState({ isLoading : !this.state.isLoading });
    }, 500);
  } 

  render(){
    return <div>
    <MovieApp isLoading ={this.state.isLoading}/>
  </div>
  }
}



export default App;
