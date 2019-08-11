import React from 'react'
import Rating from './rating'
import {connect} from 'react-redux'

/** RatingSearch component receives i+1 from calling onChangeRating of Rating component
 * places it in newRating variable
 * and sending it through onChange method
 */

 // onChange = () => {} giving a defaut value to onChange
const RatingSearch = ({onChange = () => {}, stars=0}) => {
    return <div className="rating-container">
          <p>Minimum rating</p>
          <Rating onChangeRating={(newRating) =>{
                                    onChange(newRating)
                    }} 
                  stars={stars}/>
    </div>
}

//from component to state: when onChange what action to do
const mapDispatchToProps = dispatch => {
  return {
    onChange: (newRating) => {
      dispatch({
          type: 'SET_STARS_FILTER',
          stars: newRating
      })
  }
  }
}

// mapStateToProps function will fill the props of RatingSearch component with the state of the store
const mapStateToProps = state => {
  return {
      stars: state.starsFilter
  }
}

//creating a smart component from the dump component RatingSearch
const RatingFilterContainer = 
    connect(mapStateToProps,mapDispatchToProps)(RatingSearch)

export default RatingFilterContainer