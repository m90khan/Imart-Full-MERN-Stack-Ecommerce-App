import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUserProfile } from '../redux/actions/userActions';
import { listMyOrders } from '../redux/actions/orderActions';
// import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';
import FormContainer from '../components/FormContainer';

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const {
    loading,
    error,
    user: { data },
  } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!data) {
        dispatch(getUserDetails('profile'));
      } else {
        setName(data.user.name);
        setEmail(data.user.email);
      }
    }
  }, [dispatch, history, userInfo, data]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      setMessage('Passwords do not match');
    } else {
      dispatch(updateUserProfile({ id: data.user._id, name, email, password }));
    }
  };

  return (
    <FormContainer>
      <Row className='py-5'>
        <Col>
          <h1 className='py-2'>
            <strong>User Profile</strong>
          </h1>
          {message && <Message variant='danger'>{message}</Message>}

          {error && <Message variant='danger'>{error}</Message>}
          {success && <Message variant='success'>Profile Updated</Message>}
          {loading && <Loader />}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='passwordConfirm'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter Confirm Password'
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button type='submit' variant='primary'>
              Update Profile
            </Button>
          </Form>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default ProfileScreen;
