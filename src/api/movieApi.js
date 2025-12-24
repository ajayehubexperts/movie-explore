import axios from "axios";

const API_KEY = import.meta.env.VITE_MOVIE_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: "en-US",
  },
});

// Fetch movies by category and page
export const fetchMovies = async (category = "popular", page = 1) => {
  try {
    const res = await axiosInstance.get(`/movie/${category}`, {
      params: { page },
    });
    return res.data;
  } catch (err) {
    console.error("Failed to fetch movies:", err.message);
    throw err;
  }
};

// Search movies by query and page
export const searchMovies = async (query, page = 1) => {
  try {
    const res = await axiosInstance.get("/search/movie", {
      params: { query, page },
    });
    return res.data.results;
  } catch (err) {
    console.error("Failed to search movies:", err.message);
    throw err;
  }
};

// Fetch single movie details by ID
export const fetchMovieDetails = async (id) => {
  try {
    const res = await axiosInstance.get(`/movie/${id}`);
    return res.data;
  } catch (err) {
    console.error("Movie not found:", err.message);
    throw err;
  }
};

// fetch movie trailer
export const getMovieTrailer = async (movieId) => {
  const res = await axios.get(
    `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`
  );
  return res.data.results.find(
    (video) => video.type === "Trailer" && video.site === "YouTube"
  );
};

// fetch trending movie
export const fetchTrendingMovies = async () => {
  try {
    const res = await axiosInstance.get("/trending/movie/day");
    return res.data;
  } catch (err) {
    console.error("Failed to fetch trending movies:", err.message);
    throw err;
  }
};
