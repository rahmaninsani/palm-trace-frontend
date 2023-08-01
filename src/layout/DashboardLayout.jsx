import { useState, memo } from "react";
import { Outlet } from "react-router-dom";

import { Header, Banner, Sidebar, Footer } from "../components/partials/dashboard";
import { Loader } from "../components/elements";

const DashboardLayout = memo(() => {
  const [title, setTitle] = useState("");

  return (
    <>
      {/* Loader  */}
      <Loader />

      {/* Sidebar */}
      <Sidebar />

      <main className="main-content">
        <div className="position-relative">
          {/* Topbar */}
          <Header />

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
