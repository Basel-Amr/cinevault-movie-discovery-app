import React from "react";
import "./FilterGroup.css";

const FilterGroup = ({ minRating, onRatingClick, ratings }) => {
  return (
    <div className="rating_filter_wrapper">
      <span className="filter_label">RATING</span>

      <ul className="movie_filter">
        {ratings.map((rate) => (
          <li key={rate}>
            <button
              type="button"
              className={`movie_filter_item ${
                minRating === rate ? "active" : ""
              }`}
              onClick={() => onRatingClick(rate)}
              aria-pressed={minRating === rate}
            >
              {rate === 0 ? (
                <span>All</span>
              ) : (
                <>
                  <span>{rate}+</span>
                  <i className="fa-solid fa-star"></i>
                </>
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterGroup;
