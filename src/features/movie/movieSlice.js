import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMovies, fetchTrendingMovies } from "../../api/movieapi";

// Fetch movies by category and page
export const getMovies = createAsyncThunk(
  "movies/getMovies",
  async ({ category = "popular", page = 1 }, { rejectWithValue }) => {
    try {
      const data = await fetchMovies(category, page);
      return {
        results: data.results,
        page: page,
        totalPages: data.total_pages,
      };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Fetch trending movies
export const getTrendingMovies = createAsyncThunk(
  "movies/getTrendingMovies",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchTrendingMovies();
      return data.results;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const movieSlice = createSlice({
  name: "movie",
  initialState: {
    movies: [],
    trending: [],
    favorites: [],
    loading: false,
    error: null,
    page: 1,
    totalPages: 1,
    category: "popular",
  },
  reducers: {
    addFavorite: (state, action) => {
      if (!state.favorites.find((m) => m.id === action.payload.id)) {
        state.favorites.push(action.payload);
      }
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter((m) => m.id !== action.payload);
    },
    setMovies: (state, action) => {
      state.movies = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
      state.page = 1;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload.results;
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(getMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getTrendingMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTrendingMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.trending = action.payload;
      })
      .addCase(getTrendingMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addFavorite, removeFavorite, setMovies, setCategory, setPage } =
  movieSlice.actions;
export default movieSlice.reducer;
