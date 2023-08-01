import React from "react";
import { Container, Image, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import error404 from "../assets/images/error/404.png";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="gradient">
        <Container>
          <Image src={error404} className="img-fluid mb-4 w-50" alt="" />
          <h2 className="mb-0 mt-4 text-white">Halaman Tidak Ditemukan</h2>
          <p className="mt-2 text-white">Halaman yang diminta tidak tersedia</p>
          <Button className="bg-white text-primary d-inline-flex align-items-center" onClick={() => navigate(-1)}>
            Kembali
          </Button>
        </Container>
        <div className="box">
          <div className="c xl-circle">
            <div className="c lg-circle">
              <div className="c md-circle">
                <div className="c sm-circle">
                  <div className="c xs-circle"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
