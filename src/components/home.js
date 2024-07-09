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
      <div className="grid">
        {trips.map(trip => (
          <GridItem key={trip.id} id={trip.id} title={trip.title} image={trip.image || 'default.jpg'} />
        ))}
      </div>
    </div>
  );
}

export default Home;