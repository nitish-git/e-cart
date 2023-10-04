import React from "react";
import Button from "react-bootstrap/Button";
import { FaShoppingCart } from "react-icons/fa";

export const AddButton = ({ onClick, isDisabled }) => (
  <Button variant="success" onClick={onClick} disabled={isDisabled}>
    <FaShoppingCart className="button-icon" /> Add
  </Button>
);
