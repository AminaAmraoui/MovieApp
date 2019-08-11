import React from 'react'
import './search.css'
import {connect} from 'react-redux'


/** FilmSerach component send, through onChange method, event.target.value */

const FilmSerach =({filmname ='', onChange = () => {}})=>{
    return <div className="search">
        <input 
            type="text" 
            id="name" 
            placeholder="Tape movie name to Search.."
            value={filmname}
            onChange={(event) => {
                onChange(event.target.value)
            }}/>
    </div>
}

//mapDispatchToProps: from the props to the state of the store
const mapDispatchToProps = dispatch => {
    return {
        onChange: (newTitle) => {
            dispatch({
                type: 'SET_TITLE_FILTER',
                title: newTitle
            })
        }
    }
}

//fill the props of the component with the state of the store
const mapStateToProps = state => {
    return {
        filmname:state.titleFilter
    }
}
//smart component
const FilmSerachContainer = connect(mapStateToProps,mapDispatchToProps)(FilmSerach)

export default FilmSerachContainer