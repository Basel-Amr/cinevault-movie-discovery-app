import React from "react";
import "./styles/App.css";
import "./styles/index.css";

import MovieList from "./components/MovieList/MovieList";
import Navbar from "./components/Navbar/Navbar";

// ==========================================
// MOVIE CATEGORIES CONFIGURATION
// ==========================================

const movieCategories = [
  {
    id: "popular",
    type: "popular",
    title: "Popular",
    subtitle: "The movies everyone is talking about",
    icon: "fa-solid fa-fire-flame-curved",
  },
  {
    id: "now-playing",
    type: "now_playing",
    title: "Now Playing",
    subtitle: "Discover movies currently in theaters",
    icon: "fa-solid fa-film",
  },
  {
    id: "top-rated",
    type: "top_rated",
    title: "Top Rated",
    subtitle: "Explore the highest-rated movies",
    icon: "fa-solid fa-star",
  },
  {
    id: "upcoming",
    type: "upcoming",
    title: "Upcoming",
    subtitle: "Get ready for what's coming next",
    icon: "fa-solid fa-calendar-days",
  },
];

// ==========================================
// APP COMPONENT
// ==========================================

const App = () => {
  return (
    <div className="app">
      {/* NAVIGATION */}
      <Navbar />

      {/* MAIN CONTENT */}
      <main className="app_main">
        {/* MOVIE CATEGORIES */}
        {movieCategories.map((category) => (
          <MovieList
            key={category.id}
            id={category.id}
            type={category.type}
            title={category.title}
            subtitle={category.subtitle}
            icon={category.icon}
          />
        ))}
      </main>

      {/* FOOTER */}
      <footer className="app_footer">
        <p>
          Crafted with <i className="fa-solid fa-heart"></i> for movie lovers.
        </p>

        <span>
          © {new Date().getFullYear()} CineVault. All rights reserved.
        </span>
      </footer>
    </div>
  );
};

export default App;
