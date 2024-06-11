import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Details from './pages/details';
import Homepage from './pages/homepage';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="/:username/details" element={<Details />} />
      </Routes>
    </Router>
  );
}

export default App;