import React, { useState } from "react";
import { Row, Col, Image, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { authService } from "../../services";

import { Card } from "../../components/elements";
import auth5 from "../../assets/images/auth/05.png";

const Register = () => {
  let navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.auth);
  const [msg, setMsg] = useState("");
  const options = [
    {
      id: "petani",
      value: "Petani",
    },
    {
      id: "koperasi",
      value: "Koperasi",
    },
    {
      id: "pks",
      value: "Pabrik Kelapa Sawit",
    },
  ];
  const [registerValue, setRegisterValue] = useState({
    role: "",
    nama: "",
    alamat: "",
    nomorTelepon: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterValue({ ...registerValue, [name]: value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.register(registerValue);
      navigate("/login");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.errors);
      }
    }
  };

  return (
    <>
      <section className="login-content">
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
                    <p className="text-danger text-center">{msg}</p>
                    <Form onSubmit={handleOnSubmit}>
                      <Row>
                        <Form.Group className="col-sm-12 form-group">
                          <Form.Label>Jenis Akun</Form.Label>
                          <select className="form-select mb-3 shadow-none" name="role" value={registerValue.role} onChange={handleInputChange}>
                            <option defaultValue>Pilih Jenis Akun</option>
                            {options.map((value) => (
                              <option value={value.id} key={value.value}>
                                {value.value}
                              </option>
                            ))}
                          </select>
                        </Form.Group>

                        <Form.Group className="col-sm-12 form-group">
                          <Form.Label htmlFor="nama">Nama</Form.Label>
                          <Form.Control type="text" name="nama" value={registerValue.nama} onChange={handleInputChange} />
                        </Form.Group>

                        <Form.Group className="col-sm-12 form-group">
                          <Form.Label htmlFor="alamat">Alamat</Form.Label>
                          <Form.Control type="text" name="alamat" value={registerValue.alamat} onChange={handleInputChange} />
                        </Form.Group>

                        <Form.Group className="col-sm-12 form-group">
                          <Form.Label htmlFor="nomorTelepon">Nomor Telepon</Form.Label>
                          <Form.Control type="text" name="nomorTelepon" value={registerValue.nomorTelepon} onChange={handleInputChange} />
                        </Form.Group>

                        <Form.Group className="col-sm-12 form-group">
                          <Form.Label htmlFor="email">Email</Form.Label>
                          <Form.Control type="email" name="email" value={registerValue.email} onChange={handleInputChange} />
                        </Form.Group>

                        <Form.Group className="col-sm-12 form-group">
                          <Form.Label htmlFor="password">Password</Form.Label>
                          <Form.Control type="password" name="password" value={registerValue.password} onChange={handleInputChange} />
                        </Form.Group>
                      </Row>
                      <div className="d-flex justify-content-center">
                        <Button type="submit" variant="btn btn-primary">
                          {isLoading ? "Loading..." : "Daftar"}
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
