import React from "react";
import "./Navbar.css";
import DarkMode from "../DarkMode/DarkMode";

const Navbar = () => {
  return (
    <div className="navbar">
      {/* BRAND */}
      <h1 className="title">
        Cine<span className="navbar_brand_highlight">vault</span>
      </h1>

      {/* NAVIGATION LINKS */}
      <div className="navbar-links">
        <a href="#popular">
          Popular <i className="navbar_emoji fa-solid fa-fire-flame-curved"></i>
        </a>

        <a href="#top-rated">
          Top Rated <i className="navbar_emoji fa-solid fa-star"></i>
        </a>

        <a href="#upcoming">
          Upcoming <i className="navbar_emoji fa-solid fa-calendar-days"></i>
        </a>
      </div>

      {/* NAVBAR ACTIONS */}
      <div className="navbar-actions">
        <DarkMode />
      </div>
    </div>
  );
};

export default Navbar;
