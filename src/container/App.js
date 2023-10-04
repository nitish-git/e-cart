import React from "react";
import NavBar from "../components/Navbar";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import { AnalysisContainer } from "./Analysis";
import { CartContainer } from "./Cart";
import { FavoriteContainer } from "./Favorite";
import { Dashboard } from "../components/Dashboard";
import { OrdersContainer } from "./Orders";
import { CustomToast } from "../components/Toast";
import { DeleteConfirmation } from "../components/DeleteConfirmation";
import { MODALS } from "../constants";
import { selectedModal$ } from "../store";
import { useSelector } from "react-redux";
import { PlaceOrder } from "../components/PlaceOrder";
import { ProductDetailsContainer } from "./ProductDetails";
import { LoginScreen } from "../components/Login";
import { RegisterScreen } from "../components/Register";
import { UserProfileContainer } from "./UserProfile";
import { BuyProduct } from "../components/BuyProduct";
import { Footer } from "../components/Footer";
import { LogoutScreen } from "../components/Logout";

function App() {
  const selectedModal = useSelector(selectedModal$);

  return (
    <BrowserRouter>
      <CustomToast />
      {selectedModal === MODALS.DELETE_CONFIRMATION && <DeleteConfirmation />}
      {selectedModal === MODALS.PLACE_ORDER && <PlaceOrder />}
      {selectedModal === MODALS.BUY_PRODUCT && <BuyProduct />}
      <NavBar />
      <div className="custom-container">
        <Switch>
          <Route exact path="/">
            <Dashboard />
          </Route>
          <PageRoute path="/cart">
            <CartContainer />
          </PageRoute>
          <PageRoute path="/orders">
            <OrdersContainer />
          </PageRoute>
          <PageRoute path="/favorite">
            <FavoriteContainer />
          </PageRoute>
          <PageRoute path="/analysis">
            <AnalysisContainer />
          </PageRoute>
          <Route path="/products/:id">
            <ProductDetailsContainer />
          </Route>
          <PageRoute path="/login">
            <LoginScreen />
          </PageRoute>
          <PageRoute path="/logout">
            <LogoutScreen />
          </PageRoute>
          <PageRoute path="/register">
            <RegisterScreen />
          </PageRoute>
          <PageRoute path="/profile">
            <UserProfileContainer />
          </PageRoute>
        </Switch>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

const PageRoute = ({ path, children }) => {
  const isRedirectingToLoginOrRegister =
    path === "/login" || path === "/register";
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  const isLoggedOut = localStorage.getItem("isLoggedOut");

  if (isAuthenticated === "true") {
    if (isRedirectingToLoginOrRegister || path === "/logout")
      return <Redirect to="/" />;
    return <Route path={path}>{children}</Route>;
  } else {
    if (path !== "/" && path !== "/products/:id") {
      if (isRedirectingToLoginOrRegister) {
        return (
          <Route path={path}>
            {path === "/register" && <RegisterScreen />}
            {path === "/login" && <LoginScreen />}
          </Route>
        );
      } else if (path === "/logout" && isLoggedOut === "true") {
        return (
          <Route path={path}>{path === "/logout" && <LogoutScreen />}</Route>
        );
      } else {
        return (
          <Redirect to="/login">
            <LoginScreen />
          </Redirect>
        );
      }
    } else {
      return <Route path={path}>{children}</Route>;
    }
  }
};

export default App;
