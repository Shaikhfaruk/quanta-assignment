import React, { useState } from "react";
import Navbar from "../components/Navbar";
import validator from "../components/validator";

const Login = () => {
  const [values, setValues] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setErrors(validator(values));
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
              value={values.email}
              onChange={handleChange}
              required
            />
            {errors.email && <p className="errors">{errors.email}</p>}
            <input
              type="password"
              className="input-field"
              placeholder="Password"
              name="password"
              value={values.password}
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
            <button
              type="submit"
              className="submit-btn"
              onClick={handleFormSubmit}>
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
