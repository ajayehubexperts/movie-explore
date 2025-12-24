import { useSelector, useDispatch } from "react-redux";
import { removeFavorite, addFavorite } from "../features/movie/movieSlice";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Favorites = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.movie.favorites);

  // persist favorites
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  if (!favorites || favorites.length === 0) {
    return (
      <p className="text-center mt-5">You haven’t added any favorites yet.</p>
    );
  }

  const handleFavoriteToggle = (movie) => {
    if (favorites.some((m) => m.id === movie.id)) {
      dispatch(removeFavorite(movie.id));
    } else {
      dispatch(addFavorite(movie));
    }
  };

  return (
    <Container className="mt-4">
      <Row>
        {favorites.map((movie) => (
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
                  variant="danger"
                  size="sm"
                  className="mt-auto"
                  onClick={() => handleFavoriteToggle(movie)}
                >
                  Unfavorite
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Favorites;
