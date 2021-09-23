import React, { useState } from "react";
import Navbar from "../components/Navbar";
import validator from "../components/validator";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Register = () => {
  const history = useHistory();
  const [values, setValues] = useState({
    name: "",
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
    const { name, email, password } = values;

    if (name && email && password) {
      axios.post("http://localhost:3000/register", values).then((res) => {
        console.log(res);
        alert(res.data.message);
        history.push("/login");
      });
    } else {
      alert("error");
    }
    console.log(values);
    event.preventDefault();
    setErrors(validator(values));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    console.log("user Register successfully");
  };
  return (
    <>
      <div className="login-container">
        <div className="form-box">
          <div className="button-box">
            <Navbar />
          </div>
          <form id="register" className="input-group" onSubmit={onSubmit}>
            <input
              type="text"
              className="input-field"
              placeholder="Full Name"
              name="name"
              value={values.name}
              onChange={handleChange}
              required
            />
            {errors.name && <p className="errors">{errors.name}</p>}
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
              <span>I agree to the terms and conditions</span>
            </div>

            <button
              type="submit"
              className="submit-btn"
              onClick={handleFormSubmit}>
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
