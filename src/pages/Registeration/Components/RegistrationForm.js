import React, { useState } from "react";
import "../Styles/RegistrationForm.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setAuthUser } from "../../../helper/Storage";
const register_endpoint_path = "http://localhost:4000/auth/register";
function RegistrationForm() {
  const navigate = useNavigate();
  const [register, setRegister] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    loading: false,
    err: [],
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here

    // extra validation
    if (register.password !== register.confirmPassword) {
      alert("passwords don't match");
    } else {
      setRegister({ ...register, loading: true });
      axios
        .post(register_endpoint_path, {
          name: `${register.firstName} ${register.lastName}`,
          email: register.email,
          password: register.password,
          phone: register.phoneNumber,
          status: 0,
          type: "normal",
        })
        .then((resp) => {
          console.log(resp);
          setRegister({ ...register, loading: false, err: [] });
          navigate("/");
        })
        .catch((errors) => {
          console.log(errors);
          setRegister({
            ...register,
            loading: false,
            err: errors.response.data.errors,
          });
        });
    }
  };

  return (
    <>
      {register.err.map((error, index) => (
            <h2
              key={index}
              style={{
                background: "white",
                color: "red",
              }}
            >
              {error.msg}
            </h2>
          ))}

      <div className="RegistrationForm">
        <form onSubmit={handleSubmit}>
          <label>
            First Name:
            <input
              type="text"
              value={register.firstName}
              onChange={(event) =>
                setRegister({
                  ...register,
                  firstName: event.target.value,
                })
              }
              required
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              value={register.lastName}
              onChange={(event) =>
                setRegister({
                  ...register,
                  lastName: event.target.value,
                })
              }
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              value={register.email}
              onChange={(event) =>
                setRegister({
                  ...register,
                  email: event.target.value,
                })
              }
              required
            />
          </label>
          <label>
            Phone Number:
            <input
              type="text"
              value={register.phoneNumber}
              onChange={(event) =>
                setRegister({
                  ...register,
                  phoneNumber: event.target.value,
                })
              }
              required
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={register.password}
              onChange={(event) =>
                setRegister({
                  ...register,
                  password: event.target.value,
                })
              }
              required
            />
          </label>
          <label>
            Confirm Password:
            <input
              type="password"
              value={register.confirmPassword}
              onChange={(event) =>
                setRegister({
                  ...register,
                  confirmPassword: event.target.value,
                })
              }
              required
            />
          </label>
          <button type="submit">Register</button>
        </form>
      </div>
    </>
  );
}

export default RegistrationForm;
