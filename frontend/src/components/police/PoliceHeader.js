import React, { useContext } from "react";
import "../Header.css";
import { Link } from "react-router-dom";
import { BiLogOutCircle } from "react-icons/bi";
import Button from "@mui/material/Button";
import logo from "../../static/images/logo.png";
import { LoginContext } from "../../context/LoginContext";

const PoliceHeader = () => {
  const {user,logoutUser} = useContext(LoginContext)
  return (
    <div>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <section className="top-nav">
        <div classsName="home_logo">
        
    <Link to="/police/home">
          <img className="logo_img img-fluid" src={logo} alt="" srcSet="" />
          </Link>
        </div>
        <input id="menu-toggle" type="checkbox" />
        <label className="menu-button-container" htmlFor="menu-toggle">
          <div className="menu-button"></div>
        </label>
        { user ? ( 
        <ul className="menu">
          <li>
            <div className="create-account m-2 d-flex flex-column">
              <p className="text-center mt-4 text-capitalize">
                {user.username}
              </p>
            </div>
          </li>
          <li>
            <div className="create-account m-2 m-2 d-flex flex-column">
              <p className="text-center mb-0">
                <BiLogOutCircle />
              </p>
              {/* <Link to="/login"> */}
              <Button variant="outline-danger"  onClick={logoutUser}>Logout</Button>
              {/* </Link> */}
            </div>
          </li>
        </ul>
        ): ( 
          <ul className="menu">
          <li>
            <div className="create-account m-2 d-flex flex-column">
              <p className="text-center mb-0"></p>
            </div>
          </li>
          <li>
            <div className="create-account m-2 m-2 d-flex flex-column">
              <p className="text-center mb-0">
                <BiLogOutCircle />
              </p>
              <Link to="/login">
              <Button
                className="create-btn"
                size="medium"
                style={{ color: "white" }}
              >
                Login
              </Button>
              </Link>
            </div>
          </li>
        </ul>
        ) } 
      </section>
    </div>
  );
};

export default PoliceHeader;
