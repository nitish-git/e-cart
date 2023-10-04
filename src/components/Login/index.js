import classNames from "classnames";
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { fetchAllUsers, updateUser } from "../../services";
import { allUsers$, isUserLoading$, setAlert } from "../../store";
import "./login.css";

const emptyObject = {};
const emailRegex = /[a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+$/;

export const LoginScreen = () => {
  const dispatch = useDispatch();
  const isUserLoading = useSelector(isUserLoading$);
  const history = useHistory();
  const allUsers = useSelector(allUsers$);
  const [userDetails, setUserDetails] = useState(emptyObject);
  const [validation, setValidation] = useState(emptyObject);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleLogin();
    }
  };

  const handleLogin = () => {
    const { email, pass } = userDetails;

    setValidation(emptyObject);

    if (!emailRegex.test(email) || !pass) {
      setValidation({
        email: !emailRegex.test(email),
        pass: !pass,
      });
    } else {
      const user = allUsers.filter((e) => e.email === userDetails?.email)[0];

      if (user?.pass === userDetails?.pass) {
        dispatch(
          updateUser({
            id: user?.id,
            user: { ...user, isAuthenticated: true },
          })
        ).then(() => {
          localStorage.setItem("isAuthenticated", true);
          dispatch(fetchAllUsers());
          history.push("/");
        });
      } else {
        dispatch(setAlert("Invalid Credentials"));
      }
    }
  };

  return !isUserLoading ? (
    <div className="login-wrapper">
      <div className="login-form-wrapper">
        <h1 className="text-dark-theme login-form-heading">Login</h1>
        <div className="field-wrapper">
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            type="email"
            className={classNames({
              "mb-20": !validation?.email,
              "error-field": validation?.email,
            })}
            placeholder="Email Address"
            value={userDetails?.email}
            onChange={(e) => {
              setValidation((prev) => ({
                ...prev,
                email: !emailRegex.test(e.target.value),
              }));
              setUserDetails((prev) => ({ ...prev, email: e.target.value }));
            }}
            onKeyDown={handleKeyDown}
          />
          {validation?.email && (
            <div className="error-message">Email required</div>
          )}
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            className={classNames({
              "mb-20": !validation?.pass,
              "error-field": validation?.pass,
            })}
            placeholder="Password"
            value={userDetails?.pass}
            onChange={(e) => {
              setValidation((prev) => ({
                ...prev,
                pass: !e.target.value,
              }));
              setUserDetails((prev) => ({ ...prev, pass: e.target.value }));
            }}
            onKeyDown={handleKeyDown}
          />
          {validation?.pass && (
            <div className="error-message">Password required</div>
          )}
        </div>
        <Button
          variant="success"
          className="mb-20 signin-button"
          onClick={handleLogin}
        >
          Login
        </Button>
        <div className="d-flex justify-content-center align-items-center">
          If you don't have an account?{" "}
          <Button
            variant="link"
            className="signup-link-btn"
            onClick={() => history.push("/register")}
          >
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  ) : (
    <div />
  );
};
