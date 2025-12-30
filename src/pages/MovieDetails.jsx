import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addFavorite, removeFavorite } from "../features/movie/movieSlice";
import { getMovieTrailer, fetchMovieDetails } from "../api/movieapi";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Modal,
} from "react-bootstrap";

const YOUTUBE_EMBED = import.meta.env.VITE_YOUTUBE_EMBED_URL;
const MOVIE_EMBED = import.meta.env.VITE_MOVIE_EMBED_URL;

const MovieDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { favorites } = useSelector((state) => state.movie);

  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchMovieDetails(id);
        setMovie(data);

        const trailerData = await getMovieTrailer(id);
        setTrailer(trailerData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const isFavorite = favorites.some((m) => m.id === movie?.id);

  const handleFavoriteToggle = () => {
    if (!movie) return;
    isFavorite
      ? dispatch(removeFavorite(movie.id))
      : dispatch(addFavorite(movie));
  };

  if (loading)
    return <Spinner animation="border" className="d-block mx-auto mt-5" />;

  if (!movie) return <p className="text-center mt-5">Movie not found.</p>;

  return (
    <Container className="mt-4">
      <Row className="mb-4">
        <Col md={4}>
          <Card.Img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "https://via.placeholder.com/300x450"
            }
            alt={movie.title}
          />
        </Col>

        <Col md={8}>
          <h2>{movie.title}</h2>

          <p>
            <strong>Release Date:</strong> {movie.release_date || "N/A"}
          </p>

          <p>
            <strong>Rating:</strong> {movie.vote_average || "N/A"}
          </p>

          <p>{movie.overview || "No description available."}</p>

          <div className="d-flex gap-2 flex-wrap">
            <Button
              variant={isFavorite ? "danger" : "outline-danger"}
              onClick={handleFavoriteToggle}
            >
              {isFavorite ? "Unfavorite" : "Favorite"}
            </Button>

            {trailer && (
              <Button variant="primary" onClick={() => setShowTrailer(true)}>
                Watch Trailer
              </Button>
            )}

            <Button variant="success" onClick={() => setShowPlayer(true)}>
              Play
            </Button>
          </div>
        </Col>
      </Row>

      {/* Trailer Modal */}
      <Modal
        show={showTrailer}
        onHide={() => setShowTrailer(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{movie.title} - Trailer</Modal.Title>
        </Modal.Header>
        <Modal.Body className="ratio ratio-16x9">
          <iframe
            src={`${YOUTUBE_EMBED}/${trailer?.key}?autoplay=1`}
            title="Movie Trailer"
            allow="autoplay; fullscreen"
            allowFullScreen
            frameBorder="0"
          />
        </Modal.Body>
      </Modal>

      {/* Movie Player Modal */}
      <Modal
        show={showPlayer}
        onHide={() => setShowPlayer(false)}
        size="xl"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{movie.title} - Full Movie</Modal.Title>
        </Modal.Header>
        <Modal.Body className="ratio ratio-16x9">
          <iframe
            src={`${MOVIE_EMBED}/${id}?autoplay=1`}
            title="Movie Player"
            allow="autoplay; fullscreen"
            allowFullScreen
            frameBorder="0"
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default MovieDetails;
