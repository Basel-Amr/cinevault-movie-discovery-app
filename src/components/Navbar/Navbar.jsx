import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <h1 className="title">
        Cine<span className="text-white">vault</span>
      </h1>

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
    </div>
  );
};

export default Navbar;
