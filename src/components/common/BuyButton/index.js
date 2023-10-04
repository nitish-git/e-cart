import React from "react";
import Button from "react-bootstrap/Button";
import { FaShoppingBag } from "react-icons/fa";

export const BuyButton = ({ onClick }) => (
  <Button
    variant="primary"
    className="bg-orange text-white border-0"
    onClick={onClick}
  >
    <FaShoppingBag className="button-icon" /> Buy
  </Button>
);
