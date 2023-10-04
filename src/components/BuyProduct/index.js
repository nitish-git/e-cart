import React, { useState } from "react";
import { Button, ButtonGroup, Col, Image, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, placeOrder } from "../../services";
import {
  hideModal,
  productToBePurchase$,
  setSuccessMessage,
  setProductToBePurchase,
  setSelectedModal,
  isPlacingOrder$,
} from "../../store";
import { CustomModal } from "../common/Modal";
import "./buyProduct.css";

export const BuyProduct = () => {
  const dispatch = useDispatch();
  const productToBePurchase = useSelector(productToBePurchase$);
  const isPlacingOrder = useSelector(isPlacingOrder$);
  const [productCount, setProductCount] = useState(1);

  const handleReset = () => {
    dispatch(hideModal());
    dispatch(setSelectedModal());
    dispatch(setProductToBePurchase());
  };

  const handleIncrement = () =>
    setProductCount((prev) => (prev === 5 ? prev : prev + 1));

  const handleDecrement = () =>
    setProductCount((prev) => (prev === 1 ? prev : prev - 1));

  const handleSubmit = () => {
    const order = {
      orderName: `Order`,
      orderItems: [{ ...productToBePurchase, quantity: productCount }],
      totalAmount: productCount * productToBePurchase?.price,
      orderAt: new Date().toISOString(),
    };

    dispatch(placeOrder(order)).then(() => {
      handleReset();
      dispatch(setSuccessMessage("Order placed"));
      dispatch(fetchOrders());
    });
  };

  return (
    <CustomModal onHide={handleReset} title="Buy Product" size="lg">
      <Row className="d-flex justify-content-around">
        <Col sm={12} md={4} className="buy-product-column">
          <Image
            src={productToBePurchase?.avatar}
            alt={productToBePurchase?.name}
            className="purchase-product-image"
          />
        </Col>
        <Col sm={12} md={6} className="buy-product-column">
          <div>
            <h5 className="info info-heading m-0">
              {productToBePurchase?.name}
            </h5>
            <p className="info">{productToBePurchase?.description}</p>
          </div>
          <div className="d-flex justify-content-between align-items-center mt-20">
            <ButtonGroup className="custom-button-group">
              <Button
                variant="light"
                className="product-counter"
                onClick={handleDecrement}
              >
                -
              </Button>
              <Button
                variant="light"
                className="product-counter product-counter-text"
              >
                {productCount}
              </Button>
              <Button
                variant="light"
                className="product-counter"
                onClick={handleIncrement}
              >
                +
              </Button>
            </ButtonGroup>
            <p className="info price">$ {productToBePurchase?.price}</p>
          </div>
          <div className="d-flex justify-content-between align-items-center mt-40">
            <h6 className="info-heading">Total Price :</h6>
            <p className="info price">
              $ {productToBePurchase?.price * productCount}
            </p>
          </div>
        </Col>
      </Row>
      <div className="place-order-button-group">
        <Button
          variant="outline-success"
          className="cancel-purchase-btn"
          onClick={handleReset}
        >
          Cancel
        </Button>
        <Button
          variant="success"
          className="buy-product-btn"
          onClick={handleSubmit}
        >
          {isPlacingOrder ? (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          ) : (
            "Place Order"
          )}
        </Button>
      </div>
    </CustomModal>
  );
};
