import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import movieReducer from "../features/movie/movieSlice";
import movieDetailsReducer from "../features/movie/movieDetailsSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  movie: movieReducer,
  movieDetails: movieDetailsReducer,
});

export default rootReducer;
