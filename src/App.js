import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomeScreen from './components/WelcomeScreen';
import MapScreen from './components/MapScreen';
import SummaryScreen from './components/SummaryScreen';
import FinalScreen from './components/FinalScreen';
import HeartAnimation from './components/HeartAnimation';
import './App.css';

function App() {
  return (
    <Router basename="/alanahsbirthday">
      <div className="App">
        <HeartAnimation />
        <Routes>
          <Route path="/" element={<WelcomeScreen />} />
          <Route path="/map" element={<MapScreen />} />
          <Route path="/summary" element={<SummaryScreen />} />
          <Route path="/final" element={<FinalScreen />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;