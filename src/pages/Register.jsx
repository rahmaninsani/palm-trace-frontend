import React, { memo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Row, Col, Image, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";

import { roleConstant, endpointConstant, messageConstant } from "../constants";
import { authSchema } from "../validations";
import { reset, setMessage } from "../features/authSlice";
import { Card, Alert, ButtonLoading } from "../components/elements";
import { authService } from "../services";
import auth5 from "../assets/images/auth/05.png";

const Register = memo(() => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, message } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(reset());
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ resolver: joiResolver(authSchema.register), mode: "all" });

  const onSubmit = async (data) => {
    try {
      await authService.register(data);
      dispatch(setMessage(messageConstant.registerSuccess));
      navigate(endpointConstant.login, { replace: true });
    } catch (error) {
      dispatch(setMessage(error.response.data.message));
    }
  };

  const roles = [
    {
      id: roleConstant.petani,
      description: "Petani",
    },
    {
      id: roleConstant.koperasi,
      description: "Koperasi",
    },
    {
      id: roleConstant.pks,
      description: "Pabrik Kelapa Sawit",
    },
  ];

  return (
    <Row className="m-0 align-items-center bg-white vh-100">
      <div className="col-md-6 d-md-block d-none bg-primary p-0 mt-n1 vh-100 overflow-hidden">
        <Image src={auth5} className="Image-fluid gradient-main animated-scaleX" alt="images" />
      </div>

      <Col md="6">
        <Row className="justify-content-center">
          <Col>
            <Card className="card-transparent auth-card shadow-none d-flex justify-content-center mb-0">
              <Card.Body>
                <h2 className="mb-4 text-center">Registrasi</h2>
                {message && <Alert type="danger" message={message} />}
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Row>
                    <Form.Group className="col-sm-12 form-group">
                      <Form.Label htmlFor="role">Jenis Akun</Form.Label>
                      <Form.Control as="select" type="select" id="role" className="form-select shadow-none" isInvalid={!!errors.role} {...register("role")}>
                        <option defaultValue>Pilih Jenis Akun</option>
                        {roles.map((role) => (
                          <option key={role.id} value={role.id}>
                            {role.description}
                          </option>
                        ))}
                      </Form.Control>
                      {errors.role && <Form.Control.Feedback type="invalid">{errors.role.message}</Form.Control.Feedback>}
                    </Form.Group>

                    <Form.Group className="col-sm-12 form-group">
                      <Form.Label htmlFor="nama">Nama</Form.Label>
                      <Form.Control type="text" id="nama" isInvalid={!!errors.nama} {...register("nama")} />
                      {errors.nama && <Form.Control.Feedback type="invalid">{errors.nama.message}</Form.Control.Feedback>}
                    </Form.Group>

                    <Form.Group className="col-sm-12 form-group">
                      <Form.Label htmlFor="alamat">Alamat</Form.Label>
                      <Form.Control type="text" id="alamat" isInvalid={!!errors.alamat} {...register("alamat")} />
                      {errors.alamat && <Form.Control.Feedback type="invalid">{errors.alamat.message}</Form.Control.Feedback>}
                    </Form.Group>

                    <Form.Group className="col-sm-12 form-group">
                      <Form.Label htmlFor="nomorTelepon">Nomor Telepon</Form.Label>
                      <Form.Control type="tel" id="nomorTelepon" isInvalid={!!errors.nomorTelepon} {...register("nomorTelepon")} />
                      {errors.nomorTelepon && <Form.Control.Feedback type="invalid">{errors.nomorTelepon.message}</Form.Control.Feedback>}
                    </Form.Group>

                    <Form.Group className="col-sm-12 form-group">
                      <Form.Label htmlFor="email">Email</Form.Label>
                      <Form.Control type="email" id="email" isInvalid={!!errors.email} {...register("email")} />
                      {errors.email && <Form.Control.Feedback type="invalid">{errors.email.message}</Form.Control.Feedback>}
                    </Form.Group>

                    <Form.Group className="col-sm-12 form-group">
                      <Form.Label htmlFor="password">Password</Form.Label>
                      <Form.Control type="password" id="password" isInvalid={!!errors.password} {...register("password")} />
                      {errors.password && <Form.Control.Feedback type="invalid">{errors.password.message}</Form.Control.Feedback>}
                    </Form.Group>
                  </Row>

                  <div className="d-flex justify-content-center">
                    {isLoading ? (
                      <ButtonLoading />
                    ) : (
                      <Button type="submit" variant="btn btn-primary" disabled={!isValid}>
                        Daftar
                      </Button>
                    )}
                  </div>

                  <p className="mt-3 text-center">
                    Sudah mempunyai akun?{" "}
                    <Link to={endpointConstant.login} className="text-underline">
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
  );
});

export default Register;
