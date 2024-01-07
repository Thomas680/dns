
import React from 'react';
import '../style/fixedList.css';

const FixedList = ({ options }) => {
  return (
    <div className="fixed-list">
      <ul>
        {options.map((option, index) => (
          <li key={index}>{option}</li>
        ))}
      </ul>
    </div>
  );
};

export default FixedList;
