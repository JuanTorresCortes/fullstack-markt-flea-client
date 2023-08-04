import React, { useState } from "react";
import { loginUser } from "../Api/api";
import { setUserToken } from "../Auth/authLocalStorage";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
const Login = () => {
  const [email, setEmail] = useState(""); // State variable to store the email input value
  const [password, setPassword] = useState(""); // State variable to store the password input value
  const [error, setError] = useState(""); // State variable to store any login error messages

  const { setShouldRefresh } = useOutletContext();
  const navigate = useNavigate();

  // Function to handle form submission when the user clicks the submit button
  const handleOnSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setShouldRefresh(true); // Set the shouldRefresh state to true to refresh the outlet context

    // Create a data object with the email and password to be sent to the server
    const data = {
      email,
      password,
    };

    // Call the API function to login the user with the provided data
    const loginResult = await loginUser(data);

    if (loginResult.success) {
      // If the login is successful, set the user token in local storage, reset the email and password states, and navigate to the home page
      setUserToken(loginResult.token);
      setEmail("");
      setPassword("");
      setError({});
      navigate("/products");
    } else {
      // If there are errors in the login response, set the error state to display the error messages
      setError(loginResult.error);
    }

    setShouldRefresh(false); // Set the shouldRefresh state to false to stop the outlet context refresh
  };

  return (
    <div className="form-container">
      <h1>Login</h1>
      {/* Login form */}
      <Form onSubmit={handleOnSubmit} className="form">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      {/* Display error messages if any */}
      {error.email && <p>{error.email}</p>}
      {error.password && <p>{error.password}</p>}
    </div>
  );
};

export default Login;
