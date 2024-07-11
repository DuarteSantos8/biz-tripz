import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header';
import Home from './components/home';
import Login from './components/login';
import Register from './components/register';
import TripDetails from './components/tripDetails';
import MyTrips from './components/myTrips';
import './App.css';

function App() {

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/trip/:id" element={<TripDetails />} />
          <Route path="/my-trips" element={<MyTrips />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;