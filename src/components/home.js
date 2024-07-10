import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GridItem from './gridItem';
import './home.css';

function Home() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await axios.get('http://localhost:3001/trips');
        setTrips(response.data);
      } catch (error) {
        console.error('Error fetching trips:', error);
      }
    };

    fetchTrips();
  }, []);

  return (
    <div className="home">
      <h2>Available Trips</h2>
      <div className="grid">
        {trips.map(trip => (
          <GridItem key={trip.id} {...trip} />
        ))}
      </div>
    </div>
  );
}

export default Home;