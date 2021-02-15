import React, { useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { listProducts } from '../redux/actions/productActions';
import Product from '../components/Product';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Newsletter from '../components/Newsletter';

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;
  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta />
      {!keyword ? (
        <Container className='pt-4'>
          <ProductCarousel />
        </Container>
      ) : (
        <Container className='py-4'>
          <Link to='/' className='btn btn-dark'>
            Go Back
          </Link>
        </Container>
      )}
      <Container className='pt-4'>
        <h3 className='mt-4'>Products</h3>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <>
            <Row>
              {products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={4}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
            <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
          </>
        )}
      </Container>
      <Newsletter />
    </>
  );
};
export default HomeScreen;
