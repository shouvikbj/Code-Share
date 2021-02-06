import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Base from "../reusables/Base";
import Cookies from "js-cookie";

import { api } from "../Backend";

const Live = () => {
  const [user, setUser] = useState("");
  const [redirect, setRedirect] = useState(false);
  // const [data, setData] = useState("");

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

  const redirectToLogin = () => {
    return <Redirect to="/login" />;
  };

  const handleChange = (event) => {
    var form = document.getElementById("liveDataForm");
    fetch(`${api}live`, {
      method: "POST",
      mode: "cors",
      body: new FormData(form),
    });
  };

  const loadLiveData = () => {
    fetch(`${api}live/get`, {
      method: "GET",
      mode: "cors",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (document.getElementById("liveData") != null) {
          var textarea = document.getElementById("liveData");
          textarea.value = data.data;
        }
      });
  };

  const loadContent = () => {
    return (
      <div className="pt-2">
        <h5 className="text-white text-center">Live Code Share</h5>
        <form id="liveDataForm">
          <textarea
            name="liveData"
            id="liveData"
            cols="30"
            rows="10"
            onInput={handleChange}
          ></textarea>
        </form>
      </div>
    );
  };

  useEffect(() => {
    authStatus();
    setInterval(loadLiveData, 1000);
  }, []);

  return (
    <Base userEmail={user}>
      {loadContent()}
      {redirect ? redirectToLogin() : ""}
    </Base>
  );
};

export default Live;
