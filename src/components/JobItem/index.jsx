import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
// import LocationOnIcon from "@mui/icons-material/LocationOn";

import "./index.css";
const JobItem = (props) => {
  const { carddetails } = props;
  const {
    companylogourl,
    id,
    employmenttype,
    jobdescription,
    location,
    packageperannum,
    rating,
    title,
  } = carddetails;
  return (
    <Link to={`/jobs/${id}`} className="link-tag">
      <div className="job-card-background-div">
        <div className="logo-title-div">
          <div className="logodiv">
            <img src={companylogourl} alt="company-logo" className="logo" />
          </div>
          <div className="title-ratings-div">
            <div className="title-div">
              <h2 className="title">{title}</h2>
            </div>
            <div className="ratings-stat-div">
              <div className="star-div">
                <FaStar className="star-icon" />
              </div>
              <div className="ratings-div">
                <h2 className="ratings"> {rating}</h2>
              </div>
            </div>
          </div>
        </div>

        <div className="location-employmenttype-pacageperannum-div">
          <div className="location-employment-div">
            <div className="locationsymbol-location-div">
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                className="locationsimbol"
              />
              <p className="location">{location}</p>
            </div>
            <div className="employmentsymbol-employment-div">
              <FontAwesomeIcon
                icon={faBriefcase}
                className="employmentsymbol"
              />
              <p className="employment">{employmenttype}</p>
            </div>
          </div>
          <div className="packageperannum-div">
            <p className="packageperannum">{packageperannum}</p>
          </div>
        </div>
        <div className="custom-hr-jobitem-div">
          <hr className="custom-hr-jobitem" />
        </div>
        <div className="discription-div">
          <h2 className="descriptionheading">Description</h2>
          <p className="description">{jobdescription}</p>
        </div>
      </div>
    </Link>
  );
};
export default JobItem;
