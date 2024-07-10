import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './myTrips.css';

function MyTrips() {
  const [myTrips, setMyTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchMyTrips = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const userTripsResponse = await axios.get(`http://localhost:3001/userTrips?userId=${user.id}`);
        const tripIds = userTripsResponse.data.map(ut => ut.tripId);
        
        if (tripIds.length === 0) {
          setMyTrips([]);
          setLoading(false);
          return;
        }

        const tripsResponse = await axios.get(`http://localhost:3001/trips?${tripIds.map(id => `id=${id}`).join('&')}`);
        setMyTrips(tripsResponse.data);
      } catch (error) {
        console.error('Error fetching my trips:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyTrips();
  }, [user]);

  if (!user) {
    return <div className="my-trips">Please log in to view your trips</div>;
  }

  if (loading) {
    return <div className="my-trips">Loading...</div>;
  }

  return (
    <div className="my-trips">
      <h2>My Trips</h2>
      {myTrips.length === 0 ? (
        <p>You have not booked any trips yet.</p>
      ) : (
        myTrips.map(trip => (
          <div key={trip.id} className="trip-item">
            <h3>{trip.title}</h3>
            <p>{trip.description}</p>
            <p>Date: {trip.date}</p>
            <Link to={`/trip/${trip.id}`} className="button">View Details</Link>
          </div>
        ))
      )}
    </div>
  );
}

export default MyTrips;