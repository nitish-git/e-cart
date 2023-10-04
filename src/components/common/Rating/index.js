import React from "react";
import Rating from "react-rating";
import Image from "react-bootstrap/Image";
import { Images } from "../../../resources";

export const CustomRating = ({ rating, readonly, classes = "" }) => {
  return (
    <Rating
      stop={5}
      fractions={2}
      initialRating={rating}
      emptySymbol={
        <Image src={Images.starLight} alt="star-light" className="star" />
      }
      fullSymbol={
        <Image src={Images.starFill} alt="star-fill" className="star" />
      }
      readonly={readonly}
      className={classes}
    />
  );
};
