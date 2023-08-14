import React, { useEffect, memo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";

import Scrollbar from "smooth-scrollbar";
import SidebarItem from "./SidebarItem";
import appLogo from "../../../../assets/images/app-logo.png";

const Sidebar = memo(() => {
  const appName = "Palm Trace";
  const { user } = useSelector((state) => state.auth);
  const home = user && user.role === "dinas" ? "/referensi-harga" : "/dashboard";

  const minisidebar = () => {
    document.getElementsByTagName("ASIDE")[0].classList.toggle("sidebar-mini");
  };

  useEffect(() => {
    Scrollbar.init(document.querySelector("#my-scrollbar"));

    window.addEventListener("resize", () => {
      const tabs = document.querySelectorAll(".nav");
      const sidebarResponsive = document.querySelector('[data-sidebar="responsive"]');
      if (window.innerWidth < 1025) {
        Array.from(tabs, (elem) => {
          if (!elem.classList.contains("flex-column") && elem.classList.contains("nav-tabs") && elem.classList.contains("nav-pills")) {
            elem.classList.add("flex-column", "on-resize");
          }
          return elem.classList.add("flex-column", "on-resize");
        });
        if (sidebarResponsive !== null) {
          if (!sidebarResponsive.classList.contains("sidebar-mini")) {
            sidebarResponsive.classList.add("sidebar-mini", "on-resize");
          }
        }
      } else {
        Array.from(tabs, (elem) => {
          if (elem.classList.contains("on-resize")) {
            elem.classList.remove("flex-column", "on-resize");
          }
          return elem.classList.remove("flex-column", "on-resize");
        });
        if (sidebarResponsive !== null) {
          if (sidebarResponsive.classList.contains("sidebar-mini") && sidebarResponsive.classList.contains("on-resize")) {
            sidebarResponsive.classList.remove("sidebar-mini", "on-resize");
          }
        }
      }
    });
  });

  return (
    <>
      <aside className={"sidebar sidebar-white sidebar-base sidebar-default navs-rounded-all"} data-sidebar="responsive">
        <div className="sidebar-header d-flex align-items-center justify-content-start">
          <Link to={home} className="navbar-brand">
            <Image src={appLogo} className="image-fluid gradient-main" style={{ width: "32px" }} alt="images" />
            <h4 className="logo-title">{appName}</h4>
          </Link>
          <div className="sidebar-toggle" data-toggle="sidebar" data-active="true" onClick={minisidebar}>
            <i className="icon">
              <svg width="20" className="icon-20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.25 12.2744L19.25 12.2744" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M10.2998 18.2988L4.2498 12.2748L10.2998 6.24976" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </i>
          </div>
        </div>

        <div className="pt-0 sidebar-body data-scrollbar" data-scroll="1" id="my-scrollbar">
          {/* Sidebar Item */}
          <div className="sidebar-list navbar-collapse" id="sidebar">
            <SidebarItem />
          </div>
        </div>
      </aside>
    </>
  );
});

export default Sidebar;
