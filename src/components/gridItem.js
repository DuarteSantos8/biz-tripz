import React from 'react';
import { Link } from 'react-router-dom';
import './gridItem.css';

function GridItem({ id, title, image }) {
  return (
    <div className="grid-item">
      <img src={`/images/${image}`} alt={title} />
      <h3>{title}</h3>
      <div className="button-group">
        <Link to={`/trip/${id}`} className="button">Details</Link>
      </div>
    </div>
  );
}

export default GridItem;