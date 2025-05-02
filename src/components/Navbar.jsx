// src/components/Navbar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { FaUser, FaShoppingCart, FaSearch } from "react-icons/fa";
import { BsSun, BsMoonStars } from "react-icons/bs";

export default function Navbar({ isDarkMode, toggleDarkMode }) {
  return (
    <nav className="navbar navbar-expand-md navbar-light bg-white shadow-sm">
      <div className="container">
        <NavLink className="navbar-brand" to="/">YANKI-TCHOUKA</NavLink>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            {/* tes autres liens */}
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/register">S'inscrire</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">Se connecter</NavLink>
            </li>
            <li className="nav-item">
              <button className="btn btn-outline-secondary" onClick={toggleDarkMode}>
                {isDarkMode ? <BsSun /> : <BsMoonStars />}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
