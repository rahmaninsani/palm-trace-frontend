import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Row, Col, Image, Form, Button } from "react-bootstrap";

import { LoginUser, reset } from "../features/authSlice";
import { Card } from "../components/elements";

import auth1 from "../assets/images/auth/01.png";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isSuccess, isError, message } = useSelector((state) => state.auth);

  const [loginValue, setLoginValue] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginValue({ ...loginValue, [name]: value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(LoginUser(loginValue));
  };

  useEffect(() => {
    if (user || isSuccess) {
      navigate(`/dashboard`);
    }
    dispatch(reset());
  }, [user, isSuccess, navigate, dispatch]);

  return (
    <>
      <section className="login-content">
        <Row className="m-0 align-items-center bg-white vh-100">
          <Col md="6">
            <Row className="justify-content-center">
              <Col md="10">
                <Card className="card-transparent shadow-none d-flex justify-content-center mb-0 auth-card">
                  <Card.Body>
                    <h2 className="mb-4 text-center">Login</h2>
                    <Form onSubmit={handleOnSubmit}>
                      {isError && <p className="text-danger text-center">{message}</p>}
                      <Row>
                        <Col lg="12">
                          <Form.Group className="form-group">
                            <Form.Label htmlFor="email">Email</Form.Label>
                            <Form.Control type="email" id="email" name="email" value={loginValue.email} onChange={handleInputChange} />
                          </Form.Group>
                        </Col>
                        <Col lg="12">
                          <Form.Group className="form-group">
                            <Form.Label htmlFor="password">Password</Form.Label>
                            <Form.Control type="password" id="password" name="password" value={loginValue.password} onChange={handleInputChange} />
                          </Form.Group>
                        </Col>
                      </Row>
                      <div className="d-flex justify-content-center">
                        <Button type="submit" variant="btn btn-primary">
                          {isLoading ? "Loading..." : "Masuk"}
                        </Button>
                      </div>

                      <p className="mt-3 text-center">
                        Belum mempunyai akun?{" "}
                        <Link to="/register" className="text-underline">
                          Registrasi
                        </Link>
                      </p>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <div className="sign-bg">
              <svg width="280" height="230" viewBox="0 0 431 398" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.05">
                  <rect x="-157.085" y="193.773" width="543" height="77.5714" rx="38.7857" transform="rotate(-45 -157.085 193.773)" fill="#3B8AFF" />
                  <rect x="7.46875" y="358.327" width="543" height="77.5714" rx="38.7857" transform="rotate(-45 7.46875 358.327)" fill="#3B8AFF" />
                  <rect x="61.9355" y="138.545" width="310.286" height="77.5714" rx="38.7857" transform="rotate(45 61.9355 138.545)" fill="#3B8AFF" />
                  <rect x="62.3154" y="-190.173" width="543" height="77.5714" rx="38.7857" transform="rotate(45 62.3154 -190.173)" fill="#3B8AFF" />
                </g>
              </svg>
            </div>
          </Col>
          <Col md="6" className="d-md-block d-none bg-primary p-0 mt-n1 vh-100 overflow-hidden">
            <Image src={auth1} className="Image-fluid gradient-main animated-scaleX" alt="images" />
          </Col>
        </Row>
      </section>
    </>
  );
};

export default Login;
