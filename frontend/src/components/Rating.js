import React from 'react';
import PropTypes from 'prop-types';

const Rating = (props) => {
  const { value, text, color } = props;
  return (
    <div className='rating'>
      {[1, 2, 3, 4, 5].map((val) => (
        <span key={val}>
          <i
            style={{ color: color }}
            className={
              value >= val
                ? 'fas fa-star'
                : value >= val - 0.5
                ? 'fas fa-star-half-alt'
                : 'far fa-star'
            }
          ></i>
        </span>
      ))}

      <span> ({text ? text : ''})</span>
    </div>
  );
};

Rating.defaultProps = {
  color: '#ffce67',
};
// proptypes to specify type of each prop
Rating.propTypes = {
  value: PropTypes.number.isRequired,
  text: PropTypes.number.isRequired,
  color: PropTypes.string,
};

export default Rating;
