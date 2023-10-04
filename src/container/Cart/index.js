import React, { useEffect } from "react";
import {
  isCartLoading$,
  productsInCart$,
  setItemToBeRemovedFromCart,
  setSelectedModal,
  setSuccessMessage,
} from "../../store";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCart,
  fetchProducts,
  markAndRemoveFavorite,
  updateProductInCart,
} from "../../services";
import { MODALS } from "../../constants";
import { CartComponent } from "../../components/Cart";

export const CartContainer = () => {
  const dispatch = useDispatch();
  const productsInCart = useSelector(productsInCart$);
  const isCartLoading = useSelector(isCartLoading$);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const getTotalAmount = () =>
    productsInCart
      .reduce(
        (accumulator, current) => accumulator + current.price * current.count,
        0
      )
      .toFixed(2);

  const handleRemoveFromCart = (id) => {
    dispatch(setSelectedModal(MODALS.DELETE_CONFIRMATION));
    dispatch(setItemToBeRemovedFromCart(id));
  };

  const handleIncrement = (item) => {
    dispatch(
      updateProductInCart({
        id: item.id,
        product: {
          ...item,
          count: item?.count < 5 ? item?.count + 1 : item?.count,
        },
      })
    ).then(() => dispatch(fetchCart()));
  };

  const handleDecrement = (item) => {
    dispatch(
      updateProductInCart({
        id: item.id,
        product: {
          ...item,
          count: item?.count > 1 ? item?.count - 1 : item?.count,
        },
      })
    ).then(() => dispatch(fetchCart()));
  };

  const handleMarkAndRemoveFavorite = (product) => {
    const successMessage = product?.isFav
      ? "Item added to wishlist"
      : "Item removed from wishlist";

    dispatch(markAndRemoveFavorite({ id: product.id, product })).then(() =>
      dispatch(fetchProducts())
    );
    dispatch(
      updateProductInCart({
        id: product.id,
        product,
      })
    ).then(() => {
      dispatch(fetchCart());
      dispatch(setSuccessMessage(successMessage));
    });
  };

  return (
    <CartComponent
      isCartLoading={isCartLoading}
      handleDecrement={handleDecrement}
      handleIncrement={handleIncrement}
      handleMarkAndRemoveFavorite={handleMarkAndRemoveFavorite}
      handleRemoveFromCart={handleRemoveFromCart}
      productsInCart={productsInCart}
      getTotalAmount={getTotalAmount}
    />
  );
};
