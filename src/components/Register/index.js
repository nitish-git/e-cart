import classNames from "classnames";
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { fetchAllUsers, register } from "../../services";
import { isUserLoading$ } from "../../store";

const emptyObject = {};
const emailRegex = /[a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+$/;

export const RegisterScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isUserLoading = useSelector(isUserLoading$);
  const [userDetails, setUserDetails] = useState(emptyObject);
  const [validation, setValidation] = useState(emptyObject);

  const handleRegistration = () => {
    const { name, email, pass } = userDetails;

    setValidation(emptyObject);

    if (!name || !emailRegex.test(email) || !pass) {
      setValidation({
        name: !name,
        email: !emailRegex.test(email),
        pass: !pass,
      });
    } else {
      const user = {
        name,
        email,
        pass,
        isAuthenticated: true,
      };

      dispatch(register(user)).then(() => {
        localStorage.setItem("isAuthenticated", true);
        dispatch(fetchAllUsers());
        history.push("/");
      });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleRegistration();
    }
  };

  return !isUserLoading ? (
    <div className="login-wrapper">
      <div className="login-form-wrapper">
        <h1 className="text-dark-theme login-form-heading">Sign up</h1>
        <div className="field-wrapper">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Full Name"
            className={classNames({
              "mb-20": !validation?.name,
              "error-field": validation?.name,
            })}
            value={userDetails?.name}
            onKeyDown={handleKeyDown}
            onChange={(e) => {
              setValidation((prev) => ({
                ...prev,
                name: !e.target.value,
              }));
              setUserDetails((prev) => ({
                ...prev,
                name: e.target.value,
              }));
            }}
          />
          {validation?.name && (
            <div className="error-message">Full Name required</div>
          )}
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            required
            placeholder="Email Address"
            className={classNames({
              "mb-20": !validation?.email,
              "error-field": validation?.email,
            })}
            value={userDetails?.email}
            onKeyDown={handleKeyDown}
            onChange={(e) => {
              setValidation((prev) => ({
                ...prev,
                email: !emailRegex.test(e.target.value),
              }));
              setUserDetails((prev) => ({ ...prev, email: e.target.value }));
            }}
          />
          {validation?.email && (
            <div className="error-message">Email required</div>
          )}
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            required
            placeholder="Password"
            className={classNames({
              "mb-20": !validation?.pass,
              "error-field": validation?.pass,
            })}
            value={userDetails?.pass}
            onKeyDown={handleKeyDown}
            onChange={(e) => {
              setValidation((prev) => ({
                ...prev,
                pass: !e.target.value,
              }));
              setUserDetails((prev) => ({ ...prev, pass: e.target.value }));
            }}
          />
          {validation?.pass && (
            <div className="error-message">Password required</div>
          )}
        </div>
        <Button
          variant="success"
          className="mb-20 signin-button"
          onClick={handleRegistration}
        >
          Sign up
        </Button>
        <div className="d-flex justify-content-center align-items-center">
          If you are already registered than
          <Button
            variant="link"
            className="signup-link-btn"
            onClick={() => history.push("/login")}
          >
            Log In
          </Button>
        </div>
      </div>
    </div>
  ) : (
    <div />
  );
};
