import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const history = useHistory();

  const [user, setUser] = useState(null);

  const getUser = async () => {
    const res = await axios.get("/auth", {
      headers: {
        Authorization: `Brearer ${localStorage.getItem("token")}`,
      },
    });
    setUser(res.data);
  };

  useEffect(() => {
    getUser();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    history.push("/login");
  };
  if (!localStorage.getItem("token")) {
    history.push("/login");
  }

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
      <section className="homeContainer">
        <h1>Welcome {user && user.name}</h1>
        <button className="logout" onClick={logout}>
          Logout
        </button>
      </section>
    </>
  );
};

export default Home;
