import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
// import products from '../data/products';
import { listProducts } from '../redux/actions/productActions';
import Product from '../components/Product';

import Message from '../components/Message';
import Loader from '../components/Loader';

const HomeScreen = () => {
  // const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  useEffect(() => {
    // const fetchProducts = async () => {
    //   try {
    //     const { data } = await axios.get('/api/v1/products');
    //     setProducts(data.data.products.data);
    //    } catch (err) {
    //     console.log(err);
    //   }
    // };
    // fetchProducts();
    dispatch(listProducts());
  }, [dispatch]);
  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
