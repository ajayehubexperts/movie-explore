import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, googleLogin } from "../features/auth/authSlice";
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

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.auth);

  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Email/Password Login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await dispatch(
        login({
          email: emailRef.current.value,
          password: passwordRef.current.value,
        })
      ).unwrap();
      setSuccess("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      setError(err || "Login failed. Please try again.");
    }
  };

  // Google Login
  const handleGoogleLogin = async () => {
    setError("");
    setSuccess("");
    try {
      await dispatch(googleLogin()).unwrap();
      setSuccess("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      setError(err || "Google login failed. Please try again.");
    }
  };

  return (
    <Container fluid className="vh-100">
      <Row className="h-100">
        <Col
          md={5}
          className="d-flex align-items-center justify-content-center"
          style={{ backgroundColor: "#1a1a1a" }}
        >
          <Card className="p-4 shadow-sm w-75">
            <h3 className="text-center mb-4">Login</h3>

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

              <Button type="submit" className="w-100 mb-2" disabled={isLoading}>
                {isLoading ? <Spinner animation="border" size="sm" /> : "Login"}
              </Button>
            </Form>

            <Button
              variant="outline-primary"
              className="w-100 d-flex align-items-center justify-content-center mb-2"
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                width="20"
                className="me-2"
                alt="Google"
              />
              Sign in with Google
            </Button>

            <p className="text-center mb-1">
              <Link
                to="/forget"
                className="text-decoration-none"
                style={{ color: "#0d6efd" }}
              >
                Forget Password?
              </Link>
            </p>

            <p className="text-center mt-3">
              <small>
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-decoration-none text-primary"
                >
                  Sign Up
                </Link>
              </small>
            </p>
          </Card>
        </Col>

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

export default Login;
