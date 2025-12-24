import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  addFavorite,
  removeFavorite,
  getTrendingMovies,
} from "../features/movie/movieSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { trending, favorites, loading, error } = useSelector(
    (state) => state.movie
  );

  useEffect(() => {
    dispatch(getTrendingMovies());
  }, [dispatch]);

  const handleFavoriteToggle = (movie) => {
    if (favorites.some((m) => m.id === movie.id)) {
      dispatch(removeFavorite(movie.id));
    } else {
      dispatch(addFavorite(movie));
    }
  };

  return (
    <Container className="mt-4">
      {/* Greeting + buttons */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
        <h2>Welcome, {user?.email}</h2>
        <div className="mt-2">
          <Link to="/movies">
            <Button variant="primary" className="me-2">
              Explore Movies
            </Button>
          </Link>
          <Link to="/favorites">
            <Button variant="warning">My Favorites</Button>
          </Link>
        </div>
      </div>

      {/* Trending Movies */}
      <h4 className="mb-3">Trending Movies</h4>
      {loading ? (
        <Spinner animation="border" className="d-block mx-auto mt-3" />
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : trending && trending.length > 0 ? (
        <Row>
          {trending.slice(0, 8).map((movie) => (
            <Col md={4} lg={3} sm={6} xs={12} key={movie.id} className="mb-4">
              <Card className="h-100 d-flex flex-column">
                <Link
                  to={`/movies/${movie.id}`}
                  className="text-decoration-none"
                >
                  <Card.Img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : "https://via.placeholder.com/500x750?text=No+Image"
                    }
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
                    style={{
                      fontSize: "0.85rem",
                      marginBottom: "0.5rem",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 4,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {movie.overview || "No description available."}
                  </Card.Text>
                  <Button
                    variant={
                      favorites.some((m) => m.id === movie.id)
                        ? "danger"
                        : "outline-danger"
                    }
                    size="sm"
                    onClick={() => handleFavoriteToggle(movie)}
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
      ) : (
        <p>No trending movies available.</p>
      )}
    </Container>
  );
};

export default Dashboard;
