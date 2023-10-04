import React, { Fragment } from "react";
import { Row, Col, Button, Card, Image, ButtonGroup } from "react-bootstrap";
import { MdDeleteForever } from "react-icons/md";
import { setSelectedModal } from "../../store";
import Skeleton from "react-loading-skeleton";
import { MODALS } from "../../constants";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useDispatch } from "react-redux";

export const CartComponent = ({
  isCartLoading,
  productsInCart,
  handleDecrement,
  handleIncrement,
  handleMarkAndRemoveFavorite,
  handleRemoveFromCart,
  getTotalAmount,
}) => {
  const dispatch = useDispatch();

  const RenderProductDetails = () =>
    productsInCart.map((item, i) => (
      <Fragment key={item.id}>
        <Row className="mb-3" key={item.id}>
          <Col>
            <Image src={item.avatar} alt={item.name} className="cart-image" />
          </Col>
          <Col className="d-flex justify-content-between flex-column">
            <div>
              <h5 className="info info-heading m-0">{item.name}</h5>
              <p className="info cart-ellipsis">{item.description}</p>
            </div>
            <div className="cart-buttons">
              <Button
                variant="light"
                className="delete-product-icon"
                onClickCapture={() => handleRemoveFromCart(item.id)}
              >
                <MdDeleteForever />
              </Button>
              <div className="ml-10">
                {item?.isFav ? (
                  <FaHeart
                    className="fav-icon"
                    onClick={() =>
                      handleMarkAndRemoveFavorite({
                        ...item,
                        isFav: false,
                      })
                    }
                  />
                ) : (
                  <FaRegHeart
                    className="fav-icon"
                    onClick={() =>
                      handleMarkAndRemoveFavorite({
                        ...item,
                        isFav: true,
                      })
                    }
                  />
                )}
              </div>
            </div>
          </Col>
          <Col xm={12} md={4} lg={3} className="custom-column">
            <ButtonGroup className="custom-button-group">
              <Button
                variant="light"
                className="product-counter"
                onClick={() => handleDecrement(item)}
              >
                -
              </Button>
              <Button
                variant="light"
                className="product-counter product-counter-text"
              >
                {item.count}
              </Button>
              <Button
                variant="light"
                className="product-counter"
                onClick={() => handleIncrement(item)}
              >
                +
              </Button>
            </ButtonGroup>
            <p className="info">$ {item.price}</p>
          </Col>
        </Row>
        {productsInCart?.length - 1 !== i && <hr />}
      </Fragment>
    ));

  const RenderPriceDetails = () => (
    <div className="d-flex flex-column">
      {productsInCart.map((item) => (
        <Fragment key={item.id}>
          <Row key={item.id}>
            <Col
              sm={12}
              md={7}
              className="d-flex justify-content-between align-items-center w-100"
            >
              <p>
                {item.name} x {item.count}
              </p>
              <p>$: {item.count * item.price}</p>
            </Col>
          </Row>
          <hr />
        </Fragment>
      ))}
      <div className="d-flex justify-content-between align-items-center">
        <p className="pt-0">Total Amount</p>
        <p className="pt-0">$: {getTotalAmount()}</p>
      </div>
      <Button
        className="order-button border-0 mt-10"
        variant="primary"
        onClick={() => dispatch(setSelectedModal(MODALS.PLACE_ORDER))}
      >
        Place Order
      </Button>
    </div>
  );

  return (
    <div className="mh-5 centered-cart">
      <Row className="justify-content-center w-100">
        <Col sm={12} md={6} className="mb-2">
          {isCartLoading ? (
            <Skeleton height={468} />
          ) : (
            <Card className="custom-cart-card">
              <Card.Body className="cart-card-body">
                <p>My Cart ({productsInCart?.length})</p>
                <hr />
                {productsInCart?.length > 0 ? (
                  <RenderProductDetails />
                ) : (
                  <p>Please add Item to Cart</p>
                )}
              </Card.Body>
            </Card>
          )}
        </Col>
        <Col sm={12} md={4} className="mb-2">
          {isCartLoading ? (
            <Skeleton height={400} />
          ) : (
            <Card className="custom-cart-card">
              <Card.Body className="price-card-body">
                <p>Price Detail</p>
                <hr />
                {productsInCart?.length > 0 ? (
                  <RenderPriceDetails />
                ) : (
                  <Row>
                    <Col sm={12} md={7}>
                      <p>Total Amount</p>
                    </Col>
                    <Col sm={12} md={5}>
                      <p>$:0</p>
                    </Col>
                  </Row>
                )}
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </div>
  );
};
