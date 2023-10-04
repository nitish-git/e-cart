import React, { useEffect, useMemo, useState } from "react";
import {
  NavDropdown,
  Navbar,
  Form,
  Nav,
  Button,
  Badge,
  Image,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FaHeart, FaShoppingCart, FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  isUserLoading$,
  paginationFilters$,
  productsInCart$,
  setFilters,
  setPaginationFilters,
  setSearchItem,
  user$,
} from "../../store";
import {
  fetchAllUsers,
  fetchCart,
  fetchProducts,
  fetchSales,
  updateUser,
} from "../../services";
import { UserThumbnail } from "../common/UserThumbnail";
import { useHistory, useLocation } from "react-router";
import Skeleton from "react-loading-skeleton";
import { Images } from "../../resources";
import classNames from "classnames";

const emptyString = "";

const NavBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { pathname } = useLocation();
  const productsInCart = useSelector(productsInCart$);
  const paginationFilters = useSelector(paginationFilters$);
  const isUserLoading = useSelector(isUserLoading$);
  const currentUser = useSelector(user$);
  const [itemToBeSearch, setItemToBeSearch] = useState(emptyString);
  const [prevSearchItem, setPrevSearchItem] = useState(emptyString);

  const isLoginOrRegisterScreen =
    pathname === "/login" || pathname === "/register";

  useEffect(() => {
    dispatch(fetchAllUsers());
    dispatch(fetchSales());
    dispatch(fetchCart());
  }, [dispatch]);

  const handleReset = () => {
    setItemToBeSearch(emptyString);
    dispatch(setPaginationFilters());
    dispatch(setFilters());
    dispatch(setSearchItem());
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleFetchProducts();
    }
  };

  const handleFetchProducts = () => {
    if (itemToBeSearch.trim() !== prevSearchItem) {
      setPrevSearchItem(itemToBeSearch.trim());

      const filter = {
        ...paginationFilters,
        page: 1,
        name: itemToBeSearch.trim(),
        category: "",
      };

      dispatch(setPaginationFilters(filter));
      dispatch(fetchProducts(filter));
    }
  };

  const handleLogout = () => {
    dispatch(
      updateUser({
        id: currentUser?.id,
        user: { ...currentUser, isAuthenticated: false },
      })
    ).then(() => {
      localStorage.setItem("isAuthenticated", false);
      localStorage.setItem("isLoggedOut", true);
      dispatch(fetchAllUsers());
      history.push("/logout");
    });
  };

  const shouldShowSearchBar = useMemo(
    () => currentUser?.isAuthenticated || !isLoginOrRegisterScreen,
    [currentUser, isLoginOrRegisterScreen]
  );

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className={classNames("mb-1 custom-navbar", {
        "bg-purple": !isLoginOrRegisterScreen,
      })}
      variant="dark"
      fixed="top"
    >
      <LinkContainer to="/" onClick={handleReset}>
        <Navbar.Brand
          className={classNames("brand-container", {
            "text-dark-theme bold-text": isLoginOrRegisterScreen,
          })}
        >
          <Image src={Images.logo} alt="logo" className="logo" /> E-Cart
        </Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        {shouldShowSearchBar ? (
          <Form className="d-flex">
            <div className="nav-search-container">
              <Form.Control
                type="search"
                placeholder="Search"
                className="search-input-field"
                onChange={(e) => setItemToBeSearch(e.target.value)}
                onKeyDown={handleKeyDown}
                value={itemToBeSearch}
              />
              <Button
                variant="light"
                id="search-button"
                className="search-button"
                onClick={handleFetchProducts}
              >
                <FaSearch />
              </Button>
            </div>
          </Form>
        ) : (
          <div />
        )}
        {isUserLoading ? (
          <Skeleton height={50} />
        ) : currentUser?.isAuthenticated ? (
          <Nav className="d-flex justify-content-center align-items-center ml-auto">
            <NavDropdown
              title={<UserThumbnail user={{ name: "Arpit Kumar" }} />}
              id="nav-dropdown"
            >
              <LinkContainer to="/orders">
                <NavDropdown.Item>Orders</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/analysis">
                <NavDropdown.Item>Analytics Report</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/profile">
                <NavDropdown.Item>Profile</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/logout">
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
            <LinkContainer to="/favorite">
              <Nav.Link>
                <FaHeart color="#FF281B" />
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/cart">
              <Nav.Link>
                <FaShoppingCart color="#f2ecf8" />
                <Badge pill className="cart-count" bg="light">
                  {productsInCart?.length}
                </Badge>
              </Nav.Link>
            </LinkContainer>
          </Nav>
        ) : (
          !isLoginOrRegisterScreen && (
            <Button
              variant="light"
              className="ml-auto login-button"
              onClick={() => history.push("/login")}
            >
              Login / Signup
            </Button>
          )
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
