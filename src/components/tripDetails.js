import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './tripDetails.css';

function TripDetails() {
  const [trip, setTrip] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/trips/${id}`);
        setTrip(response.data);
      } catch (error) {
        console.error('Error fetching trip details:', error);
      }
    };

    fetchTrip();
  }, [id]);

  if (!trip) return <div>Loading...</div>;

  return (
    <div className="trip-details">
      <h2>{trip.title}</h2>
      <p>{trip.description}</p>
      <p>Date: {trip.date}</p>
    </div>
  );
}

export default TripDetails;