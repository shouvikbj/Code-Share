import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import Cookies from "js-cookie";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = ({ userEmail = "" }) => {
  const [redirect, setRedirect] = useState(false);
  const [nav, setNav] = useState({
    navbarState: false,
    navbarClass: "collapse navbar-collapse",
  });

  const { navbarState, navbarClass } = nav;

  const myToggler = () => {
    navbarState
      ? setNav({
          ...nav,
          navbarState: false,
          navbarClass: "collapse navbar-collapse",
        })
      : setNav({
          ...nav,
          navbarState: true,
          navbarClass: "collapse navbar-collapse show",
        });
  };

  const redirectToLogin = () => {
    return <Redirect to="/login" />;
  };

  const loadNavbar = () => {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-none">
          <div className="container-fluid">
            <Link
              className="navbar-brand"
              to="/"
              style={{ color: "yellow", fontWeight: "bold" }}
            >
              Navbar
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              onClick={myToggler}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className={navbarClass} id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <Link className="nav-link text-white" to="/">
                  Home
                </Link>
                <Link className="nav-link text-white" to="/form">
                  Share File
                </Link>
                <Link
                  className="nav-link text-white"
                  to=""
                  onClick={handleLogout}
                >
                  Logout ({userEmail})
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  };

  const handleLogout = () => {
    Cookies.remove("userEmail");
    toast("Logged out!", { type: "info" });
    setRedirect(true);
  };

  useEffect(() => {
    //
  }, []);

  return (
    <div>
      {loadNavbar()}
      {redirect ? redirectToLogin() : ""}
    </div>
  );
};
export default Navbar;
