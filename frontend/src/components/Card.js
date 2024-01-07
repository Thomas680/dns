// Card.js
import React from 'react';
import '../style/card.css'; 

const Card = ({ title, description, imageUrl }) => {
  return (
    <div className="card">
      {imageUrl && <img src={imageUrl} alt={title} />}
      <div className="card-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Card;
