import React from 'react';
import './GoodBadCounter.css';
import PropTypes from 'prop-types';

const GoodBadCounter = ({ good = 0, bad = 0, max = 0, separator = '/' }) => {
  return (
    <div className="counter">
      <span className="counter-good">{good}</span> {separator}
      <span className="counter-bad">{bad}</span> {separator}
      <span className="counter-max">{max}</span>
    </div>
  );
};

GoodBadCounter.propTypes = {
  good: PropTypes.number,
  bad: PropTypes.number,
  max: PropTypes.number,
  separator: PropTypes.string,
};

export default GoodBadCounter;
