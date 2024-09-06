import React, { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "./index.css";
const apistatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",

  inProgress: "INPROGRESS",
};

const LoginForm = () => {
  const [apistatus, setapistatus] = useState(apistatusConstants.initial);
  const [username, setUsername] = useState("rahul");
  const [password, setPassword] = useState("rahul@2021");
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const changeUsername = (event) => {
    setUsername(event.target.value);
  };
  const changePassword = (event) => {
    setPassword(event.target.value);
  };
  const submitForm = async (event) => {
    event.preventDefault();
    setapistatus(apistatusConstants.inProgress);
    const url = "https://apis.ccbp.in/login";
    const options = {
      method: "POST",
      body: JSON.stringify({ username, password }),
    };
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        onsubmitSuccess(data.jwt_token);
      } else {
        onsubmitFailed(data.error_msg);
      }
    } catch (error) {
      console.error("Error occurred:", error);
      onsubmitFailed("Failed to login. Please try again.");
    }
  };
  const onsubmitSuccess = (jwtToken) => {
    Cookies.set("jwt_token", jwtToken, { expires: 30, path: "/" });
    setapistatus(apistatusConstants.success);
    navigate("/");
  };
  const onsubmitFailed = (errorMsg) => {
    setShowErrorMsg(true);
    setErrorMsg(errorMsg);
  };
  return (
    <form onSubmit={submitForm} className="formmainimg">
      <div className="formitemdiv">
        <div className="loginpagediv">
          <img
            className="loginpageimg"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </div>
        <div className="usernamepassdiv">
          <label className="usernamelabel">
            <p1 className="usernamepara">USERNAME</p1>
            <br />
            <input
              className="usernameinput"
              type="text"
              value={username}
              onChange={changeUsername}
            />
          </label>
          <br />
          <label>
            <p1 className="pasworsparacls">PASSWORD</p1>
            <br />
            <input
              className="password-name-input"
              type="password"
              value={password}
              onChange={changePassword}
            />
          </label>
        </div>
        <div className="buttondiv">
          <button className="loginbuton" type="submit">
            Login
          </button>
          {showErrorMsg && <p>{errorMsg}</p>}
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
