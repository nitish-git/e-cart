import React, { useEffect, useMemo, useState } from "react";
import { Row, Col, Image, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  setPaginationFilters,
  products$,
  isProductLoading$,
  paginationFilters$,
  productsForPagination$,
  isSalesLoading$,
} from "../../store";
import classnames from "classnames";
import { Carousal } from "../Carousal";
import { CardComponent } from "../Cards";
import { fetchProducts, fetchProductsForPagination } from "../../services";
import { CustomDropdown } from "../Dropdown";
import { Images } from "../../resources";
import Skeleton from "react-loading-skeleton";

const MOCK_ARRAY = [1, 2, 3, 4, 5, 6, 7, 8];
const emptyString = "";

const MOCK_FILTERS = [
  { label: "Women's Clothing", value: "female_clothing" },
  { label: "Men's Clothing", value: "men's clothing" },
  { label: "Jewelery", value: "jewelery" },
  { label: "Electronics", value: "electronics" },
];

export const Dashboard = () => {
  const dispatch = useDispatch();
  const products = useSelector(products$);
  const totalProducts = useSelector(productsForPagination$);
  const paginationFilters = useSelector(paginationFilters$);
  const isProductLoading = useSelector(isProductLoading$);
  const isSalesLoading = useSelector(isSalesLoading$);
  const [productsToBeDisplayed, setProductsToBeDisplayed] = useState(products);

  const selectedCategory = useMemo(() => {
    return (
      MOCK_FILTERS.find((e) => e.value === paginationFilters?.category) || null
    );
  }, [paginationFilters]);

  useEffect(() => {
    dispatch(
      fetchProductsForPagination({
        name: paginationFilters?.name,
        category: paginationFilters?.category,
      })
    );
    dispatch(fetchProducts(paginationFilters));
  }, [dispatch, paginationFilters]);

  const pageCounts = useMemo(() => {
    const maxPages = Math.ceil(totalProducts?.length / 8);
    return Array.from({ length: maxPages }, (_, i) => i + 1);
  }, [totalProducts]);

  const totalPages = Math.ceil(
    totalProducts?.length / paginationFilters?.limit
  );

  useEffect(() => {
    products && setProductsToBeDisplayed(products);
  }, [products]);

  const RenderColumns = () => {
    return productsToBeDisplayed?.length > 0 ? (
      productsToBeDisplayed.map((product) => (
        <Col sm={12} md={4} lg={3} key={product.id}>
          <CardComponent product={product} />
        </Col>
      ))
    ) : (
      <div className="no-found-image">
        <Image src={Images.noResult} alt="No Result Found" />
      </div>
    );
  };

  const RenderCardSkeleton = () => {
    return MOCK_ARRAY.map((e) => (
      <Col sm={12} md={4} lg={3} key={e}>
        <Card className="skeleton-custom-card" key="s1">
          <Skeleton height="300px" />
          <Card.Body className="d-flex flex-column justify-content-between">
            <Skeleton height={38} />
            <Skeleton height={38} />
            <Skeleton height={38} />
          </Card.Body>
        </Card>
      </Col>
    ));
  };

  const handleFetchProducts = (filter) => {
    dispatch(setPaginationFilters(filter));
    dispatch(fetchProducts(filter));
  };

  const handlePrev = () => {
    const filter = {
      ...paginationFilters,
      page: paginationFilters?.page > 1 ? paginationFilters?.page - 1 : 1,
    };

    handleFetchProducts(filter);
  };

  const handleNext = () => {
    const filter = {
      ...paginationFilters,
      page:
        paginationFilters?.page < totalPages ? paginationFilters?.page + 1 : 1,
    };

    handleFetchProducts(filter);
  };

  const handlePageClick = (page) => {
    const filter = {
      ...paginationFilters,
      page,
    };

    handleFetchProducts(filter);
  };

  return (
    <div className="mh-5">
      {isSalesLoading ? (
        <>
          <Skeleton height={320} className="mb-20" />
          <Skeleton height={38} />
        </>
      ) : (
        <>
          <Carousal />
          <CustomDropdown
            options={MOCK_FILTERS}
            placeholder="Filter By Category"
            value={selectedCategory}
            onChange={(selectedOption) =>
              handleFetchProducts({
                ...paginationFilters,
                page: 1,
                name: "",
                category: selectedOption?.value || emptyString,
              })
            }
          />
        </>
      )}
      <div className="m-2">
        <Row>
          {isProductLoading ? <RenderCardSkeleton /> : <RenderColumns />}
        </Row>
      </div>
      {productsToBeDisplayed?.length > 0 && (
        <div className="pagination-container">
          <div className="pagination-item-wrapper">
            <Button
              variant="light"
              className="pagination-item-arrow"
              onClick={handlePrev}
              disabled={paginationFilters?.page === 1}
            >
              &larr;
            </Button>
            {pageCounts.map((e) => (
              <div
                key={e}
                className={classnames("pagination-item", {
                  "pagination-item-active": e === paginationFilters?.page,
                })}
                onClick={() => handlePageClick(e)}
              >
                {e}
              </div>
            ))}
            <Button
              variant="light"
              className="pagination-item-arrow"
              onClick={handleNext}
              disabled={paginationFilters?.page === totalPages}
            >
              &rarr;
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
