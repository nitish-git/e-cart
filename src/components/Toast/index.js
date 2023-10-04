import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  successMessage$,
  setSuccessMessage,
  alert$,
  setAlert,
} from "../../store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const CustomToast = () => {
  const dispatch = useDispatch();
  const successMessage = useSelector(successMessage$);
  const alert = useSelector(alert$);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      dispatch(setSuccessMessage());
    }

    if (alert) {
      toast.error(alert, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      dispatch(setAlert());
    }
  }, [dispatch, successMessage, alert]);

  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
};
