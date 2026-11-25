import React, { useEffect, useMemo, useRef, useState } from "react";
import "./MovieList.css";
import MovieCard from "./MovieCard";
import FilterGroup from "./FilterGroup";

// ==========================================
// CUSTOM SORT DROPDOWN
// ==========================================

const SortDropdown = ({ value, options, onChange, icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const selectedOption = options.find((option) => option.value === value);

  return (
    <div className="movie_sort_group" ref={dropdownRef}>
      {icon && <i className={icon}></i>}

      <div className="custom_sort_dropdown">
        <button
          type="button"
          className={`movie_sort_trigger ${isOpen ? "active" : ""}`}
          onClick={() => setIsOpen((prev) => !prev)}
          aria-haspopup="menu"
          aria-expanded={isOpen}
        >
          <span>{selectedOption?.label}</span>

          <i
            className={`fa-solid fa-chevron-down sort_chevron ${
              isOpen ? "rotated" : ""
            }`}
          ></i>
        </button>

        {isOpen && (
          <div className="movie_sort_menu" role="menu">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                role="menuitem"
                className={`movie_sort_option ${
                  value === option.value ? "selected" : ""
                }`}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
              >
                <span>{option.label}</span>

                {value === option.value && (
                  <i className="fa-solid fa-check"></i>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ==========================================
// MOVIE LIST
// ==========================================

const MovieList = ({ id, type, title, subtitle, icon }) => {
  const [movies, setMovies] = useState([]);
  const [minrating, setminRating] = useState(0);
  const [filteredMovies, setfilteredMovies] = useState([]);

  // Sorting states
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("asc");

  // ==========================================
  // FETCH MOVIES
  // ==========================================

  useEffect(() => {
    fetchmovies();
  }, []);

  const fetchmovies = async () => {
    try {
      const token = import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN;

      if (!token) {
        throw new Error("TMDB API token is missing!");
      }

      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${type}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        const errorData = await response.json();

        throw new Error(
          `TMDB Error ${response.status}: ${
            errorData.status_message || "Failed to fetch movies"
          }`,
        );
      }

      const data = await response.json();

      setMovies(data.results || []);
      setfilteredMovies(data.results || []);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  // ==========================================
  // FILTER MOVIES BY RATING
  // ==========================================

  const handleFilter = (rate) => {
    if (rate === minrating) {
      setminRating(0);
      setfilteredMovies(movies);
    } else {
      setminRating(rate);

      const filtered = movies.filter((movie) => movie.vote_average >= rate);

      setfilteredMovies(filtered);
    }
  };

  // ==========================================
  // SORT MOVIES
  // ==========================================

  const sortedMovies = useMemo(() => {
    const sorted = [...filteredMovies];

    sorted.sort((a, b) => {
      let comparison = 0;

      if (sortBy === "date") {
        comparison = (a.release_date || "").localeCompare(b.release_date || "");
      } else if (sortBy === "rating") {
        comparison = a.vote_average - b.vote_average;
      }

      return sortOrder === "asc" ? comparison : -comparison;
    });

    return sorted;
  }, [filteredMovies, sortBy, sortOrder]);

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <div>
      <section className="movie_list" id={id}>
        {/* SECTION HEADER */}

        <header className="movie_list_header align_center">
          <div className="movie_list_title">
            <span className="movie_list_eyebrow">
              DISCOVER YOUR NEXT FAVORITE
            </span>

            <h2 className="movie_list_heading">
              {title}

              <span className="heading_icon">
                <i className={icon}></i>
              </span>
            </h2>
          </div>

          <div className="align_center movie_list_fs">
            {/* RATING FILTER */}

            <FilterGroup
              minRating={minrating}
              onRatingClick={handleFilter}
              ratings={[8, 7, 6]}
            />

            {/* SORTING CONTROLS */}

            <div className="movie_sort_controls">
              {/* SORT BY */}

              <SortDropdown
                icon="fa-solid fa-arrow-down-wide-short"
                value={sortBy}
                onChange={setSortBy}
                options={[
                  { value: "date", label: "Date" },
                  { value: "rating", label: "Rating" },
                ]}
              />

              {/* SORT ORDER */}

              <SortDropdown
                value={sortOrder}
                onChange={setSortOrder}
                options={[
                  { value: "asc", label: "Ascending" },
                  { value: "desc", label: "Descending" },
                ]}
              />
            </div>
          </div>
        </header>

        {/* MOVIE CARDS */}

        <div className="movie_cards grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-4 sm:gap-5">
          {sortedMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default MovieList;
