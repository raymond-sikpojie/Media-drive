import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userSignIn = async () => {
    const formData = {
      email,
      password,
    };
    if (!email || !password) {
      alert("Please enter email and password");
    }
    const response = await fetch("http://localhost:5000/user/login", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    // if (response.status === 200) {
    //   history.push("/hire/login");
    // }

    const responseMessage = await response.json();
    console.log(responseMessage);
    // Clear input fields
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    userSignIn();
  };

  return (
    <React.Fragment>
      <form
        action=""
        className="form"
        id="register__form"
        onSubmit={handleSubmit}
      >
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

        <button className="form-btn" id="register__btn">
          Submit
        </button>
      </form>
      <p>
        Don't Have an account? <Link to="/register">Sign Up</Link>
      </p>
    </React.Fragment>
  );
}
