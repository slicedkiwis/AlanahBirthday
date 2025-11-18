import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeartAnimation from './components/HeartAnimation';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';
import './App.css';

const WelcomeScreen = React.lazy(() => import('./components/WelcomeScreen'));
const MapScreen = React.lazy(() => import('./components/MapScreen'));
const SummaryScreen = React.lazy(() => import('./components/SummaryScreen'));
const FinalScreen = React.lazy(() => import('./components/FinalScreen'));

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="App">
          <HeartAnimation />
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<WelcomeScreen />} />
              <Route path="/map" element={<MapScreen />} />
              <Route path="/summary" element={<SummaryScreen />} />
              <Route path="/final" element={<FinalScreen />} />
            </Routes>
          </Suspense>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;