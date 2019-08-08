import React from 'react'
import './search.css'

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
        <input type="button" value="Search"/>
    </div>
}

export default FilmSerach