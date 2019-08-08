import React from 'react'
import Rating from './rating'

/** RatingSearch component receives i+1 from calling onChangeRating of Rating component
 * places it in newRating variable
 * and sending it through onChange method
 */

const RatingSearch = ({onChange, stars}) => {
    return <div className="rating-container">
          <p>Minimum rating</p>
          <Rating onChangeRating={(newRating) =>{
                                    onChange(newRating)
                    }} 
                  stars={stars}/>
    </div>
}

export default RatingSearch