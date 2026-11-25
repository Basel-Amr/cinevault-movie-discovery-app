import React, { useEffect, useMemo, useState } from "react";
import "./MovieList.css";
import MovieCard from "./MovieCard";

// ==========================================
// MOVIE LIST
// ==========================================

const MovieList = ({ id, type, settings }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // FETCH MOVIES FROM TMDB
  // ==========================================

  useEffect(() => {
    const controller = new AbortController();

    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError("");

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
            signal: controller.signal,
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
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error(`Error fetching ${type} movies:`, error);
          setError(error.message || "Something went wrong.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchMovies();

    return () => {
      controller.abort();
    };
  }, [type]);

  // ==========================================
  // FILTER AND SORT MOVIES
  // ==========================================

  const sortedMovies = useMemo(() => {
    const filtered = movies.filter((movie) => {
      return movie.vote_average >= settings.minRating;
    });

    return filtered.sort((a, b) => {
      let comparison = 0;

      if (settings.sortBy === "date") {
        comparison = (a.release_date || "").localeCompare(b.release_date || "");
      }

      if (settings.sortBy === "rating") {
        comparison = a.vote_average - b.vote_average;
      }

      return settings.sortOrder === "asc" ? comparison : -comparison;
    });
  }, [movies, settings.minRating, settings.sortBy, settings.sortOrder]);

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <section className="movie_list" id={id}>
      {loading && (
        <div className="movie_status">
          <i className="fa-solid fa-spinner fa-spin"></i>
          <span>Discovering movies...</span>
        </div>
      )}

      {!loading && error && (
        <div className="movie_status movie_error">
          <i className="fa-solid fa-circle-exclamation"></i>
          <span>{error}</span>
        </div>
      )}

      {!loading && !error && sortedMovies.length === 0 && (
        <div className="movie_status">
          <i className="fa-solid fa-film"></i>
          <span>No movies match your selected filters.</span>
        </div>
      )}

      {!loading && !error && sortedMovies.length > 0 && (
        <div className="movie_cards">
          {sortedMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </section>
  );
};

export default MovieList;
