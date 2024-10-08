import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import People from './pages/People';
import Planets from './pages/Planets';
import Films from './pages/Films';
import Species from './pages/Species';
import Vehicles from './pages/Vehicles';
import Starships from './pages/Starships';
import Navbar from './components/Navbar';
import './App.css'; // Optional: global styles

const App = () => {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/people" element={<People />} />
          <Route path="/planets" element={<Planets />} />
          <Route path="/films" element={<Films />} />
          <Route path="/species" element={<Species />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/starships" element={<Starships />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
