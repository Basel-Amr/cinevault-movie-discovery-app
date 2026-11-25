import React, { useEffect, useState } from "react";

import "./styles/App.css";
import "./styles/index.css";

import Navbar from "./components/Navbar/Navbar";
import MovieToolbar from "./components/MovieToolbar/MovieToolbar";
import MovieList from "./components/MovieList/MovieList";

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
// INITIAL COLLECTION SETTINGS
// ==========================================

const createInitialSettings = () => {
  return Object.fromEntries(
    movieCategories.map((category) => [
      category.id,
      {
        minRating: 0,
        sortBy: "date",
        sortOrder: "asc",
      },
    ]),
  );
};

// ==========================================
// APP COMPONENT
// ==========================================

const App = () => {
  const [activeCategoryId, setActiveCategoryId] = useState("popular");

  const [collectionSettings, setCollectionSettings] = useState(
    createInitialSettings,
  );

  // ==========================================
  // ACTIVE COLLECTION
  // ==========================================

  const activeCategory = movieCategories.find(
    (category) => category.id === activeCategoryId,
  );

  const activeSettings = collectionSettings[activeCategoryId];

  // ==========================================
  // UPDATE COLLECTION SETTINGS
  // ==========================================

  const handleSettingsChange = (changes) => {
    setCollectionSettings((previousSettings) => ({
      ...previousSettings,
      [activeCategoryId]: {
        ...previousSettings[activeCategoryId],
        ...changes,
      },
    }));
  };

  // ==========================================
  // DETECT ACTIVE SECTION ON SCROLL
  // ==========================================

  useEffect(() => {
    let ticking = false;

    const updateActiveCategory = () => {
      if (ticking) return;

      ticking = true;

      window.requestAnimationFrame(() => {
        let currentCategory = movieCategories[0].id;

        movieCategories.forEach((category) => {
          const section = document.getElementById(category.id);

          if (section) {
            const position = section.getBoundingClientRect().top;

            if (position <= 190) {
              currentCategory = category.id;
            }
          }
        });

        setActiveCategoryId((previous) =>
          previous === currentCategory ? previous : currentCategory,
        );

        ticking = false;
      });
    };

    window.addEventListener("scroll", updateActiveCategory, {
      passive: true,
    });

    window.addEventListener("resize", updateActiveCategory);

    updateActiveCategory();

    return () => {
      window.removeEventListener("scroll", updateActiveCategory);
      window.removeEventListener("resize", updateActiveCategory);
    };
  }, []);

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <div className="app">
      {/* MAIN NAVIGATION */}

      <Navbar />

      {/* GLOBAL MOVIE TOOLBAR */}

      <MovieToolbar
        activeCategory={activeCategory}
        settings={activeSettings}
        onSettingsChange={handleSettingsChange}
      />

      {/* MOVIE COLLECTIONS */}

      <main className="app_main">
        {movieCategories.map((category) => (
          <MovieList
            key={category.id}
            id={category.id}
            type={category.type}
            settings={collectionSettings[category.id]}
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
