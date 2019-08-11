// state example: 5
// action example: {type: 'SET_STARS_FILTER', stars: 5}
// state = 0 : giving a default value to the state
const starsFilter = (state = 0, action) => {
    if(action.type === 'SET_STARS_FILTER') {
        return action.stars
    }
    return state
}
export default starsFilter