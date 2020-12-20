import { Spinner } from 'react-bootstrap';

import React from 'react';

const Loader = () => {
  return (
    <div>
      <Spinner
        animation='border'
        // role='status'
        variant='secondary'
        style={{ width: '50px', height: '50px', margin: 'auto ', display: 'block' }}
      >
        <span className='sr-only'> Loading ...</span>
      </Spinner>
    </div>
  );
};

export default Loader;
