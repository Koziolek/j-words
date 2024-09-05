import React from 'react';
import './commons.css';
import PropTypes from 'prop-types';

const LabeledInputComponent = ({
  id,
  type,
  text,
  placeholder,
  value,
  action,
  reference = null,
  onEnter = null,
}) => {
  return (
    <div>
      <label className="commons-label" htmlFor={id}>
        {text}
      </label>
      <input
        className="form-input commons-input"
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={action}
        ref={reference}
        onKeyUp={(e) => (e.key === 'Enter' ? (onEnter ? onEnter(e) : null) : null)}
      />
    </div>
  );
};

LabeledInputComponent.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  action: PropTypes.func.isRequired,
  reference: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({ current: PropTypes.any })]),
  onEnter: PropTypes.func,
};

export default LabeledInputComponent;
