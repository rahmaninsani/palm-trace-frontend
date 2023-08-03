import React, { memo } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { Accordion } from "react-bootstrap";

import { roleConstant, endpointConstant } from "../../../../constants";
import { Tiles, KontrakOut, Paper, User, Graph } from "../../../elements";

const SidebarItem = memo(() => {
  const { pathname } = useLocation();
  const { user } = useSelector((state) => state.auth);
  const allowedRolesRantaiPasok = [roleConstant.pks, roleConstant.koperasi, roleConstant.petani];

  return (
    <Accordion as="ul" className="navbar-nav iq-main-menu">
      {user && allowedRolesRantaiPasok.includes(user.role) && (
        <li className={`${pathname === endpointConstant.dashboard && "active"} nav-item `}>
          <Link className={`${pathname === endpointConstant.dashboard && "active"} nav-link `} aria-current="page" to={endpointConstant.dashboard}>
            <i className="icon">
              <Tiles />
            </i>
            <span className="item-name">Dashboard</span>
          </Link>
        </li>
      )}

      {/* Referensi Harga */}
      <li className={`${pathname === endpointConstant.referensiHarga && "active"} nav-item `}>
        <Link className={`${pathname === endpointConstant.referensiHarga && "active"} nav-link `} aria-current="page" to={endpointConstant.referensiHarga}>
          <i className="icon">
            <Graph />
          </i>
          <span className="item-name">Referensi Harga</span>
        </Link>
      </li>

      {user && allowedRolesRantaiPasok.includes(user.role) && (
        <>
          <li className={`${pathname === endpointConstant.kontrak && "active"} nav-item `}>
            <Link className={`${pathname === endpointConstant.kontrak && "active"} nav-link `} aria-current="page" to={endpointConstant.kontrak}>
              <i className="icon">
                <KontrakOut />
              </i>
              <span className="item-name">Kontrak</span>
            </Link>
          </li>

          <li className={`${pathname === endpointConstant.laporan && "active"} nav-item `}>
            <Link className={`${pathname === endpointConstant.laporan && "active"} nav-link `} aria-current="page" to={endpointConstant.laporan}>
              <i className="icon">
                <Paper />
              </i>
              <span className="item-name">Laporan</span>
            </Link>
          </li>
        </>
      )}

      <li className={`${pathname === endpointConstant.profil && "active"} nav-item `}>
        <Link className={`${pathname === endpointConstant.profil && "active"} nav-link `} aria-current="page" to={"/profil"}>
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
