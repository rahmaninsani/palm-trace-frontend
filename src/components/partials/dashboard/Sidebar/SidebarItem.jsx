import React, { useState, useContext, memo } from "react";
import { Link, useLocation } from "react-router-dom";
import { Accordion, useAccordionButton, AccordionContext } from "react-bootstrap";

import { ROLE } from "../../../../config";
import { Tiles, UpDownArrow, Cart, Paper, User, DropDown } from "../../../elements";

const CustomToggle = ({ children, eventKey, onClick }) => {
  const { activeEventKey } = useContext(AccordionContext);

  const decoratedOnClick = useAccordionButton(eventKey, (active) => onClick({ state: !active, eventKey: eventKey }));

  const isCurrentEventKey = activeEventKey === eventKey;

  return (
    <Link
      to="#"
      aria-expanded={isCurrentEventKey ? "true" : "false"}
      className="nav-link"
      role="button"
      onClick={(e) => {
        decoratedOnClick(isCurrentEventKey);
      }}
    >
      {children}
    </Link>
  );
};

const SidebarItem = memo(({ role }) => {
  const [activeMenu, setActiveMenu] = useState(false);
  const [active, setActive] = useState("");
  const basename = `/${role}`;

  //location
  const location = useLocation();

  return (
    <>
      <Accordion as="ul" className="navbar-nav iq-main-menu">
        {/* Home Title */}
        <li className="nav-item static-item">
          <Link className="nav-link static-item disabled" to="#" tabIndex="-1">
            <span className="default-icon">Home</span>
            <span className="mini-icon">-</span>
          </Link>
        </li>

        {/* Dashboard */}
        <li className={`${location.pathname === basename ? "active" : ""} nav-item `}>
          <Link className={`${location.pathname === basename ? "active" : ""} nav-link `} aria-current="page" to={basename} onClick={() => {}}>
            <i className="icon">
              <Tiles />
            </i>
            <span className="item-name">Dashboard</span>
          </Link>
        </li>

        {/* Divider */}
        <li>
          <hr className="hr-horizontal" />
        </li>

        {/* Pages Title */}
        <li className="nav-item static-item">
          <Link className="nav-link static-item disabled" to="#" tabIndex="-1">
            <span className="default-icon">Pages</span>
            <span className="mini-icon">-</span>
          </Link>
        </li>

        {/* Penawaran */}
        <Accordion.Item as="li" eventKey="sidebar-penawaran" bsPrefix={`nav-item ${active === "penawaran" ? "active" : ""} `} onClick={() => setActive("penawaran")}>
          <CustomToggle eventKey="sidebar-penawaran" onClick={(activeKey) => setActiveMenu(activeKey)}>
            <i className="icon">
              <UpDownArrow />
            </i>
            <span className="item-name">Penawaran</span>
            <i className="right-icon">
              <DropDown />
            </i>
          </CustomToggle>

          <Accordion.Collapse eventKey="sidebar-penawaran">
            <ul className="sub-nav">
              {/* Keluar */}
              <li className="nav-item">
                <Link className={`${location.pathname === basename.concat("/penawaran-keluar") ? "active" : ""} nav-link`} to={basename.concat("/penawaran-keluar")}>
                  <i className="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                      <g>
                        <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                      </g>
                    </svg>
                  </i>
                  <i className="sidenav-mini-icon"> K </i>
                  <span className="item-name">Keluar</span>
                </Link>
              </li>

              {/* Masuk */}
              <li className="nav-item">
                <Link className={`${location.pathname === basename.concat("/penawaran-masuk") ? "active" : ""} nav-link`} to={basename.concat("/penawaran-masuk")}>
                  <i className="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                      <g>
                        <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                      </g>
                    </svg>
                  </i>
                  <i className="sidenav-mini-icon"> M </i>
                  <span className="item-name">Masuk</span>
                </Link>
              </li>
            </ul>
          </Accordion.Collapse>
        </Accordion.Item>

        {/* Transaksi */}
        <Accordion.Item as="li" eventKey="sidebar-transaksi" bsPrefix={`nav-item ${active === "transaksi" ? "active" : ""} `} onClick={() => setActive("transaksi")}>
          <CustomToggle eventKey="sidebar-transaksi" onClick={(activeKey) => setActiveMenu(activeKey)}>
            <i className="icon">
              <Cart />
            </i>
            <span className="item-name">Transaksi</span>
            <i className="right-icon">
              <DropDown />
            </i>
          </CustomToggle>

          <Accordion.Collapse eventKey="sidebar-transaksi">
            <ul className="sub-nav">
              {/* Pengiriman */}
              {role !== ROLE.PKS && (
                <li className="nav-item">
                  <Link className={`${location.pathname === basename.concat("/transaksi-pengiriman") ? "active" : ""} nav-link`} to={basename.concat("/transaksi-pengiriman")}>
                    <i className="icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                        <g>
                          <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                        </g>
                      </svg>
                    </i>
                    <i className="sidenav-mini-icon"> P </i>
                    <span className="item-name">Pengiriman</span>
                  </Link>
                </li>
              )}
              {/* Penerimaan */}
              <li className="nav-item">
                <Link className={`${location.pathname === basename.concat("/transaksi-penerimaan") ? "active" : ""} nav-link`} to={basename.concat("/transaksi-penerimaan")}>
                  <i className="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                      <g>
                        <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                      </g>
                    </svg>
                  </i>
                  <i className="sidenav-mini-icon"> P </i>
                  <span className="item-name">Penerimaan</span>
                </Link>
              </li>

              {/* Pembayaran */}
              <li className="nav-item">
                <Link className={`${location.pathname === basename.concat("/transaksi-pembayaran") ? "active" : ""} nav-link`} to={basename.concat("/transaksi-pembayaran")}>
                  <i className="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                      <g>
                        <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                      </g>
                    </svg>
                  </i>
                  <i className="sidenav-mini-icon"> P </i>
                  <span className="item-name">Pembayaran</span>
                </Link>
              </li>
            </ul>
          </Accordion.Collapse>
        </Accordion.Item>

        {/* Laporan */}
        <li className={`${location.pathname === basename.concat("/laporan") ? "active" : ""} nav-item `}>
          <Link className={`${location.pathname === basename.concat("/laporan") ? "active" : ""} nav-link `} aria-current="page" to={basename.concat("/laporan")} onClick={() => {}}>
            <i className="icon">
              <Paper />
            </i>
            <span className="item-name">Laporan</span>
          </Link>
        </li>

        {/* Profil */}
        <Accordion.Item as="li" eventKey="sidebar-profil" bsPrefix={`nav-item ${active === "profil" ? "active" : ""} `} onClick={() => setActive("profil")}>
          <CustomToggle eventKey="sidebar-profil" onClick={(activeKey) => setActiveMenu(activeKey)}>
            <i className="icon">
              <User />
            </i>
            <span className="item-name">Profil</span>
            <i className="right-icon">
              <DropDown />
            </i>
          </CustomToggle>

          <Accordion.Collapse eventKey="sidebar-profil">
            <ul className="sub-nav">
              {/* Profil */}
              <li className="nav-item">
                <Link className={`${location.pathname === basename.concat("/profil-biodata") ? "active" : ""} nav-link`} to={basename.concat("/profil-biodata")}>
                  <i className="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                      <g>
                        <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                      </g>
                    </svg>
                  </i>
                  <i className="sidenav-mini-icon"> B </i>
                  <span className="item-name">Biodata</span>
                </Link>
              </li>

              {/* Kebun */}
              {role === ROLE.PETANI && (
                <li className="nav-item">
                  <Link className={`${location.pathname === basename.concat("/profil-kebun") ? "active" : ""} nav-link`} to={basename.concat("/profil-kebun")}>
                    <i className="icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                        <g>
                          <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                        </g>
                      </svg>
                    </i>
                    <i className="sidenav-mini-icon"> K </i>
                    <span className="item-name">Kebun</span>
                  </Link>
                </li>
              )}
            </ul>
          </Accordion.Collapse>
        </Accordion.Item>
      </Accordion>
    </>
  );
});

export default SidebarItem;
