import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
const Footer = () => {
  return (
    <FooterBlock>
      <Container fluid className='bg-primary text-white py-5'>
        <Container>
          <Row className='py-3' style={{ color: 'white' }}>
            <Col>
              <h5
                className='py-2 '
                style={{ fontFamily: "'Pacifico', cursive", fontWeight: 500 }}
              >
                Account
              </h5>
              <Link to='/profile'>
                <h6>Profile</h6>
              </Link>
              <Link to='/myOrderList'>
                <h6>Orders</h6>
              </Link>
              <Link to='/cart'>
                <h6>Cart</h6>
              </Link>
              <Link to='/'>
                <h6>Shipping</h6>
              </Link>
            </Col>
            <Col>
              <h5
                className='py-2 '
                style={{ fontFamily: "'Pacifico', cursive", fontWeight: 500 }}
              >
                Information
              </h5>
              <Link to='/about'>
                <h6>About</h6>
              </Link>
              <Link to='/contact'>
                <h6>Contact</h6>
              </Link>{' '}
              <Link to='/privacy'>
                <h6>Privacy Policy</h6>
              </Link>
              <Link to='/terms'>
                <h6>Terms & Condition</h6>
              </Link>
            </Col>
            <Col>
              <h5
                className='py-2 '
                style={{ fontFamily: "'Pacifico', cursive", fontWeight: 500 }}
              >
                AyaKaffee
              </h5>
              <h6>Richard wagner 97, Saar 66111</h6>
              <h6>(+49) 183 8011 7689</h6>
              <h6>(+49) 183 8011 7689</h6>

              <h6>hello@ayakaffee.de</h6>
            </Col>
          </Row>
          <Row>
            <Col className='text-center py-3'>
              Copyright {new Date().getUTCFullYear()} &copy; AyaKaffee Store
            </Col>
          </Row>
        </Container>
      </Container>{' '}
    </FooterBlock>
  );
};

const FooterBlock = styled.div`
  h5 {
    color: white !important;
  }
  a:hover {
    text-decoration: none;
  }
  h6 {
    color: #e6bfa2 !important;
    opacity: 0.6;
    &:hover {
      opacity: 1;
      text-decoration: none;
      color: #dfa274 !important;
    }
  }
`;
export default Footer;
