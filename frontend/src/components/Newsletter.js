import React, { useState } from 'react';
import { Button, Container, Form, Jumbotron } from 'react-bootstrap';
import SearchBox from './SearchBox';
import sub from './../assets/sub.jpg';
import { First } from 'react-bootstrap/esm/PageItem';
const Newsletter = () => {
  const [confirmSubmit, setConfirmSubmit] = useState('');
  const submitHandler = () => {
    setConfirmSubmit('form Submitted');
  };
  return (
    <Container>
      <Jumbotron
        className='text-center my-5'
        style={{
          width: '100%',
          height: '50vh',
          background: `url(${sub}) transparent`,
          backgroundSize: 'cover',
          filter: 'blur(.1px)',
          backgroundPosition: 'center center',
        }}
      >
        <h1 className='text-white' style={{ textShadow: '1px 1px' }}>
          Join Our Newsletter
        </h1>
        <Form onSubmit={submitHandler} inline style={{ justifyContent: 'center' }}>
          <Form.Control
            type='email'
            required
            name='q'
            placeholder='Enter Email ...'
            className='mr-sm-2 '
          ></Form.Control>
          <Button type='submit' className='btn-primary '>
            Subscribe
          </Button>
        </Form>
        <p>{confirmSubmit}</p>
      </Jumbotron>
    </Container>
  );
};

export default Newsletter;
