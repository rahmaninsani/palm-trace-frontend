import React from "react";
import { Row, Col, Image, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "../../components/elements";

import auth5 from "../../assets/images/auth/05.png";

const Register = () => {
  let history = useNavigate();

  return (
    <>
      <section className="login-content">
        <Row className="m-0 align-items-center bg-white vh-100">
          <div className="col-md-6 d-md-block d-none bg-primary p-0 mt-n1 vh-100 overflow-hidden">
            <Image src={auth5} className="Image-fluid gradient-main animated-scaleX" alt="images" />
          </div>
          <Col md="6">
            <Row className="justify-content-center">
              <Col md="10">
                <Card className="card-transparent auth-card shadow-none d-flex justify-content-center mb-0">
                  <Card.Body>
                    <h2 className="mb-2 text-center">Registrasi</h2>
                    <p className="text-center">Pembuatan akun</p>
                    <Form>
                      <Row>
                        <Col lg="6">
                          <Form.Group className="form-group">
                            <Form.Label htmlFor="full-name" className="">
                              Full Name
                            </Form.Label>
                            <Form.Control type="text" className="" id="full-name" placeholder=" " />
                          </Form.Group>
                        </Col>
                        <Col lg="6">
                          <Form.Group className="form-group">
                            <Form.Label htmlFor="last-name" className="">
                              Last Name
                            </Form.Label>
                            <Form.Control type="text" className="" id="last-name" placeholder=" " />
                          </Form.Group>
                        </Col>
                        <Col lg="6">
                          <Form.Group className="form-group">
                            <Form.Label htmlFor="email" className="">
                              Email
                            </Form.Label>
                            <Form.Control type="email" className="" id="email" placeholder=" " />
                          </Form.Group>
                        </Col>
                        <Col lg="6">
                          <Form.Group className="form-group">
                            <Form.Label htmlFor="phone" className="">
                              Phone No.
                            </Form.Label>
                            <Form.Control type="text" className="" id="phone" placeholder=" " />
                          </Form.Group>
                        </Col>
                        <Col lg="6">
                          <Form.Group className="form-group">
                            <Form.Label htmlFor="password" className="">
                              Password
                            </Form.Label>
                            <Form.Control type="password" className="" id="password" placeholder=" " />
                          </Form.Group>
                        </Col>
                        <Col lg="6">
                          <Form.Group className="form-group">
                            <Form.Label htmlFor="confirm-password" className="">
                              Confirm Password
                            </Form.Label>
                            <Form.Control type="text" className="" id="confirm-password" placeholder=" " />
                          </Form.Group>
                        </Col>
                      </Row>
                      <div className="d-flex justify-content-center">
                        <Button onClick={() => history.push("/login")} type="button" variant="primary">
                          Daftar
                        </Button>
                      </div>
                      <p className="mt-3 text-center">
                        Sudah mempunyai akun?{" "}
                        <Link to="/login" className="text-underline">
                          Login
                        </Link>
                      </p>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <div className="sign-bg sign-bg-right">
              <svg width="280" height="230" viewBox="0 0 421 359" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.05">
                  <rect x="-15.0845" y="154.773" width="543" height="77.5714" rx="38.7857" transform="rotate(-45 -15.0845 154.773)" fill="#3A57E8" />
                  <rect x="149.47" y="319.328" width="543" height="77.5714" rx="38.7857" transform="rotate(-45 149.47 319.328)" fill="#3A57E8" />
                  <rect x="203.936" y="99.543" width="310.286" height="77.5714" rx="38.7857" transform="rotate(45 203.936 99.543)" fill="#3A57E8" />
                  <rect x="204.316" y="-229.172" width="543" height="77.5714" rx="38.7857" transform="rotate(45 204.316 -229.172)" fill="#3A57E8" />
                </g>
              </svg>
            </div>
          </Col>
        </Row>
      </section>
    </>
  );
};

export default Register;
