import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './gridItem.css';

function GridItem({ id, title, image, description, date }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [isBooked, setIsBooked] = useState(false);

  useEffect(() => {
    const checkIfBooked = async () => {
      if (user) {
        try {
          const response = await axios.get(`http://localhost:3001/userTrips`, {
            params: {
              userId: user.id,
              tripId: id
            }
          });
          setIsBooked(response.data.length > 0);
        } catch (error) {
          console.error('Error checking if trip is booked:', error);
        }
      }
    };

    checkIfBooked();
  }, [user, id]);

  const handleSignUp = async () => {
    if (!user) {
      alert('Please log in to sign up for a trip');
      navigate('/login');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/userTrips', {
        userId: user.id,
        tripId: id
      });
      if (response.data) {
        alert('Successfully signed up for the trip!');
        setIsBooked(true);
      }
    } catch (error) {
      console.error('Error signing up for trip:', error);
      alert('An error occurred while signing up for the trip');
    }
  };

  return (
    <div className="grid-item">
      <img src={`images/${image}`} alt={title} />
      <h3>{title}</h3>
      <p>{description}</p>
      <p>Date: {date}</p>
      <div className="button-group">
        <Link to={`/trip/${id}`} className="button">Details</Link>
        {user && !isBooked && <button onClick={handleSignUp} className="button">Sign Up</button>}
        {user && isBooked && <span className="booked-message">Booked</span>}
      </div>
    </div>
  );
}

export default GridItem;
