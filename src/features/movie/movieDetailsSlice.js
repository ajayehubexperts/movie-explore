import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMovieDetails } from "../../api/movieapi";

export const getMovieDetails = createAsyncThunk(
  "movieDetails/getMovieDetails",
  async (id, { rejectWithValue }) => {
    try {
      const data = await fetchMovieDetails(id);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const movieDetailsSlice = createSlice({
  name: "movieDetails",
  initialState: {
    movie: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearMovie: (state) => {
      state.movie = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMovieDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMovieDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.movie = action.payload;
      })
      .addCase(getMovieDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMovie } = movieDetailsSlice.actions;
export default movieDetailsSlice.reducer;
