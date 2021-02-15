import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const TermScreen = () => {
  return (
    <Container>
      <Row className='justify-content-center py-4'>
        <Col md={8}>
          <h1 style={{ display: 'inline-block' }}>Terms and Conditions</h1>
          <p>
            Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie
            consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et
            accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit
            augue duis dolore te feugait nulla facilisi. Nam liber tempor cum soluta nobis
            eleifend option congue nihil imperdiet doming id quod mazim placerat facer
            possim assum. Typi non habent claritatem insitam est usus legentis in iis qui
            facit eorum claritatem.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy
            nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi
            enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis
            nisl ut aliquip ex ea commodo consequat.
          </p>
          <ul>
            <li>- Typi non habent claritatem insitam</li>
            <li>- Est usus legentis in iis qui facit eorum claritatem.</li>
            <li>
              - Investigationes demonstraverunt lectores legere me lius quod ii legunt
              saepius.
            </li>
            <li>
              - Claritas est etiam processus dynamicus, qui sequitur mutationem
              consuetudium lectorum.
            </li>
          </ul>
          <p>
            Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie
            consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et
            accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit
            augue duis dolore te feugait nulla facilisi. Nam liber tempor cum soluta nobis
            eleifend option congue nihil imperdiet doming id quod mazim placerat facer
            possim assum. Typi non habent claritatem insitam est usus legentis in iis qui
            facit eorum claritatem.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default TermScreen;
