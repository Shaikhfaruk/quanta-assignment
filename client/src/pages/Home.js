import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="navbar">
        <div className="logo-side">
          <h1>QuantaVid</h1>
        </div>
        <div className="button-side">
          <Link to="/login" type="button" className="toggle-btn">
            Log In
          </Link>
          <Link to="/register" type="button" className="toggle-btn">
            Register
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
