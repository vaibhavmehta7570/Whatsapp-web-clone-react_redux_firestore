import React from "react";
import logo from "../assets/images/logo.svg";
import Navbar from "./Navbar";
import "../assets/styles/Home.css";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row container-row d-flex align-items-center text-center">
          <div className="col-md-8 col-6">
            <h1 className="title-english">
              Welcome to the world of social networking
            </h1>
            <div className="title-hindi">
              सोशल नेटवर्किंग की दुनिया में आपका स्वागत है
            </div>
          </div>
          <div className="col-md-4 col-6">
            <img src={logo} alt="logo" className="main-logo" />
          </div>
        </div>
        <footer className="footer text-left">
          <p>
            Mountblue <i className="far fa-copyright blue"></i> Created with{" "}
            <i className="far fa-heart pink"></i> by{" "}
            <strong>Team Dumbledore</strong> (cohort-12){" "}
            <i className="fab fa-react fa-spin"></i>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Home;