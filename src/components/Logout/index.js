import React from "react";
import { Image, Button } from "react-bootstrap";
import { useHistory } from "react-router";
import { Images } from "../../resources";
import "./logout.css";

export const LogoutScreen = () => {
  const history = useHistory();

  return (
    <>
      <div className="image-wrapper">
        <Image src={Images.logo} alt="logo" className="logo-image" />
        <div className="message">You have successfully Signed out.</div>
      </div>
      <div className="button-container">
        <Button
          className="btn-signin"
          onClick={() => {
            history.push("/login");
            localStorage.setItem("isLoggedOut", false);
          }}
        >
          Sign In
        </Button>
        <Button
          variant="success"
          className="btn-return"
          onClick={() => {
            history.push("/");
            localStorage.setItem("isLoggedOut", false);
          }}
        >
          Go Back To Home
        </Button>
      </div>
    </>
  );
};
