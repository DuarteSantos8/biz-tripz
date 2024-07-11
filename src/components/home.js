import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './home.css'

function Home() {
  const [trips, setTrips] = useState([]);
  const [userTrips, setUserTrips] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [tripsResponse, userTripsResponse] = await Promise.all([
        axios.get('http://localhost:3001/trips'),
        axios.get('http://localhost:3001/userTrips')
      ]);
      setTrips(tripsResponse.data);
      setUserTrips(userTripsResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const isBooked = (tripId) => {
    return userTrips.some(userTrip => userTrip.userId === userId && userTrip.tripId === tripId);
  };

  const bookTrip = async (tripId) => {
    try {
      const response = await axios.post('http://localhost:3001/userTrips', {
        userId: userId,
        tripId: tripId
      });
      setUserTrips([...userTrips, response.data]);
    } catch (error) {
      console.error('Error booking trip:', error);
    }
  };

  return (
    <div className="home">
      <h1>Available Trips</h1>
      <div className="trip-list">
        {trips.map((trip) => (
          <div key={trip.id} className="trip-item">
            <img src={`/images/${trip.image}`} alt={trip.title} className="trip-image" />
            <div className="trip-details">
              <h2>{trip.title}</h2>
              <p>{trip.description}</p>
              <p>Date: {trip.date}</p>
              <div className="button-group">
                <Link to={`/trip/${trip.id}`} className="view-trip-button">View Details</Link>
                {isBooked(trip.id) ? (
                  <p className="booked-message">Booked</p>
                ) : (
                  <button onClick={() => bookTrip(trip.id)} className="book-trip-button">Book Trip</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;