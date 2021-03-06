import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
  Breadcrumb,
  Tabs,
  Tab,
  Container,
} from 'react-bootstrap';
import Rating from '../components/Rating';
import Message from '../components/Message';
import Loader from '../components/Loader';

import { listProductDetails, createProductReview } from '../redux/actions/productActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../redux/constants/productConstants';

const ProductScreen = ({ match, history }) => {
  // const [product, setProduct] = useState({});
  // useEffect(() => {
  //   const fetchProduct = async () => {
  //     try {
  //       const { data } = await axios.get(`/api/v1/products/${match.params.id}`);
  //       setProduct(data.data.product);
  //       console.log(data.data.product);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   fetchProduct();
  // }, [match]);
  const [qty, setQty] = useState(1);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    success: successProductReview,
    loading: loadingProductReview,
    error: errorProductReview,
  } = productReviewCreate;
  useEffect(() => {
    if (successProductReview) {
      setRating(0);
      setComment('');
    }
    if (!product._id || product._id !== match.params.id) {
      dispatch(listProductDetails(match.params.id));
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
  }, [dispatch, match, product._id, successProductReview]);

  const addtoCartHandler = () => {
    // redirect to cart
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    );
  };
  return (
    <>
      <Link className='btn btn-primary my-3' to='/'>
        Go back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            <Col md={5}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={4}>
              {/* flush removes border */}
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h4>{product.name}</h4>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating value={product.rating} text={product.numReviews} />
                </ListGroup.Item>
                <ListGroup.Item>
                  <h5>
                    Price: <span className='color-wh'>${product.price}</span>
                  </h5>
                </ListGroup.Item>
                <ListGroup.Item>
                  {/* <strong> Description: </strong> */}
                  {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>{' '}
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>{' '}
                      <Col>{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty:</Col>{' '}
                        <Col>
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map((val) => (
                              <option key={val + 1} value={val + 1}>
                                {val + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Button
                      className='btn-block font-weight-bold'
                      type='button'
                      disabled={product.countInStock === 0}
                      onClick={addtoCartHandler}
                    >
                      ADD TO CART
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>

          <Row>
            <Tabs
              defaultActiveKey='home'
              id='uncontrolled-tab-example'
              style={{ width: '100%', justifyContent: 'center' }}
              className='my-5'
            >
              <Tab eventKey='home' title='Description' className='py-3'>
                <p>
                  Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse
                  molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero
                  eros et accumsan et iusto odio dignissim qui blandit praesent luptatum
                  zzril delenit augue duis dolore te feugait nulla facilisi. Nam liber
                  tempor cum soluta nobis eleifend option congue nihil imperdiet doming id
                  quod mazim placerat facer possim assum. Typi non habent claritatem
                  insitam est usus legentis in iis qui facit eorum claritatem.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
                  nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
                  volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
                  ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
                </p>
                <ul>
                  <li>- Typi non habent claritatem insitam</li>
                  <li>- Est usus legentis in iis qui facit eorum claritatem.</li>
                  <li>
                    - Investigationes demonstraverunt lectores legere me lius quod ii
                    legunt saepius.
                  </li>
                  <li>
                    - Claritas est etiam processus dynamicus, qui sequitur mutationem
                    consuetudium lectorum.
                  </li>
                </ul>
              </Tab>
              <Tab eventKey='profile' title='Tags' className='py-3'>
                <p>Tags: Green, Herbal, Loose, Mate, Organic , Special</p>
              </Tab>
              <Tab
                eventKey='review'
                title='Reviews'
                className='py-3'
                style={{ width: '80vw' }}
              >
                <Container>
                  <Row>
                    <Col md={6}>
                      {product.reviews && product.reviews.length === 0 && (
                        <Message variant='warning'>No Reviews</Message>
                      )}
                      <ListGroup variant='flush' className='review-list'>
                        {product.reviews &&
                          product.reviews.map((review) => (
                            <ListGroup.Item key={review._id}>
                              <strong>{review.name}</strong>
                              <Rating value={review.rating} />
                              <p>{review.createdAt.substring(0, 10)}</p>
                              <p>{review.comment}</p>
                            </ListGroup.Item>
                          ))}
                      </ListGroup>
                    </Col>
                    <Col md={6}>
                      <ListGroup variant='flush'>
                        <ListGroup.Item>
                          <h4>Write a Customer Review</h4>
                          {successProductReview && (
                            <Message variant='success'>
                              Review submitted successfully
                            </Message>
                          )}
                          {loadingProductReview && <Loader />}
                          {errorProductReview && (
                            <Message variant='danger'>{errorProductReview}</Message>
                          )}
                          {userInfo ? (
                            <Form onSubmit={submitHandler}>
                              <Form.Group controlId='rating'>
                                <Form.Label>Rating</Form.Label>
                                <Form.Control
                                  as='select'
                                  value={rating}
                                  onChange={(e) => setRating(e.target.value)}
                                >
                                  <option value=''>Select...</option>
                                  <option value='1'>1 - Poor</option>
                                  <option value='2'>2 - Fair</option>
                                  <option value='3'>3 - Good</option>
                                  <option value='4'>4 - Very Good</option>
                                  <option value='5'>5 - Excellent</option>
                                </Form.Control>
                              </Form.Group>
                              <Form.Group controlId='comment'>
                                <Form.Label>Comment</Form.Label>
                                <Form.Control
                                  as='textarea'
                                  row='3'
                                  value={comment}
                                  onChange={(e) => setComment(e.target.value)}
                                ></Form.Control>
                              </Form.Group>
                              <Button
                                disabled={loadingProductReview}
                                type='submit'
                                variant='primary'
                              >
                                Submit
                              </Button>
                            </Form>
                          ) : (
                            <Message>
                              Please <Link to='/login'>sign in</Link> to write a review{' '}
                            </Message>
                          )}
                        </ListGroup.Item>
                      </ListGroup>
                    </Col>
                  </Row>{' '}
                </Container>
              </Tab>
            </Tabs>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
