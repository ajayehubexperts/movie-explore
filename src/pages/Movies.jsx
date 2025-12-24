import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getMovies,
  addFavorite,
  removeFavorite,
  setMovies,
  setCategory,
  setPage,
} from "../features/movie/movieSlice";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Form,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { searchMovies } from "../api/movieapi";

const Movies = () => {
  const dispatch = useDispatch();
  const { movies, favorites, loading, error, page, totalPages, category } =
    useSelector((state) => state.movie);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch movies for current page/category
  useEffect(() => {
    dispatch(getMovies({ category, page }));
  }, [dispatch, category, page]);

  // Favorite toggle
  const handleFavorite = (movie) => {
    if (favorites.find((m) => m.id === movie.id)) {
      dispatch(removeFavorite(movie.id));
    } else {
      dispatch(addFavorite(movie));
    }
  };

  // Search movies
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm) return;
    try {
      const results = await searchMovies(searchTerm);
      dispatch(setMovies(results));
    } catch (err) {
      console.error(err);
    }
  };

  const handleCategoryChange = (newCategory) => {
    dispatch(setCategory(newCategory));
  };

  return (
    <Container className="mt-4">
      <Form className="d-flex mb-3" onSubmit={handleSearch}>
        <Form.Control
          type="search"
          placeholder="Search movies..."
          className="me-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button type="submit" variant="outline-success">
          Search
        </Button>
      </Form>

      <div className="mb-3">
        <Button
          variant="primary"
          className="me-2"
          onClick={() => handleCategoryChange("popular")}
        >
          Popular
        </Button>
        <Button
          variant="secondary"
          className="me-2"
          onClick={() => handleCategoryChange("top_rated")}
        >
          Top Rated
        </Button>
        <Button
          variant="warning"
          onClick={() => handleCategoryChange("upcoming")}
        >
          Upcoming
        </Button>
      </div>

      {loading && (
        <Spinner animation="border" className="d-block mx-auto mt-5" />
      )}
      {error && <p className="text-center mt-5 text-danger">{error}</p>}

      <Row>
        {movies.map((movie) => (
          <Col md={4} lg={3} sm={6} xs={12} key={movie.id} className="mb-4">
            <Card className="h-100 d-flex flex-column">
              <Link to={`/movies/${movie.id}`} className="text-decoration-none">
                <Card.Img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  style={{ height: "300px", objectFit: "cover" }}
                />
              </Link>
              <Card.Body className="d-flex flex-column">
                <Card.Title style={{ fontSize: "1rem", fontWeight: 600 }}>
                  <Link
                    to={`/movies/${movie.id}`}
                    className="text-decoration-none"
                  >
                    {movie.title}
                  </Link>
                </Card.Title>
                <Card.Text
                  className="text-muted"
                  style={{
                    fontSize: "0.85rem",
                    marginBottom: "0.5rem",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 5,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {movie.overview || "No description available."}
                </Card.Text>
                <Card.Text
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    marginBottom: "0.5rem",
                  }}
                >
                  Release: {movie.release_date || "N/A"}
                </Card.Text>
                <Button
                  variant={
                    favorites.some((m) => m.id === movie.id)
                      ? "danger"
                      : "outline-danger"
                  }
                  size="sm"
                  onClick={() => handleFavorite(movie)}
                  className="mt-auto"
                >
                  {favorites.some((m) => m.id === movie.id)
                    ? "Unfavorite"
                    : "Favorite"}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Pagination */}
      <div className="d-flex justify-content-center gap-2 my-3">
        <Button
          disabled={page <= 1}
          onClick={() => dispatch(setPage(page - 1))}
        >
          Previous
        </Button>
        <span className="align-self-center">
          Page {page} of {totalPages}
        </span>
        <Button
          disabled={page >= totalPages}
          onClick={() => dispatch(setPage(page + 1))}
        >
          Next
        </Button>
      </div>
    </Container>
  );
};

export default Movies;
