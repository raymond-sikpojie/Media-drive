import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";

export default function Register() {
  const history = useHistory();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const registerUser = async () => {
    const formData = {
      firstName,
      lastName,
      email,
      password,
      password2,
    };
    if (password !== password2) {
      return alert("passwords do not match");
    }
    const response = await fetch("http://localhost:5000/user/register", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.status === 200) {
      const responseMessage = await response.json();
      console.log(responseMessage);

      history.push("/login");
    }

    // Clear form fields
    formData = {};
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser();
  };

  return (
    <React.Fragment>
      <form
        action=""
        className="form"
        id="register__form"
        onSubmit={handleSubmit}
      >
        <label htmlFor="firstname">First Name </label>
        <input
          type="text"
          name="firstname"
          id="first__name"
          required
          onChange={(e) => setFirstName(e.target.value)}
        />
        <label htmlFor="lastname">Last Name </label>
        <input
          type="text"
          name="lastname"
          id="last__name"
          required
          onChange={(e) => setLastName(e.target.value)}
        />
        <label htmlFor="email">Email </label>
        <input
          type="email"
          name="email"
          id="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="text"
          name="password"
          id="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="password2">Confirm Password</label>
        <input
          type="text"
          name="password"
          id="password"
          required
          onChange={(e) => setPassword2(e.target.value)}
        />
        <button className="form-btn" id="register__btn">
          Submit
        </button>
      </form>
      <p>
        Aready have an account? <Link to="/login">Sign In</Link>
      </p>
    </React.Fragment>
  );
}
