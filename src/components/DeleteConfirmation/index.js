import React from "react";
import { CustomModal } from "../common/Modal";
import { Button } from "react-bootstrap";
import {
  hideModal,
  itemToBeRemvoedFromCart$,
  setSuccessMessage,
  setItemToBeRemovedFromCart,
  setSelectedModal,
} from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, removeFromCart } from "../../services";

export const DeleteConfirmation = () => {
  const dispatch = useDispatch();
  const itemToBeRemvoedFromCart = useSelector(itemToBeRemvoedFromCart$);

  const handleReset = () => {
    dispatch(setItemToBeRemovedFromCart());
    dispatch(hideModal());
    dispatch(setSelectedModal());
  };

  const handleSubmit = () => {
    dispatch(removeFromCart(itemToBeRemvoedFromCart)).then(() => {
      dispatch(fetchCart());
      handleReset();
      dispatch(setSuccessMessage("Item removed from cart!"));
    });
  };

  return (
    <CustomModal onHide={handleReset} title="Remove Item from Cart">
      <>
        <h4>Are you sure to remove this item from cart</h4>
        <div className="custom-modal-button-group">
          <Button variant="success" onClick={handleSubmit}>
            Yes
          </Button>
          <Button variant="outline-success" onClick={handleReset}>
            Close
          </Button>
        </div>
      </>
    </CustomModal>
  );
};
