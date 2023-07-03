import React, { memo, forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Container, Nav, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import { LogoutUser, reset } from "../../../features/authSlice";

//img
import avatars1 from "../../../assets/images/avatars/01.png";

// logo
import { Logo } from "../../elements";

const CustomToggle = forwardRef(({ children, variant, onClick }, ref) => (
  <Link
    to="/"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    className={variant}
    style={{ color: "unset" }}
  >
    {children}
  </Link>
));

const Header = memo(() => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const nama = user && user.nama;
  const role = user && user.role;
  const roleDisplay = {
    petani: "Petani",
    koperasi: "Koperasi",
    pks: "Pabrik Kelapa Sawit",
    dinas: "Dinas ",
  };

  const handleOnLogout = () => {
    dispatch(LogoutUser());
    dispatch(reset());
    navigate("/login");
  };

  const minisidebar = () => {
    document.getElementsByTagName("ASIDE")[0].classList.toggle("sidebar-mini");
  };

  return (
    <>
      <Navbar expand="lg" variant="light" className={`nav iq-navbar default`}>
        <Container fluid className="navbar-inner">
          <Link to={`/${role}`} className="navbar-brand">
            <Logo color={true} />
            <h4 className="logo-title">Palm Safe</h4>
          </Link>

          <div className="sidebar-toggle" data-toggle="sidebar" data-active="true" onClick={minisidebar}>
            <i className="icon">
              <svg width="20px" height="20px" viewBox="0 0 24 24">
                <path fill="currentColor" d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" />
              </svg>
            </i>
          </div>

          <Navbar.Toggle aria-controls="navbarSupportedContent">
            <span className="navbar-toggler-icon">
              <span className="mt-2 navbar-toggler-bar bar1"></span>
              <span className="navbar-toggler-bar bar2"></span>
              <span className="navbar-toggler-bar bar3"></span>
            </span>
          </Navbar.Toggle>

          <Navbar.Collapse id="navbarSupportedContent">
            <Nav as="ul" className="mb-2 ms-auto navbar-list mb-lg-0 align-items-center">
              <Dropdown as="li" className="nav-item">
                <Dropdown.Toggle as={CustomToggle} variant=" nav-link py-0 d-flex align-items-center" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src={avatars1} alt="User-Profile" className="theme-color-default-img img-fluid avatar avatar-50 avatar-rounded" />
                  <div className="caption ms-3 d-none d-md-block ">
                    <h6 className="mb-0 caption-title">{nama}</h6>
                    <p className="mb-0 caption-sub-title">{roleDisplay[role]}</p>
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu-end" aria-labelledby="navbarDropdown">
                  <Dropdown.Item onClick={handleOnLogout}>Keluar</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
});

export default Header;
