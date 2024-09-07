import React from 'react';

export const OptionalWordView = ({ text = '', prefix = '' }) => {
  return <>{text !== '' ? prefix + '(' + text + ')' : ''}</>;
};
