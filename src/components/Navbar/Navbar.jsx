import React from "react";
import "./Navbar.css";
import DarkMode from "../DarkMode/DarkMode";

// ==========================================
// NAVIGATION CONFIGURATION
// ==========================================

const navLinks = [
  {
    id: "popular",
    label: "Popular",
    icon: "fa-solid fa-fire-flame-curved",
  },
  {
    id: "now-playing",
    label: "Now Playing",
    icon: "fa-solid fa-film",
  },
  {
    id: "top-rated",
    label: "Top Rated",
    icon: "fa-solid fa-star",
  },
  {
    id: "upcoming",
    label: "Upcoming",
    icon: "fa-solid fa-calendar-days",
  },
];

// ==========================================
// NAVBAR COMPONENT
// ==========================================

const Navbar = () => {
  return (
    <header className="navbar">
      {/* BRAND */}

      <a href="#popular" className="navbar-brand">
        <span className="brand_icon">
          <i className="fa-solid fa-clapperboard"></i>
        </span>

        <h1>
          Cine<span>vault</span>
        </h1>
      </a>

      {/* NAVIGATION */}

      <nav className="navbar-links" aria-label="Main navigation">
        {navLinks.map((link) => (
          <a key={link.id} href={`#${link.id}`} className="navbar-link">
            <i className={`${link.icon} navbar_emoji`}></i>
            <span>{link.label}</span>
          </a>
        ))}
      </nav>

      {/* ACTIONS */}

      <div className="navbar-actions">
        <DarkMode />
      </div>
    </header>
  );
};

export default Navbar;
