import React from "react";
import { Carousel } from "react-bootstrap";
import { useSelector } from "react-redux";
import { sales$ } from "../../store";

export const Carousal = () => {
  const sales = useSelector(sales$);

  return (
    <Carousel className="carousal-height">
      {sales?.map((item) => (
        <Carousel.Item key={item.id}>
          <img
            className="d-block w-100 carousal-height"
            src={item.img}
            alt={item.name}
          />
          <Carousel.Caption>
            <h3>{item.desc}</h3>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};
