import React, { useState, useEffect } from "react";
import Card from "../UI/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import classes from "./Login.module.css";
// import Axios from "../..//Api/axios";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  // const url = "/Signup";
  const navigate = useNavigate();

  // const userRef = useRef();
  // const errorRef = useRef();

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [reTypePassword, setReTypePassword] = useState("");
  const [error, setError] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (userEmail.includes("@") && userPassword === reTypePassword) {
      try {
        const response = await Axios.post(
          "http://localhost:4000/Signup",
          {
            email: userEmail,
            password: userPassword,
            repassword: reTypePassword,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        const accessToken = JSON.stringify(response.data);
        localStorage.setItem("userProfile", accessToken);
        console.log(accessToken);
        setUserEmail("");
        setUserPassword("");
        setReTypePassword("");
        console.log("login successful");
        navigate("/Login");
      } catch (err) {
        if (!err?.response) {
          setError("No Server Response");
        } else if (err.response?.status === 404) {
          setError("Page not found");
        } else {
          setError("Registration Failed");
        }
      }
    } else {
      setError("Please enter correct credentials");
    }
  };

  useEffect(() => {
    setError("");
  }, [userEmail, userPassword]);

  return (
    <Card className={classes.form}>
      <Form onSubmit={onSubmitHandler}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={({ target }) => setUserEmail(target.value)}
            value={userEmail}
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
            onChange={({ target }) => setUserPassword(target.value)}
            value={userPassword}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="reformBasicPassword">
          <Form.Label>Re-Type Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Re-Type Password"
            onChange={({ target }) => setReTypePassword(target.value)}
            value={reTypePassword}
          />
        </Form.Group>
        {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group> */}
        <Button className={classes.button} type="submit">
          Submit
        </Button>
        {error && <p>{error}</p>}
      </Form>
    </Card>
  );
};

export default Signup;
