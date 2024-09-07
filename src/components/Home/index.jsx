import React from "react";
import Cookies from "js-cookie";
import { useNavigate, Navigate } from "react-router-dom";
import "./index.css";
const Home = () => {
  const navigate = useNavigate();
  const jwt_token = Cookies.get("jwt_token");
  if (!jwt_token) {
    return <Navigate to="/login" />;
  }
  const onclickLogout = () => {
    Cookies.remove("jwt_token");
    navigate("/login");
  };

  const gotohome = () => {
    navigate("/jobs");
  };
  const header = () => {
    return (
      <div className="headerclass">
        <div className="head-logo-title-div">
          <div className="header-logo-div">
            <img
              src="/logo-img.png"
              alt="logoimg"
              className="header-logo-img"
            />
          </div>
          <div className="header-title-div">
            <h1 className="header-title">JOB-IN</h1>
          </div>
        </div>
        <div className="homejobsdiv">
          <p className="homejobsh1">Home</p>
          <p className="homejobsh1" onClick={gotohome}>
            Jobs
          </p>
        </div>
        <div className="logoutbtndiv">
          <button
            className="logoutbutton"
            type="button"
            onClick={onclickLogout}
          >
            Logout
          </button>
        </div>
      </div>
    );
  };

  const homebody = () => {
    return (
      <div className="mainbodydiv">
        <div className="discriptionandbuttondiv">
          <div className="headingdiv">
            <h1 className="heading">
              Find The Job That <br /> Fits Your Life
            </h1>
          </div>
          <div className="discriptiondiv">
            <p1 className="description">
              Millions of people are searching for jobs, salary
              <br />
              information, company reviews, Find the job thst fits your
              <br /> abilities and potential.
            </p1>
          </div>

          <div className="buttondiv">
            <button className="findjobsbutton" onClick={gotohome}>
              Find Jobs
            </button>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div>
      {header()}
      {homebody()}
    </div>
  );
};

export default Home;
