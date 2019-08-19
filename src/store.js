import { createStore, combineReducers } from "redux";
import starsFilterReducer from "./reducers/starsFilter";
import titleFilterReducer from "./reducers/titleFilter";
import moviesReducer from "./reducers/movies";

const store = createStore(
  combineReducers({
    starsFilter: starsFilterReducer,
    titleFilter: titleFilterReducer,
    movies: moviesReducer
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

//test
store.dispatch({
  type: "ADD_MOVIE",
  movie: {
    id: "1",
    img:
      "http://www.gstatic.com/tv/thumb/v22vodart/16815150/p16815150_v_v8_ac.jpg",
    title: "The perfection",
    stars: 4
  }
});
store.dispatch({
  type: "ADD_MOVIE",
  movie: {
    id: "2",
    img:
      "https://i.pinimg.com/474x/7e/78/bf/7e78bfc0e0f907f0dc15003e9c537d73.jpg",
    title: "The Lion King",
    stars: 5
  }
});
store.dispatch({
  type: "ADD_MOVIE",
  movie: {
    id: "3",
    img:
      "http://www.gstatic.com/tv/thumb/v22vodart/16169325/p16169325_v_v8_aa.jpg",
    title: "Bird Box",
    stars: 3
  }
});

export default store;
