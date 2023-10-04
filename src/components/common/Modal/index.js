import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { showModal, showModal$ } from "../../../store";

export const CustomModal = ({ onHide, title, children, size }) => {
  const dispatch = useDispatch();
  const show = useSelector(showModal$);

  useEffect(() => {
    dispatch(showModal());
  }, [dispatch]);

  return (
    <Modal show={show} onHide={onHide} size={size} centered>
      <Modal.Header closeButton>
        <Modal.Title className="custom-modal-heading">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="custom-modal-content">{children}</Modal.Body>
    </Modal>
  );
};
