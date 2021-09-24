import React, { useState } from "react";
import Navbar from "../components/Navbar";
import validator from "../components/validator";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Register = () => {
  const history = useHistory();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
  });

  const { name, email, password, error } = data;

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    console.log(data);
    event.preventDefault();
    setErrors(validator(data));
    try {
      setData({ ...data, error: null });
      await axios.post(
        "/auth/register",
        { name, email, password },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      history.push("/login");
    } catch (err) {
      setData({ ...data, error: err.response.data.err });
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="form-box">
          <div className="button-box">
            <Navbar />
          </div>
          <form id="register" className="input-group">
            <input
              type="text"
              className="input-field"
              placeholder="Full Name"
              name="name"
              value={name}
              onChange={handleChange}
              required
            />
            {errors.name && <p className="errors">{errors.name}</p>}
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
              <span>I agree to the terms and conditions</span>
            </div>

            {error ? <p className="errors">{error}</p> : null}
            <button type="submit" className="submit-btn" onClick={handleSubmit}>
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
