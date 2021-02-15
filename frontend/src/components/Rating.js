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
              value && value >= val
                ? 'fas fa-star'
                : value && value >= val - 0.5
                ? 'fas fa-star-half-alt'
                : 'far fa-star'
            }
          ></i>
        </span>
      ))}

      {text && <span> ({text})</span>}
    </div>
  );
};

Rating.defaultProps = {
  color: '#7a4a25',
};
// proptypes to specify type of each prop
Rating.propTypes = {
  value: PropTypes.number,
  text: PropTypes.number,
  color: PropTypes.string,
};

export default Rating;
