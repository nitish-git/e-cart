import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCart,
  fetchOrders,
  fetchProducts,
  fetchProductsForPagination,
  fetchSales,
  fetchViewedProducts,
} from "../../services";

const initialState = {
  products: [],
  cart: [],
  numberOfItems: {},
  alert: "",
  successMessage: "",
  sales: [],
  itemToBeSearch: "",
  orders: [],
  paginationFilters: {
    page: 1,
    limit: 8,
    category: "",
    name: "",
  },
  filters: [],
  viewedProducts: [],
  selectedModal: "",
  itemToBeRemvoedFromCart: "",
  productsForPagination: [],
  productToBePurchase: {},
};

export const DashboardSlice = createSlice({
  name: "Dashboard",
  initialState,
  reducers: {
    updateProducts(s, a) {
      s.products = a.payload || initialState.products;
    },
    setPaginationFilters(s, a) {
      s.paginationFilters = a.payload || initialState.paginationFilters;
    },
    setFilters(s, a) {
      s.filters = a.payload || initialState.filters;
    },
    setSearchItem(s, a) {
      s.itemToBeSearch = a.payload || initialState.itemToBeSearch;
    },
    setItemToBeRemovedFromCart(s, a) {
      s.itemToBeRemvoedFromCart =
        a.payload || initialState.itemToBeRemvoedFromCart;
    },
    setSelectedModal(s, a) {
      s.selectedModal = a.payload || initialState.selectedModal;
    },
    countOfItems(s, a) {
      s.numberOfItems = a.payload
        ? { ...s.numberOfItems, ...a.payload }
        : initialState.numberOfItems;
    },
    removeCountOfItems(s, a) {
      delete s.numberOfItems[a.payload];
    },
    setAlert(s, a) {
      s.alert = a.payload || initialState.alert;
    },
    setSuccessMessage(s, a) {
      s.successMessage = a.payload || initialState.successMessage;
    },
    setProductToBePurchase(s, a) {
      s.productToBePurchase = a.payload || initialState.productToBePurchase;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (s, a) => {
      s.products = a.payload;
    });
    builder.addCase(fetchSales.fulfilled, (s, a) => {
      s.sales = a.payload;
    });
    builder.addCase(fetchCart.fulfilled, (s, a) => {
      s.cart = a.payload;
    });
    builder.addCase(fetchOrders.fulfilled, (s, a) => {
      s.orders = a.payload;
    });
    builder.addCase(fetchViewedProducts.fulfilled, (s, a) => {
      s.viewedProducts = a.payload;
    });
    builder.addCase(fetchProductsForPagination.fulfilled, (s, a) => {
      s.productsForPagination = a.payload;
    });
  },
});

export const {
  setPaginationFilters,
  countOfItems,
  removeCountOfItems,
  setAlert,
  setSearchItem,
  setSelectedModal,
  setItemToBeRemovedFromCart,
  setFilters,
  updateProducts,
  setProductToBePurchase,
  setSuccessMessage,
} = DashboardSlice.actions;
