import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className={`navbar-menu ${isOpen ? 'open' : ''}`}>
          <ul className="navbar-links">
            <li>
              <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
            </li>
            <li>
              <Link to="/people" onClick={() => setIsOpen(false)}>People</Link>
            </li>
            <li>
              <Link to="/planets" onClick={() => setIsOpen(false)}>Planets</Link>
            </li>
            <li>
              <Link to="/films" onClick={() => setIsOpen(false)}>Films</Link>
            </li>
            <li>
              <Link to="/species" onClick={() => setIsOpen(false)}>Species</Link>
            </li>
            <li>
              <Link to="/vehicles" onClick={() => setIsOpen(false)}>Vehicles</Link>
            </li>
            <li>
              <Link to="/starships" onClick={() => setIsOpen(false)}>Starships</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-toggle" onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
