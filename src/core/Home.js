import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Base from "../reusables/Base";
import Cookies from "js-cookie";

import logo from "../assets/error.gif";

import { getData } from "./apicalls/apicalls";

const Home = () => {
  // const [auth, setAuth] = useState(false);
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState({});
  const [redirect, setRedirect] = useState(false);

  const authStatus = () => {
    var userEmail = Cookies.get("userEmail");
    if (userEmail) {
      // setAuth(true);
      setUser(userEmail);
      // console.log(user);
    } else {
      setRedirect(true);
    }
  };

  const loadAllData = () => {
    getData()
      .then((data) => {
        if (data.error) {
          setError(true);
        } else {
          setData(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        setError(true);
      });
  };

  const loadHomeComponent = () => {
    return (
      <div>
        <h2 className="text-center text-white">Home</h2>
        <br />
        <div className="container">
          <div className="row">
            <div className="col-md-4 col-sm-0">
              <div className="card">
                <div
                  className="card-header text-center"
                  style={{ fontWeight: "bold" }}
                >
                  {data.fileName}
                </div>
                <div className="card-body">
                  <p className="card-text">
                    <span style={{ fontWeight: "bold" }}>
                      This is the actual file available for download.
                    </span>
                    <br />
                    The content of the file is shown in the TextBox
                  </p>
                  <div className="text-right">
                    <a
                      href={`https://codeshare.pythonanywhere.com/${data.fileName}`}
                      download={data.fileName}
                      target="_blank"
                    >
                      <button className="btn btn-outline-primary">
                        Download
                      </button>
                    </a>
                  </div>
                </div>
              </div>
              <br />
            </div>
            <div className="col-md-8 col-sm-12">
              <h5 className="text-white">Content of the File</h5>
              <textarea id="content" value={data.content}></textarea>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const redirectToLogin = () => {
    return <Redirect to="/login" />;
  };

  const showError = () => {
    return (
      <div className="container text-center">
        <br />
        <br />
        <br />
        <br />
        <img id="errorImg" width={"50%"} src={logo} alt="error" />
        <br />
        <br />
        <h6 className="text-warning" style={{ fontWeight: "bold" }}>
          Something Went Wrong!
        </h6>
      </div>
    );
  };

  const showLoading = () => {
    return (
      <div className="container text-center">
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className="spinner-border text-warning" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  };

  useEffect(() => {
    authStatus();
    loadAllData();
  }, []);

  return (
    <Base userEmail={user}>
      <br />
      {error ? showError() : loading ? showLoading() : loadHomeComponent()}
      {redirect ? redirectToLogin() : ""}
    </Base>
  );
};

export default Home;
