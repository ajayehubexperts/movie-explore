import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
  Spinner,
} from "react-bootstrap";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.auth);

  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmRef = useRef();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (passwordRef.current.value !== confirmRef.current.value) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await dispatch(
        signup({
          email: emailRef.current.value,
          password: passwordRef.current.value,
        })
      ).unwrap();
      setSuccess("Signup successful! Please login.");
      navigate("/login");
    } catch (err) {
      setError(err || "Signup failed. Please try again.");
    }
  };

  return (
    <Container fluid className="vh-100">
      <Row className="h-100">
        {/* Left side: Signup form */}
        <Col
          md={5}
          className="d-flex align-items-center justify-content-center"
          style={{ backgroundColor: "#1a1a1a" }}
        >
          <Card className="p-4 shadow-sm w-75">
            <h3 className="text-center mb-4">Sign Up</h3>

            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-4">
                <Form.Control
                  type="email"
                  ref={emailRef}
                  placeholder="Enter email"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Control
                  type="password"
                  ref={passwordRef}
                  placeholder="Enter password"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Control
                  type="password"
                  ref={confirmRef}
                  placeholder="Confirm password"
                  required
                />
              </Form.Group>

              <Button type="submit" className="w-100 mb-2" disabled={isLoading}>
                {isLoading ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  "Sign Up"
                )}
              </Button>
            </Form>

            <p className="text-center mt-2">
              <small>
                Already have an account?{" "}
                <Link to="/login" className="text-decoration-none text-primary">
                  Login
                </Link>
              </small>
            </p>
          </Card>
        </Col>

        {/* Right side: Background image */}
        <Col
          md={7}
          className="d-none d-md-block"
          style={{
            backgroundImage: "url('/movie-bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></Col>
      </Row>
    </Container>
  );
};

export default Signup;
