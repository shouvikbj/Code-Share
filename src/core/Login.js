import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { api } from "../Backend";
import Cookies from "js-cookie";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [redirect, setRedirect] = useState(false);

  const loadLoginForm = () => {
    return (
      <div id="loginDiv" style={{ height: "100vh" }}>
        <br />
        <br />
        <h1 className="text-center text-white">Login</h1>
        <br />
        <br />
        <div className="container">
          <div className="row">
            <div className="col-md-3 col-sm-0"></div>
            <div className="col-md-6 col-sm-12">
              <div className="card" style={{ width: "100%" }}>
                <div className="card-body">
                  <h4 className="card-title text-center">
                    Provide Creadentials
                  </h4>
                  <form id="loginForm" onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label text-white">Title</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="add email"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label text-white">Text</label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        placeholder="password"
                        required
                      />
                    </div>
                    <div className="text-right">
                      <button type="submit" className="btn btn-primary">
                        Login
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-0"></div>
          </div>
        </div>
      </div>
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    var form = document.getElementById("loginForm");
    fetch(`${api}auth`, {
      method: "POST",
      body: new FormData(form),
      mode: "cors",
    })
      .then((response) => {
        return response.json();
      })
      .then((dt) => {
        // console.log(dt);
        if (dt.status === "ok") {
          Cookies.set("userEmail", dt.email);
          toast("Login success", { type: "success" });
          setRedirect(true);
        } else {
          toast("Invalid Credentials!", { type: "error" });
        }
      })
      .catch((err) => {
        toast("Something went wrong!", { type: "error" });
      });
  };

  const redirectToHome = () => {
    return <Redirect to="/" />;
  };

  return (
    <div>
      <ToastContainer />
      {loadLoginForm()}
      {redirect ? redirectToHome() : ""}
    </div>
  );
};

export default Login;
