import React, { useEffect, memo } from "react";
import { Row, Col } from "react-bootstrap";
import { useOutletContext } from "react-router-dom";

// AOS
import AOS from "aos";
import "aos/dist/aos.css";

//Count-up
import CountUp from "react-countup";

const Dashboard = memo(() => {
  const pageTitle = "Dashboard";
  const { setTitle } = useOutletContext();

  useEffect(() => {
    AOS.init({
      startEvent: "DOMContentLoaded",
      disable: function () {
        var maxWidth = 996;
        return window.innerWidth < maxWidth;
      },
      throttleDelay: 10,
      once: true,
      duration: 700,
      offset: 10,
    });
  });

  useEffect(() => {
    setTitle(pageTitle);
  }, [setTitle]);

  return (
    <>
      <Row className="justify-content-center">
        <Col md="12" lg="4" data-aos="fade-up" data-aos-delay="700">
          <div className="card">
            <div className="card-body">
              <div className="progress-widget">
                <div className="progress-detail">
                  <p className="mb-2">Total Sales</p>
                  <h4 className="counter">
                    $<CountUp start={120} end={560} duration={3} />K
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </Col>

        <Col md="12" lg="4" data-aos="fade-up" data-aos-delay="700">
          <div className="card">
            <div className="card-body">
              <div className="progress-widget">
                <div className="progress-detail">
                  <p className="mb-2">Total Sales</p>
                  <h4 className="counter">
                    $<CountUp start={120} end={560} duration={3} />K
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </Col>

        <Col md="12" lg="4" data-aos="fade-up" data-aos-delay="700">
          <div className="card">
            <div className="card-body">
              <div className="progress-widget">
                <div className="progress-detail">
                  <p className="mb-2">Total Sales</p>
                  <h4 className="counter">
                    $<CountUp start={120} end={560} duration={3} />K
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
});

export default Dashboard;
