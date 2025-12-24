import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgetPassword, authActions } from "../features/auth/authSlice";
import {
  Form,
  Button,
  Alert,
  Spinner,
  Container,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import { Link } from "react-router-dom";

const ForgetPassword = () => {
  const dispatch = useDispatch();
  const { isLoading, error, resetMessage } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgetPassword(email));
  };

  return (
    <Container
      fluid
      className="vh-100 d-flex justify-content-center align-items-center"
      style={{ backgroundColor: "#000" }}
    >
      <Row className="w-100 justify-content-center">
        <Col md={5}>
          <Card className="p-4 shadow-sm">
            <h3 className="text-center mb-3">Forget Password</h3>

            {error && <Alert variant="danger">{error}</Alert>}
            {resetMessage && (
              <Alert variant="success">
                {resetMessage}{" "}
                <span
                  onClick={() => dispatch(authActions.clearResetMessage())}
                  style={{ cursor: "pointer" }}
                >
                  x
                </span>
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-4">
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Button type="submit" className="w-100 mb-2" disabled={isLoading}>
                {isLoading ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  "Send Reset Email"
                )}
              </Button>
            </Form>

            <p className="text-center mt-3">
              Already remember password?{" "}
              <Link to="/login" className="text-decoration-none">
                Login
              </Link>
            </p>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ForgetPassword;
