import { isEmpty } from "lodash";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { ProductDetails } from "../../components/ProductDetails";
import {
  addToCart,
  fetchCart,
  fetchProducts,
  updateProductInCart,
  viewedProduct,
} from "../../services";
import {
  products$,
  productsInCart$,
  setSuccessMessage,
  user$,
} from "../../store";

export const ProductDetailsContainer = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const productsInCart = useSelector(productsInCart$);
  const products = useSelector(products$);
  const currentUser = useSelector(user$);
  const selectedProduct = products.find((item) => item.id === id);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddCart = () => {
    if (isEmpty(currentUser)) {
      history.push("/login");
    } else {
      const isProductAlreadyInCart = productsInCart?.some(
        (item) => item.name === selectedProduct?.name
      );

      if (isProductAlreadyInCart) {
        const data = {
          id: selectedProduct?.id,
          product: {
            ...selectedProduct,
            count: selectedProduct?.count + 1,
          },
        };
        dispatch(updateProductInCart(data)).then(() => dispatch(fetchCart()));
      } else {
        const updatedProduct = { ...selectedProduct, count: 1 };
        const productDetails = {
          createdAt: selectedProduct?.createdAt,
          name: selectedProduct?.name,
          avatar: selectedProduct?.avatar,
          description: selectedProduct?.description,
          price: selectedProduct?.price,
          rating: selectedProduct?.rating,
          category: selectedProduct?.category,
        };
        dispatch(viewedProduct(productDetails));
        dispatch(addToCart(updatedProduct)).then(() => {
          dispatch(fetchCart());
        });
      }

      dispatch(setSuccessMessage("Item added to cart!"));
    }
  };

  const handleBuy = () => {
    if (isEmpty(currentUser)) {
      history.push("/login");
    }
  };

  return (
    <ProductDetails
      selectedProduct={selectedProduct}
      handleAddCart={handleAddCart}
      handleBuy={handleBuy}
    />
  );
};
