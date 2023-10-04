import React, { useEffect, useState } from "react";
import "bootstrap-daterangepicker/daterangepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../services";
import { isOrdersLoading$, orders$ } from "../../store";
import orderBy from "lodash/orderBy";
import { OrdersComponent } from "../../components/Orders";

const MOCK_ARRAY = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

export const OrdersContainer = () => {
  const dispatch = useDispatch();
  const orders = useSelector(orders$);
  const [filteredOrders, setFilteredOrders] = useState(orders);
  const isOrdersLoading = useSelector(isOrdersLoading$);

  useEffect(() => {
    if (orders?.length) setFilteredOrders(orderBy(orders, "orderAt", "desc"));
    else dispatch(fetchOrders());
  }, [dispatch, orders]);

  const handleCallback = (start, end) => {
    setFilteredOrders(
      orderBy(
        orders?.filter(
          (order) =>
            order.orderAt > new Date(start).toISOString() &&
            order.orderAt < new Date(end).toISOString()
        ),
        "orderAt",
        "desc"
      )
    );
  };

  const arrayToDisplay =
    filteredOrders?.length > 0 ? filteredOrders : MOCK_ARRAY;

  return (
    <OrdersComponent
      handleCallback={handleCallback}
      products={arrayToDisplay}
      isOrdersLoading={isOrdersLoading}
    />
  );
};
