import { useNavigate, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import JobItem from "../JobItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { ClipLoader } from "react-spinners";
import "./index.css";
const Jobs = () => {
  const navigate = useNavigate();
  const jwt_token = Cookies.get("jwt_token");
  const apistatusConstants = {
    initial: "INITIAL",
    success: "SUCCESS",

    inProgress: "INPROGRESS",
  };

  // const [isloading, setisloading] = useState(false);
  const [apistatus, setapistatus] = useState(apistatusConstants.initial);
  const [jobscount, setjobscount] = useState("");

  const [jobslist, setJobslist] = useState([]);
  const [profiledetails, setProfiledetails] = useState([]);
  const [Employmenttype, setemploymenttype] = useState("");
  const [minimumpacage, setminimumpackage] = useState("");
  const [searchedinput, setsearchedinput] = useState("");
  const [searchedvalue, setsearchedvalue] = useState("");

  const handletenlpa = () => {
    setminimumpackage((prevState) => (prevState === "" ? "1000000" : ""));
  };
  const handletwentylpa = () => {
    setminimumpackage((prevState) =>
      prevState === "2000000" ? "" : "2000000"
    );
  };
  const handlethirtylpa = () => {
    setminimumpackage((prevState) =>
      prevState === "3000000" ? "" : "3000000"
    );
  };
  const handlefortylpa = () => {
    setminimumpackage((prevState) =>
      prevState === "4000000" ? "" : "4000000"
    );
  };

  const handleinternship = (event) => {
    setemploymenttype((prevState) => (prevState === "" ? "INTERNSHIP" : ""));
  };
  const handleFulltime = () => {
    setemploymenttype((prevState) => (prevState === "" ? "FULLTIME" : ""));
  };
  const handlePartime = () => {
    setemploymenttype((prevState) => (prevState === "" ? "PARTTIME" : ""));
  };
  const handlefreelance = () => {
    setemploymenttype((prevState) => (prevState === "" ? "FREELANCE" : ""));
  };

  const handlesearchbar = (event) => {
    setsearchedinput(event.target.value);
  };
  const handlekeypress = (event) => {
    if (event.key === "Enter") {
      setsearchedvalue(searchedinput);
    }
  };

  useEffect(() => {
    const getprofiledeteils = async () => {
      setapistatus(apistatusConstants.inProgress);
      const jwttoken = Cookies.get("jwt_token");
      const url = "https://apis.ccbp.in/profile";
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
          // console.log(data.profile_details.name);
          const upadatedprofiledata = {
            name: data.profile_details.name,
            profileimageurl: data.profile_details.profile_image_url,
            shortbio: data.profile_details.short_bio,
          };
          setProfiledetails(upadatedprofiledata);
          setapistatus(apistatusConstants.success);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    getprofiledeteils();
  }, []);

  useEffect(() => {
    const getjobslist = async () => {
      // setisloading(true);
      setapistatus(apistatusConstants.inProgress);

      const jwttoken = Cookies.get("jwt_token");
      const url = `https://apis.ccbp.in/jobs?employment_type=${Employmenttype}&minimum_package=${minimumpacage}&search=${searchedvalue}`;
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
          const updateddata = data.jobs.map((eachjob) => ({
            companylogourl: eachjob.company_logo_url,
            employmenttype: eachjob.employment_type,
            id: eachjob.id,
            jobdescription: eachjob.job_description,
            location: eachjob.location,
            packageperannum: eachjob.package_per_annum,
            rating: eachjob.rating,
            title: eachjob.title,
          }));
          setJobslist(updateddata);

          const jobsinpage = updateddata.length;
          setjobscount(jobsinpage);

          // console.log(jobslist.length);
          // console.log(updateddata.length);

          // setapistatus(apistatusConstants.success);
          // const jobsinpage = updateddata.length;
          // if (jobsinpage === 0) {
          //   setapistatus(apistatusConstants.empty);
          // } else {
          //   setapistatus(apistatusConstants.success);
          // }
          setapistatus(apistatusConstants.success);
        }
      } catch (e) {
        console.error("Error:", e);
        setapistatus(apistatusConstants.failure);
      }
    };
    getjobslist();
  }, [Employmenttype, minimumpacage, searchedvalue]);

  const onclickLogout = () => {
    Cookies.remove("jwt_token");
    navigate("/login");
  };
  const header = () => {
    return (
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

  const jobslayout = () => {
    return (
      <div className="header_and_jobs_layout_div">
        <div className="header_div">{header()}</div>
        <div className="jobs_layout_container">
          <div className="profile_and_other_checkboxes_div">
            <div className="profile_picture_div">
              <div className="profile-heading-div">
                <div className="profileimg-div">
                  <img
                    alt="profilepic"
                    className="profileimg"
                    src={profiledetails.profileimageurl}
                  />
                </div>
                <div className="profile-heading-div">
                  <h1 className="profile-heading">{profiledetails.name}</h1>
                </div>
              </div>
              <div className="pofile-description-div">
                <p className="profile-description">{profiledetails.shortbio}</p>
              </div>
            </div>
            <div className="custom-hr-div">
              <hr className="custom-hr" />
            </div>
            <div className="type-of-employement-checkboxes-div">
              <div className="type-of-employement-heading-div">
                <h4 className="type-of-employement-cls">Type of employee</h4>
              </div>
              <div className="all-employment-checkboxes">
                <label className="individual-checkboxex-lables">
                  <input
                    type="checkbox"
                    value="FULLTIME"
                    checked={Employmenttype === "FULLTIME"}
                    onChange={handleFulltime}
                    className="inputs"
                  />
                  Full Time
                </label>
                <label className="individual-checkboxex-lables">
                  <input
                    type="checkbox"
                    className="inputs"
                    value="PARTTIME"
                    checked={Employmenttype === "PARTTIME"}
                    onChange={handlePartime}
                  />
                  part Time
                </label>
                <label className="individual-checkboxex-lables">
                  <input
                    type="checkbox"
                    className="inputs"
                    value="FREELANCE"
                    checked={Employmenttype === "FREELANCE"}
                    onChange={handlefreelance}
                  />
                  FreeLance
                </label>
                <label className="individual-checkboxex-lables">
                  <input
                    type="checkbox"
                    className="inputs"
                    value="INTERNSHIP"
                    checked={Employmenttype === "INTERNSHIP"}
                    onChange={handleinternship}
                  />
                  Internship
                </label>
              </div>
            </div>

            <div className="custom-hr-div">
              <hr className="custom-hr" />
            </div>
            <div className="type-of-employement-checkboxes-div">
              <div className="type-of-employement-heading-div">
                <h4 className="type-of-employement-cls">Salary Range</h4>
              </div>
              <div className="all-employment-checkboxes">
                <label className="individual-checkboxex-lables">
                  <input
                    type="radio"
                    value="1000000"
                    checked={minimumpacage === "1000000"}
                    onChange={handletenlpa}
                    className="inputs"
                  />
                  10LPA and above
                </label>
                <label className="individual-checkboxex-lables">
                  <input
                    type="radio"
                    value="2000000"
                    className="inputs"
                    checked={minimumpacage === "2000000"}
                    onChange={handletwentylpa}
                  />
                  20LPA and above
                </label>
                <label className="individual-checkboxex-lables">
                  <input
                    type="radio"
                    value="3000000"
                    className="inputs"
                    checked={minimumpacage === "3000000"}
                    onChange={handlethirtylpa}
                  />
                  30LPA and above
                </label>
                <label className="individual-checkboxex-lables">
                  <input
                    type="radio"
                    value="4000000"
                    className="inputs"
                    checked={minimumpacage === "4000000"}
                    onChange={handlefortylpa}
                  />
                  40LPA and above
                </label>
              </div>
            </div>
          </div>
          <div className="jobs_div ">
            {/* <h1 style={{ color: "blue" }}>right side data</h1> */}
            <div className="searchbar-and-icon-div">
              <input
                type="text"
                placeholder="Search..."
                value={searchedinput}
                onChange={handlesearchbar}
                onKeyDown={handlekeypress}
                style={{
                  color: "blue",
                  backgroundColor: "#000000",
                  borderRadius: "5px",
                  borderColor: "#000000",
                  marginRight: "0px",
                  width: "325px",
                  height: "25px",
                  marginTop: "15px",
                }}
              />
              <div className="searchicon-div">
                <FontAwesomeIcon
                  icon={faSearch}
                  style={{
                    color: "white",
                    backgroundColor: "#202020",
                    padding: "10px",
                    width: "32px",
                    marginBottom: "0px",
                    marginTop: "10px",
                    marginLeft: "10px",
                  }}
                />
              </div>
            </div>
            {jobscontent()}
          </div>
        </div>
      </div>
    );
  };
  if (!jwt_token) {
    return <Navigate to="/login" />;
  }
  const emptylistView = () => {
    return (
      <div className="empty-list-div">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="nojobsfound"
        />
        <div className="nojobs-headind-discription-div">
          <h1 className="no-jobs-found-heading">No Jobs Found</h1>
          <p className="no-jobs-found-discription">
            We could not find any jobs. Try other filters
          </p>
        </div>
      </div>
    );
  };

  const jobscontent = () => {
    if (jobscount === 0) {
      return emptylistView();
    }
    return (
      <div className="eachjob-div">
        {jobslist.map((eachjob) => (
          <ul>
            <JobItem carddetails={eachjob} key={eachjob.id} />
          </ul>
        ))}
      </div>
    );
  };

  const isloading = () => (
    <div className="loading-spinner-div">
      <ClipLoader color="#6366f1" size={200} className="clip-loader" />
    </div>
  );

  switch (apistatus) {
    case apistatusConstants.success:
      return jobslayout();
    case apistatusConstants.inProgress:
      return isloading();
    case apistatusConstants.empty:
      return emptylistView();
    default:
      return null;
  }
};
export default Jobs;
