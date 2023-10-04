import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../services";
import { isProductLoading$, products$ } from "../../store";
import { FavoriteComponent } from "../../components/Favorite";

const MOCK_ARRAY = [1, 2, 3, 4, 5, 6, 7, 8];

export const FavoriteContainer = () => {
  const dispatch = useDispatch();
  const products = useSelector(products$);
  const isProductLoading = useSelector(isProductLoading$);

  const favoriteProducts = products?.filter((e) => e.isFav) || [];

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const arrayToDisplay = isProductLoading ? MOCK_ARRAY : favoriteProducts;

  return (
    <FavoriteComponent products={arrayToDisplay} isProductLoading={isProductLoading} />
  );
};
