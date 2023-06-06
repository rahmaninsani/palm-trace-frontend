import React, { useState, useContext, memo } from "react";
import { Link, useLocation } from "react-router-dom";
import { Accordion, useAccordionButton, AccordionContext } from "react-bootstrap";

import { ROLE } from "../../../../config";
import { Tiles, KontrakOut, Paper, User, DropDown, Graph } from "../../../elements";

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
  const { pathname } = useLocation();

  return (
    <>
      <Accordion as="ul" className="navbar-nav iq-main-menu">
        {role === ROLE.DINAS ? (
          <>
            {/* Pages Title  */}
            <li className="nav-item static-item">
              <Link className="nav-link static-item disabled" to="#" tabIndex="-1">
                <span className="default-icon">Pages</span>
                <span className="mini-icon">-</span>
              </Link>
            </li>

            {/* Harga TBS */}
            <li className={`${pathname.includes("/harga-sawit") && "active"} nav-item `}>
              <Link className={`${pathname.includes("/harga-sawit") && "active"} nav-link `} aria-current="page" to={basename.concat("/harga-sawit")}>
                <i className="icon">
                  <Graph />
                </i>
                <span className="item-name">Harga Sawit</span>
              </Link>
            </li>
          </>
        ) : (
          <>
            {/* Home Title */}
            <li className="nav-item static-item">
              <Link className="nav-link static-item disabled" to="#" tabIndex="-1">
                <span className="default-icon">Home</span>
                <span className="mini-icon">-</span>
              </Link>
            </li>

            {/* Dashboard */}
            <li className={`${pathname === basename && "active"} nav-item `}>
              <Link className={`${pathname === basename && "active"} nav-link `} aria-current="page" to={basename}>
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

            {/* Harga TBS */}
            <li className={`${pathname.includes("/harga-sawit") && "active"} nav-item `}>
              <Link className={`${pathname.includes("/harga-sawit") && "active"} nav-link `} aria-current="page" to={basename.concat("/harga-sawit")}>
                <i className="icon">
                  <Graph />
                </i>
                <span className="item-name">Harga Sawit</span>
              </Link>
            </li>

            {/* Kontrak */}
            <li className={`${pathname.includes("/kontrak") && "active"} nav-item `}>
              <Link className={`${pathname.includes("/kontrak") && "active"} nav-link `} aria-current="page" to={basename.concat("/kontrak")}>
                <i className="icon">
                  <KontrakOut />
                </i>
                <span className="item-name">Kontrak</span>
              </Link>
            </li>

            {/* Laporan */}
            <li className={`${pathname.includes("/laporan") && "active"} nav-item `}>
              <Link className={`${pathname.includes("/laporan") && "active"} nav-link `} aria-current="page" to={basename.concat("/laporan")}>
                <i className="icon">
                  <Paper />
                </i>
                <span className="item-name">Laporan</span>
              </Link>
            </li>
          </>
        )}

        {/* Profil */}
        <li className={`${pathname.includes("/profil") && "active"} nav-item `}>
          <Link className={`${pathname.includes("/profil") && "active"} nav-link `} aria-current="page" to={basename.concat("/profil")}>
            <i className="icon">
              <User />
            </i>
            <span className="item-name">Profil</span>
          </Link>
        </li>
      </Accordion>
    </>
  );
});

export default SidebarItem;
