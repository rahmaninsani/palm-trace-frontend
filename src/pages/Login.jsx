import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col, Image, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";

import { endpointConstant, messageConstant } from "../constants";
import { authSchema } from "../validations";
import { LoginUser, reset } from "../features/authSlice";
import { Card, Alert, ButtonLoading } from "../components/elements";
import appLogoText from "../assets/images/app-logo-text.png";
import appLogo from "../assets/images/app-logo.png";

const Login = memo(() => {
  const dispatch = useDispatch();
  const { isLoading, isError, message } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ resolver: joiResolver(authSchema.login), mode: "all" });

  const onSubmit = (data) => {
    dispatch(reset());
    dispatch(LoginUser(data));
  };

  useEffect(() => {
    if (message !== messageConstant.registerSuccess) {
      dispatch(reset());
    }
  }, [dispatch]);

  return (
    <Row className="m-0 align-items-center bg-white vh-100">
      <Col md="6">
        <Row className="justify-content-center">
          <Col md="10">
            <Card className="card-transparent shadow-none d-flex justify-content-center mb-0 auth-card">
              <Card.Body>
                <h2 className="mb-4 text-center">Login</h2>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  {isError && message && <Alert type="danger" message={message} />}
                  {!isError && message && <Alert type="success" message={message} />}
                  <Row>
                    <Col lg="12">
                      <Form.Group className="form-group">
                        <Form.Label htmlFor="email">Email</Form.Label>
                        <Form.Control type="email" id="email" isInvalid={!!errors.email} {...register("email")} />
                        {errors.email && <Form.Control.Feedback type="invalid">{errors.email.message}</Form.Control.Feedback>}
                      </Form.Group>
                    </Col>
                    <Col lg="12">
                      <Form.Group className="form-group">
                        <Form.Label htmlFor="password">Password</Form.Label>
                        <Form.Control type="password" id="password" isInvalid={!!errors.password} {...register("password")} />
                        {errors.password && <Form.Control.Feedback type="invalid">{errors.password.message}</Form.Control.Feedback>}
                      </Form.Group>
                    </Col>
                  </Row>

                  <div className="d-flex justify-content-center">
                    {isLoading ? (
                      <ButtonLoading />
                    ) : (
                      <Button type="submit" variant="btn btn-primary" disabled={!isValid}>
                        Masuk
                      </Button>
                    )}
                  </div>

                  <p className="mt-3 text-center">
                    Belum mempunyai akun?{" "}
                    <Link to={endpointConstant.register} className="text-underline">
                      Registrasi
                    </Link>
                  </p>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <div className="sign-bg">
          <Image src={appLogo} className="image-fluid gradient-main" style={{ width: "75%", opacity: 0.03 }} alt="images" />
        </div>
      </Col>

      <Col md="6" className="d-md-block d-none bg-white p-0 mt-n1 overflow-hidden text-center">
        <Image src={appLogoText} className="image-fluid gradient-main" style={{ width: "75%" }} alt="images" />
      </Col>
    </Row>
  );
});

export default Login;
