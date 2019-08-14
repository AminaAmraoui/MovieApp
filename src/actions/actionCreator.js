
export const addMovie = movie => ({
    type: 'ADD_MOVIE',
    movie
})

export const editMovie = (movie, id) => ({
    type: 'EDIT_MOVIE',
    movie,
    id
})