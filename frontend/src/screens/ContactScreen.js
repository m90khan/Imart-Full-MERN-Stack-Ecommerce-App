import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import Message from '../components/Message';

const ContactScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitText, setSubmitText] = useState(null);

  const submitHandler = (e) => {
    e.preventDefault();
    setSubmitText('Message Sent Successfully');
    const item = e.target.children[4];
    console.log(item);
  };

  return (
    <FormContainer>
      <Row className='justify-content-center'>
        <Col>
          <h1>Contact</h1>

          <Form onSubmit={submitHandler}>
            <Form.Group controlId='email'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter name'
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='text'>
              <Form.Label>Message</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Messages'
                value={message}
                as='textarea'
                required
                rows={5}
                onChange={(e) => setMessage(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button type='submit' variant='primary'>
              Send Message
            </Button>
            <Message
              variant={submitText ? 'success' : ''}
              className='contact-message mt-5'
            >
              {submitText && submitText}
            </Message>
            <Row className='pb-4'>
              <Col>
                <LinkContainer to='/contact' className='mr-5'>
                  <Link>
                    <i class='fab fa-facebook-square'></i> Facebook
                  </Link>
                </LinkContainer>
                <LinkContainer to='/contact' className='mr-5'>
                  <Link>
                    <i class='fab fa-instagram-square'></i> Instagram
                  </Link>
                </LinkContainer>
                <LinkContainer to='/contact' className='mr-5'>
                  <Link>
                    <i class='fab fa-twitter-square'></i> Twitter
                  </Link>
                </LinkContainer>
                <LinkContainer to='/contact' className='mr-5'>
                  <Link>
                    <i class='fab fa-pinterest-square'></i> Pinterest
                  </Link>
                </LinkContainer>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default ContactScreen;
