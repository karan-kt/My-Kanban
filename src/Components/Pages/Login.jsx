import React, { useState } from "react";
import Card from "../UI/Card";
import classes from "./Login.module.css";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../Store/Reduxstore";

const Login = () => {
  const navigate = useNavigate();
  // const userRef = useRef();
  // const errorRef = useRef();
  console.log(useSelector((state) => state.auth.isAuthenticated));
  const dispatch = useDispatch();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errMessage, setErrorMessage] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (userEmail.includes("@") && userPassword.trim() !== "") {
      try {
        await Axios.get("http://localhost:4000/Login", {
          params: {
            Email: userEmail,
            Password: userPassword,
          },
        }).then((response) => {
          if (response.data === "Invalid") {
            setErrorMessage("Invalid email or password");
          } else {
            const Token = response.data;
            localStorage.setItem("Token", JSON.stringify(Token));
            dispatch(authActions.login());
            navigate("/Home");
          }
        });
      } catch (err) {
        if (!err?.response) {
          setErrorMessage("No Server Response");
        } else if (err.response?.status === 404) {
          setErrorMessage("Page not found");
        } else {
          setErrorMessage("Registration Failed");
        }
      }
      console.log(userEmail, userPassword);
      setUserEmail("");
      setUserPassword("");
    } else {
      setErrorMessage("Please enter correct credentials");
    }
  };
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
        {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group> */}
        <Button className={classes.button} type="submit">
          Submit
        </Button>
      </Form>
      {errMessage ? <p>{errMessage}</p> : <p></p>}
    </Card>
  );
};

export default Login;
