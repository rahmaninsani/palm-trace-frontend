import React, { memo } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { Accordion } from "react-bootstrap";

import { Tiles, KontrakOut, Paper, User, Graph } from "../../../elements";
import role from "../../../../constants/role";
import endpoint from "../../../../constants/endpoint";

const SidebarItem = memo(() => {
  const { pathname } = useLocation();
  const { user, isError } = useSelector((state) => state.auth);
  const allowedRolesRantaiPasok = [role.pks, role.koperasi, role.petani];

  return (
    <Accordion as="ul" className="navbar-nav iq-main-menu">
      {user && allowedRolesRantaiPasok.includes(user.role) && (
        <li className={`${pathname === endpoint.dashboard && "active"} nav-item `}>
          <Link className={`${pathname === endpoint.dashboard && "active"} nav-link `} aria-current="page" to={endpoint.dashboard}>
            <i className="icon">
              <Tiles />
            </i>
            <span className="item-name">Dashboard</span>
          </Link>
        </li>
      )}

      {/* Referensi Harga */}
      <li className={`${pathname === endpoint.referensiHarga && "active"} nav-item `}>
        <Link className={`${pathname === endpoint.referensiHarga && "active"} nav-link `} aria-current="page" to={endpoint.referensiHarga}>
          <i className="icon">
            <Graph />
          </i>
          <span className="item-name">Referensi Harga</span>
        </Link>
      </li>

      {user && allowedRolesRantaiPasok.includes(user.role) && (
        <>
          <li className={`${pathname === endpoint.kontrak && "active"} nav-item `}>
            <Link className={`${pathname === endpoint.kontrak && "active"} nav-link `} aria-current="page" to={endpoint.kontrak}>
              <i className="icon">
                <KontrakOut />
              </i>
              <span className="item-name">Kontrak</span>
            </Link>
          </li>

          <li className={`${pathname === endpoint.laporan && "active"} nav-item `}>
            <Link className={`${pathname === endpoint.laporan && "active"} nav-link `} aria-current="page" to={endpoint.laporan}>
              <i className="icon">
                <Paper />
              </i>
              <span className="item-name">Laporan</span>
            </Link>
          </li>
        </>
      )}

      <li className={`${pathname === endpoint.profil && "active"} nav-item `}>
        <Link className={`${pathname === endpoint.profil && "active"} nav-link `} aria-current="page" to={"/profil"}>
          <i className="icon">
            <User />
          </i>
          <span className="item-name">Profil</span>
        </Link>
      </li>
    </Accordion>
  );
});

export default SidebarItem;
