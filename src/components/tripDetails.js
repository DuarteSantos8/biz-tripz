import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './tripDetails.css';

function TripDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [trip, setTrip] = useState(null);
  const [isBooked, setIsBooked] = useState(false);

  useEffect(() => {
    const fetchTripDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/trips/${id}`);
        setTrip(response.data);
      } catch (error) {
        console.error('Error fetching trip details:', error);
      }
    };

    const checkIfBooked = async () => {
      if (user) {
        try {
          const response = await axios.get(`http://localhost:3001/userTrips?userId=${user.id}&tripId=${id}`);
          setIsBooked(response.data.length > 0);
        } catch (error) {
          console.error('Error checking if trip is booked:', error);
        }
      }
    };

    fetchTripDetails();
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

  if (!trip) {
    return <div>Loading...</div>;
  }

  return (
    <div className="trip-details">
      <img src={`/images/${trip.image}`} alt={trip.title} />
      <h2>{trip.title}</h2>
      <p>{trip.description}</p>
      <p>Date: {trip.date}</p>
      <div className="button-group">
        {user && !isBooked && <button onClick={handleSignUp} className="button">Sign Up</button>}
        {user && isBooked && <span className="booked-message">Booked</span>}
      </div>
    </div>
  );
}

export default TripDetails;
