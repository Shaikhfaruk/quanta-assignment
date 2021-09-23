import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <Link to="/login" type="button" className="toggle-btn">
        Log In
      </Link>
      <Link to="/register" type="button" className="toggle-btn">
        Register
      </Link>
    </>
  );
};

export default Navbar;
