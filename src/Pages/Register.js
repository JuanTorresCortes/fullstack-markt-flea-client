import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../Api/api";
import { Button, Form } from "react-bootstrap";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [birthday, setBirthday] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({}); // State variable to store any validation errors

  const navigate = useNavigate();

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const data = {
      firstName,
      lastName,
      email,
      billingAddress,
      birthday,
      password,
    };
    const registerResult = await registerUser(data);
    console.log(registerResult);

    if (registerResult.success) {
      setError({});
      setFirstName("");
      setLastName("");
      setEmail("");
      setBillingAddress("");
      setBirthday("");
      setPassword("");
      navigate("/login");
    } else {
      // If there are errors in the registration response, set the error state to display the error messages
      setError(registerResult.error);
    }
  };

  return (
    <div className="form-container">
      <h1>Register</h1>
      <Form onSubmit={handleOnSubmit} className="form">
        <Form.Group className="mb-3" controlId="firstName">
          <Form.Label>First Name:</Form.Label>
          <Form.Control
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="lastName">
          <Form.Label>Last Name:</Form.Label>
          <Form.Control
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="billingAddress">
          <Form.Label>Billing Address:</Form.Label>
          <Form.Control
            type="text"
            value={billingAddress}
            onChange={(e) => setBillingAddress(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="birthday">
          <Form.Label>Birthday:</Form.Label>
          <Form.Control
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="success" type="submit">
          Submit
        </Button>
      </Form>

      {/* Display error messages if any */}
      {error.firstName && <p>{error.firstName}</p>}
      {error.lastName && <p>{error.lastName}</p>}
      {error.email && <p>{error.email}</p>}
      {error.billingAddress && <p>{error.billingAddress}</p>}
      {error.birthday && <p>{error.birthday}</p>}
      {error.password && <p>{error.password}</p>}
    </div>
  );
};

export default Register;
