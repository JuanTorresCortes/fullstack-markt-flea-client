import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";=>don't forget nav to login
import { registerUser } from "../Api/api";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [birthday, setBirthday] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({}); // State variable to store any validation errors

  //   const navigate = useNavigate();

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
      // navigate("/login"); =>don't forget nav to login
    } else {
      // If there are errors in the registration response, set the error state to display the error messages
      setError(registerResult.error);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleOnSubmit}>
        <label htmlFor="firstName">First Name: </label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <br />
        <label htmlFor="lastName">Last Name: </label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <br />
        <label htmlFor="email">Email: </label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor="billingAddress">Billing Address: </label>
        <input
          type="text"
          value={billingAddress}
          onChange={(e) => setBillingAddress(e.target.value)}
        />
        <br />
        <label htmlFor="birthday">Birthday: </label>
        <input
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
        />
        <br />
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button style={{ backgroundColor: "green" }}>Submit</button>
      </form>
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

// const userSchema = new mongoose.Schema({
//   _id: { type: String, default: uuid },
//   firstName: { type: String, required: true },
//   lastName: { type: String, required: true },
//   email: {
//     type: String,
//     required: true,
//     lowercase: true,
//     trim: true,
//     unique: true,
//   },
//   billingAddress: { type: String, required: true },
//   birthday: { type: Date, required: true },
//   myItems: [{ type: String, ref: "items" }],
//   passwordHash: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now },
//   messages: [messageSchema], // Using the imported messageSchema
// });
