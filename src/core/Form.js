import React, { useState, useEffect } from "react";
import Base from "../reusables/Base";
import Cookies from "js-cookie";
import { api } from "../Backend";
import { Redirect } from "react-router-dom";

import logo from "../assets/error.gif";
import { toast } from "react-toastify";

const Form = ({ userEmail }) => {
  const [user, setUser] = useState("");
  const [error, setError] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const authStatus = () => {
    var userEmail = Cookies.get("userEmail");
    if (userEmail) {
      setUser(userEmail);
    } else {
      setError(true);
    }
  };

  const showError = () => {
    return (
      <div className="container text-center">
        <br />
        <br />
        <br />
        <br />
        <img width={"50%"} src={logo} alt="error" />
        <br />
        <br />
        <h6 className="text-danger" style={{ fontWeight: "bold" }}>
          Something Went Wrong!
        </h6>
      </div>
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    var form = document.getElementById("uploadForm");
    fetch(`${api}upload`, {
      method: "POST",
      body: new FormData(form),
      mode: "cors",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === "ok") {
          toast(`${data.message}`, { type: "success" });
          setRedirect(true);
        } else {
          toast(`${data.message}`, { type: "error" });
        }
      });
  };

  const showUploadForm = () => {
    return (
      <div className="container">
        <h2 className="text-center text-white">Share File</h2>
        <br />
        <br />
        <br />
        <div className="row">
          <div className="col-md-3 col-sm-0"></div>
          <div className="col-md-6 col-sm-12">
            <div className="card" style={{ width: "100%" }}>
              <div className="card-body">
                <h5 className="card-title text-center">Upload File</h5>
                <br />
                <div className="row">
                  <div className="mx-auto">
                    <form
                      id="uploadForm"
                      onSubmit={handleSubmit}
                      enctype="multipart/form-data"
                    >
                      <div className="mb-3">
                        <label className="form-label text-black">
                          About the File
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="details"
                          name="details"
                          placeholder="details"
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label text-black">
                          Select File
                        </label>
                        <input
                          style={{ border: "none" }}
                          type="file"
                          className="form-control"
                          id="file"
                          name="file"
                          required
                          accept="*"
                        />
                      </div>
                      <div className="text-right">
                        <button type="submit" className="btn btn-primary">
                          Upload
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-0"></div>
        </div>
      </div>
    );
  };

  const redirectToHome = () => {
    return <Redirect to="/" />;
  };

  useEffect(() => {
    authStatus();
  }, []);

  return (
    <Base userEmail={user}>
      <br />
      {error ? showError() : showUploadForm()}
      {redirect ? redirectToHome() : ""}
    </Base>
  );
};

export default Form;
