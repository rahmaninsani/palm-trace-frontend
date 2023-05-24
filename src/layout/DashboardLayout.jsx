import { useState, useEffect, memo } from "react";
import { Outlet } from "react-router-dom";

import { Header, Banner, Sidebar, Footer } from "../components/partials/dashboard";
import { Loader } from "../components/elements";

const DashboardLayout = memo(({ role }) => {
  const [title, setTitle] = useState("");

  const appName = "Palm Safe";
  useEffect(() => {});

  return (
    <>
      {/* Loader  */}
      <Loader />

      {/* Sidebar */}
      <Sidebar appName={appName} role={role} />

      <main className="main-content">
        <div className="position-relative">
          {/* Topbar */}
          <Header role={role} />

          {/* Banner */}
          <Banner title={title} />
        </div>

        <div className="py-0 conatiner-fluid content-inner mt-n5">
          {/* Dynamic Page */}
          <Outlet context={{ setTitle }} />
        </div>

        {/* Footer */}
        <Footer />
      </main>
    </>
  );
});

export default DashboardLayout;
