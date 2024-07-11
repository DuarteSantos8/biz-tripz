import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './myTrips.css';

function MyTrips() {
  const [myTrips, setMyTrips] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    fetchMyTrips();
  }, [userId]);

  const fetchMyTrips = async () => {
    try {
      const [tripsResponse, userTripsResponse] = await Promise.all([
        axios.get('http://localhost:3001/trips'),
        axios.get('http://localhost:3001/userTrips')
      ]);
      const userBookings = userTripsResponse.data.filter(booking => booking.userId === userId);
      const myTripDetails = userBookings.map(booking => {
        const tripDetails = tripsResponse.data.find(trip => trip.id === booking.tripId);
        return { ...tripDetails, bookingId: booking.id };
      });
      setMyTrips(myTripDetails);
    } catch (error) {
      console.error('Error fetching my trips:', error);
      alert('Failed to fetch your trips. Please try again later.');
    }
  };

  const cancelTrip = async (bookingId, tripTitle) => {
    if (window.confirm(`Are you sure you want to cancel your trip to ${tripTitle}?`)) {
      try {
        await axios.delete(`http://localhost:3001/userTrips/${bookingId}`);
        fetchMyTrips(); // Refresh the list after cancellation
        alert(`Your trip to ${tripTitle} has been successfully cancelled.`);
      } catch (error) {
        console.error('Error cancelling trip:', error);
        alert('Failed to cancel the trip. Please try again.');
      }
    }
  };

  return (
    <div className="my-trips">
      <h1>My Trips</h1>
      <div className="trip-list">
        {myTrips.map(trip => (
          <div key={trip.id} className="trip-item">
            <img src={`/images/${trip.image}`} alt={trip.title} className="trip-image" />
            <div className="trip-details">
              <h2>{trip.title}</h2>
              <p>{trip.description}</p>
              <p>Date: {trip.date}</p>
              <button 
                onClick={() => cancelTrip(trip.bookingId, trip.title)} 
                className="delete-button"
              >
                Cancel Trip
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyTrips;