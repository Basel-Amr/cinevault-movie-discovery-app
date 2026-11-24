import React from "react";
import "./MovieCard.css";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MovieCard = ({
  movie,
  isFavorite = false,
  isInWatchlist = false,
  onToggleFavorite,
  onToggleWatchlist,
}) => {
  if (!movie) return null;

  const title = movie.title || movie.original_title || "Untitled Movie";

  const year = movie.release_date ? movie.release_date.slice(0, 4) : "TBA";

  const rating = Number(movie.vote_average);
  const formattedRating = Number.isFinite(rating) ? rating.toFixed(1) : "N/A";

  const votes = Number(movie.vote_count || 0).toLocaleString();

  const description = movie.overview?.trim() || "No description available.";

  const language = movie.original_language?.toUpperCase() || "N/A";

  const movieUrl = `https://www.themoviedb.org/movie/${movie.id}`;

  const handleAction = (event, callback) => {
    event.preventDefault();
    event.stopPropagation();
    callback(movie);
  };

  return (
    <article className="movie-card group">
      {/* Poster */}
      <div className="movie-card__poster-wrapper">
        <a
          href={movieUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Explore ${title}`}
          className="block h-full w-full"
        >
          {movie.poster_path ? (
            <img
              src={`${IMAGE_BASE_URL}${movie.poster_path}`}
              alt={`${title} poster`}
              loading="lazy"
              className="movie-card__poster"
            />
          ) : (
            <div className="movie-card__placeholder">
              <i className="fa-solid fa-film text-4xl"></i>
              <span>Poster unavailable</span>
            </div>
          )}
        </a>

        {/* Rating */}
        <div className="movie-card__rating">
          <i className="fa-solid fa-star"></i>
          <span>{formattedRating}</span>
        </div>

        {/* Language */}
        <span className="movie-card__language">{language}</span>

        {/* Action Buttons */}
        <div className="movie-card__actions">
          {onToggleFavorite && (
            <button
              type="button"
              onClick={(event) => handleAction(event, onToggleFavorite)}
              aria-label="Toggle favorite"
              aria-pressed={isFavorite}
              className="movie-card__action"
              title="Favorite"
            >
              <i
                className={`${isFavorite ? "fa-solid" : "fa-regular"} fa-heart`}
              ></i>
            </button>
          )}

          {onToggleWatchlist && (
            <button
              type="button"
              onClick={(event) => handleAction(event, onToggleWatchlist)}
              aria-label="Toggle watchlist"
              aria-pressed={isInWatchlist}
              className="movie-card__action"
              title="Watchlist"
            >
              <i
                className={`${isInWatchlist ? "fa-solid" : "fa-regular"} fa-bookmark`}
              ></i>
            </button>
          )}
        </div>

        {/* Hover Overlay */}
        <a
          href={movieUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="movie-card__overlay"
          aria-label={`View ${title} details`}
        >
          <span>
            Explore Movie
            <i className="fa-solid fa-arrow-right"></i>
          </span>
        </a>
      </div>

      {/* Movie Information */}
      <div className="movie-card__info">
        <div className="movie-card__heading">
          <h3 title={title}>{title}</h3>
          <span>{year}</span>
        </div>

        <div className="movie-card__meta">
          <span>
            <i className="fa-solid fa-star"></i>
            {formattedRating}/10
          </span>

          <span>
            <i className="fa-solid fa-users"></i>
            {votes} votes
          </span>
        </div>

        <p className="movie-card__description">{description}</p>
      </div>
    </article>
  );
};

export default MovieCard;
