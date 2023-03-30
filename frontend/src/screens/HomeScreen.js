import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { listProducts } from "../actions/productActions";
import Message from "../components/message";
import Loader from "../components/loader";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/meta";
import { Link } from "react-router-dom";

const HomeScreen = ({ match }) => {
  const dispatch = useDispatch();

  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber;

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pages, page } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light">
          GO BACK
        </Link>
      )}
      <Row>
        <Col className="d-flex justify-content-center align-items-center">
          {!keyword ? (
            <h1 className="LatestProd">Latest Products</h1>
          ) : (
            <h1>Search Results</h1>
          )}
        </Col>
      </Row>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((items) => (
              <Col key={items._id} sm={12} md={6} lg={4}>
                <Product product={items} />
              </Col>
            ))}
          </Row>
          <Row style={{ backgroundColor: "antiquewhite" }}>
            <Col className="d-flex justify-content-center align-items-center mt-3">
              <Paginate
                pages={pages}
                page={page}
                keyword={keyword ? keyword : ""}
              />
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;
