import React, { useEffect } from 'react';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../redux/actions/cartActions';

const CartScreen = (props) => {
  const { match, location, history } = props;
  const productId = match.params.id;
  //  take qty value  seperated by = sign =>  /cart/5fcc083aabf6c84e08761655?qty=2
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
    history.push('/cart');
  };

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping');
  };
  return (
    <Row className='py-4'>
      <Col md={8}>
        <h3 className='py-3'>Shopping Cart</h3>
        {cartItems.length === 0 ? (
          <Message variant='warning'>
            Your cart is empty |
            <Link to='/'>
              <strong> Go Back</strong>
            </Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map((item) => (
              <ListGroup.Item key={item.id}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.id}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as='select'
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(addToCart(item.id, Number(e.target.value)))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((val) => (
                        <option key={val + 1} value={val + 1}>
                          {val + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromCartHandler(item.id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card style={{ marginTop: '6rem' }}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h5>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
              </h5>
              <h4 className='color-pr'>
                {' '}
                $
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </h4>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                PROCEED TO CHECKOUT
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
