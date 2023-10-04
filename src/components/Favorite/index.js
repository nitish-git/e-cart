import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { CardComponent } from "../Cards";
import Skeleton from "react-loading-skeleton";
import "./favorite.css";

export const FavoriteComponent = ({ isProductLoading, products }) => {
  const RenderSkeleton = () => (
    <Card className="skeleton-custom-card" key="s1">
      <Skeleton height="300px" />
      <Card.Body className="d-flex flex-column justify-content-between">
        <Skeleton height={38} />
        <Skeleton height={38} />
        <Skeleton height={38} />
      </Card.Body>
    </Card>
  );

  return products.length === 0 ? (
    <div className="empty-wishlist">
      <h3>Your Wishlist is currently empty</h3>
      <p>Please add some products in your wishlist</p>
    </div>
  ) : (
    <div className="mh-5">
      <h4 className="fav-heading">My Wishlist</h4>
      <Row className="centered-wishlist">
        {products.map((product) => (
          <Col sm={12} md={4} lg={3} key={product.id || product}>
            {isProductLoading ? (
              <RenderSkeleton />
            ) : (
              <CardComponent product={product} />
            )}
          </Col>
        ))}
      </Row>
    </div>
  );
};
