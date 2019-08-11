// state example: 'incep'
// action example: {type: 'SET_TITLE_FILTER', title: 'incept'}
// state ='' giving a default value to the state
const titleFilter = (state ='', action) =>{
    if(action.type === 'SET_TITLE_FILTER') {
        return action.title
    }
    return state
}

export default titleFilter