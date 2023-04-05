import React, { useState, useEffect } from "react";
import "../Styles/RegistrationForm.css";

function RegistrationForm() {
  const [registrationForm, setRegistrationForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber:""
  });

  // Tracks Component's Life Cycle
  useEffect(() => {
    // console.log('hi');
    // // this is fired when leaving the component
    // return () => {
    //   console.log('leaving');
    // }
  }, [registrationForm]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
    console.log(registrationForm);

    // extra validation
    if (registrationForm.password !== registrationForm.confirmPassword) {
      alert("passwords don't match");
    }
  };

  return (
    <div className="RegistrationForm">
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            value={registrationForm.firstName}
            onChange={(event) =>
              setRegistrationForm({
                ...registrationForm,
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
            value={registrationForm.lastName}
            onChange={(event) =>
              setRegistrationForm({
                ...registrationForm,
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
            value={registrationForm.email}
            onChange={(event) =>
              setRegistrationForm({
                ...registrationForm,
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
            value={registrationForm.phoneNumber}
            onChange={(event) =>
              setRegistrationForm({
                ...registrationForm,
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
            value={registrationForm.password}
            onChange={(event) =>
              setRegistrationForm({
                ...registrationForm,
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
            value={registrationForm.confirmPassword}
            onChange={(event) =>
              setRegistrationForm({
                ...registrationForm,
                confirmPassword: event.target.value,
              })
            }
            required
          />
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegistrationForm;
