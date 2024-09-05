import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaStar } from "react-icons/fa";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import "./jobItemindex.css";

const ApiStatusConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};
const JobItemDetails = () => {
  const [jobItemData, setjobItemData] = useState({});
  const [jobItemSkills, setjobItemSkills] = useState([]);
  const [apiStatus, setapiStatus] = useState(ApiStatusConstants.initial);

  const { id } = useParams();
  const navigate = useNavigate();
  const onclickLogout = () => {
    Cookies.remove("jwt_token");
    navigate("/login");
  };

  useEffect(() => {
    const getgobinsdata = async () => {
      setapiStatus(ApiStatusConstants.initial);
      const jwttoken = Cookies.get("jwt_token");
      const url = `https://apis.ccbp.in/jobs/${id}`;
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwttoken}`,
        },
      };

      try {
        const response = await fetch(url, options);
        if (response.ok) {
          const data = await response.json();
          const updatedjobdiscription = data.job_details;
          const skills = updatedjobdiscription.skills;
          setjobItemSkills(skills);
          setjobItemData(updatedjobdiscription);
          setapiStatus(ApiStatusConstants.success);
          console.log(skills[1].name);
        }
      } catch (e) {
        console.error("Error occurred while fetching job details", e);
        setapiStatus(ApiStatusConstants.failure);
      }
    };
    getgobinsdata();
  }, [id]);

  const loader = () => (
    <div className="loader-container">
      <h1>loading</h1>
      <h1>{jobItemData.title}</h1>
    </div>
  );
  const header = () => (
    <div className="headerclass">
      <div className="headlogodiv">
        <img
          className="logoimg"
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="logo"
        />
      </div>
      <div className="homejobsdiv">
        <p
          className="homejobsh1"
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </p>
        <p className="homejobsh1">Jobs</p>
      </div>
      <div className="logoutbtndiv">
        <button className="logoutbutton" type="button" onClick={onclickLogout}>
          Logout
        </button>
      </div>
    </div>
  );
  const jobSummary = () => {
    return (
      <div className="main-black-background">
        <div className="jobItem-details-bacground">
          <div className="Jobitem-logo-title-div">
            <div className="jobitem-logo-div">
              <img
                src={jobItemData.company_logo_url}
                alt="jobitem-company-logo"
                className="jobitem-logo-image"
              />
            </div>
            <div className="jobitem-title-ratings-div">
              <div className="jobitem-title-div">
                <p className="jobitem-title">{jobItemData.title}</p>
              </div>
              <div className="jobitem-rating-star-rating-div">
                <div className="jobitem-rating-stardiv">
                  <FaStar className="jobitem-star-icon" />
                </div>
                <div className="jobitem-radings-div">
                  <p className="jobitem-ratings">{jobItemData.rating}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="jobitem-location-employmenttype-packageperannum-div">
            <div className="joitem-location-img-location-div">
              <div className="jobitem-location-img-div">
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  className="jobitem-locationsimbol"
                />
              </div>
              <div className="jobitem-location-div">
                <p className="jobitem-location">{jobItemData.location}</p>
              </div>
            </div>
            <div className="jobitem-employment-img-employement-name-div">
              <div className="jobitem-employment-img-div">
                <FontAwesomeIcon
                  icon={faBriefcase}
                  className="jobitem-employmentsymbol"
                />
              </div>
              <div className="jobitem-employment-name-div">
                <p className="jobitem-employment-name">
                  {jobItemData.employment_type}
                </p>
              </div>
            </div>
            <div className="jobitem-packageperannum-div">
              <p className="jobitem-packageperannum">
                {jobItemData.package_per_annum}
              </p>
            </div>
          </div>
          <div className="jobitem-hr-div">
            <hr className="jobitem-hr" />
          </div>

          <div className="jobitem-discription-heading-visitlink-div">
            <div className="jobitem-description-heading-div">
              <h2 className="descriptionheading">Description</h2>
            </div>
            <div className="jobitem-vist-and-visitling-img-div">
              <a
                href={jobItemData.company_website_url}
                target="_blank"
                rel="noopener noreferrer"
                className="visit-anchor"
              >
                <span className="visit">Visit</span>
                <OpenInNewIcon
                  style={{
                    fontSize: "18px",
                    color: "#6366f1",
                    marginRight: "10px",
                  }}
                />
              </a>
            </div>
          </div>
          <div className="jobitem-description-details-div">
            <p className="jobitem-discription">{jobItemData.job_description}</p>
          </div>
          <div className="jobitem-skills-div">
            <h2 className="jobitem-skills">Skills</h2>
          </div>

          <div className="first-section-skills">
            <div className="jobitem-first-skills-div">
              <div className="skills-icon-div">
                {jobItemSkills.length > 0 && (
                  <img src={jobItemSkills[0].image_url} alt="skill-icon" />
                )}
                {jobItemSkills.length > 0 && (
                  <p className="jobitem-skilldescription">
                    {jobItemSkills[0].name}
                  </p>
                )}
              </div>
            </div>
            <div className="jobitem-second-skills-div">
              <div className="skills-icon-div">
                {jobItemSkills.length > 1 && (
                  <img src={jobItemSkills[1].image_url} alt="skill-icon" />
                )}
                {jobItemSkills.length > 1 && (
                  <p className="jobitem-skilldescription">
                    {jobItemSkills[1].name}
                  </p>
                )}
              </div>
            </div>
            <div className="jobitem-third-skills-div">
              <div className="skills-icon-div">
                {jobItemSkills.length > 2 && (
                  <img src={jobItemSkills[2].image_url} alt="skill-icon" />
                )}
                {jobItemSkills.length > 2 && (
                  <p className="jobitem-skilldescription">
                    {jobItemSkills[2].name}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="second-fourth-skills">
            <div className="jobitem-fourth-skills-div">
              <div className="skills-icon-div">
                {jobItemSkills.length > 3 && (
                  <img src={jobItemSkills[3].image_url} alt="skill-icon" />
                )}
                {jobItemSkills.length > 3 && (
                  <p className="jobitem-skilldescription">
                    {jobItemSkills[3].name}
                  </p>
                )}
              </div>
            </div>
            <div className="jobitem-fifth-skills-div">
              <div className="skills-icon-div">
                {jobItemSkills.length > 4 && (
                  <img src={jobItemSkills[4].image_url} alt="skill-icon" />
                )}
                {jobItemSkills.length > 4 && (
                  <p className="jobitem-skilldescription">
                    {jobItemSkills[4].name}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="life-at-company-heading-div">
            <h2 className="life-at-company-heading"> Life at Company</h2>
          </div>
          <div className="life-at-company-description-and-image-div">
            <div className="life-at-company-description-div">
              {jobItemData.life_at_company &&
                jobItemData.life_at_company.description.length > 1 && (
                  <p className="life-at-company-description">
                    {jobItemData.life_at_company.description}
                  </p>
                )}
            </div>
            <div className="life-at-company-image-div">
              {jobItemData.life_at_company &&
                jobItemData.life_at_company.image_url.length > 1 && (
                  <img
                    className="life-at-company-image"
                    src={jobItemData.life_at_company.image_url}
                    alt="life-at-company-image"
                  />
                )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const jobItemstructure = () => {
    return (
      <div>
        {header()}
        {jobSummary()}
      </div>
    );
  };
  return <div>{jobItemstructure()}</div>;
};

export default JobItemDetails;
