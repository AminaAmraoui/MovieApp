import React from 'react'
import './rating.css'

/** onChangeRating = () => {} : giving a default value to the function,
 * to avoid decalring it in every rating component
 * rating component sending i+1 through onChangeRating method
 */

function  Rating ({stars, onChangeRating = () => {}}){
    let tableRating =[]
    for (let i=0;i<5;i++){

        if(i<stars) {
             tableRating.push(<i className="fas fa-star" key={i} 
                            onClick={() => onChangeRating(i+1)}></i>)
        }else {
            tableRating.push(<i className="far fa-star" key={i}
                                onClick={() => onChangeRating(i+1)}></i>)
        }
}
    return <div className="rating">{tableRating}</div>
}
export default Rating