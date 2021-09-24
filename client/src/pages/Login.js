import React, { useState } from "react";
import Navbar from "../components/Navbar";
import validator from "../components/validator";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Login = () => {
  const history = useHistory();
  const [data, setData] = useState({
    email: "",
    password: "",
    error: null,
  });

  const { email, password, error } = data;

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors(validator(data));

    try {
      setData({ ...data, error: null });
      const res = await axios.post(
        "/auth/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("token", res.data.token);
      history.push("/");
    } catch (err) {
      setData({ ...data, error: err.response.data.err });
    }
  };
  return (
    <>
      <div className="login-container">
        <div className="form-box">
          <div className="button-box">
            {/* <div id="logToggleBtn"></div> */}
            <Navbar />
          </div>
          <form id="login" className="input-group">
            <input
              type="email"
              className="input-field"
              placeholder="Email Id"
              name="email"
              value={email}
              onChange={handleChange}
              required
            />
            {errors.email && <p className="errors">{errors.email}</p>}
            <input
              type="password"
              className="input-field"
              placeholder="Password"
              name="password"
              value={password}
              onChange={handleChange}
              required
            />
            {errors.password && <p className="errors">{errors.password}</p>}
            <div className="checkbox-div">
              <input
                type="checkbox"
                className="check-box"
                name="Remember Password"
              />
              <span>Remember Password</span>
            </div>
            {error ? <p className="errors">{error}</p> : null}
            <button type="submit" className="submit-btn" onClick={handleSubmit}>
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
