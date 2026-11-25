import React, { useEffect, useRef, useState } from "react";
import "./MovieToolbar.css";
import FilterGroup from "../MovieList/FilterGroup";

// ==========================================
// REUSABLE SORT DROPDOWN
// ==========================================

const SortDropdown = ({ value, options, onChange, icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

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
    <div className="toolbar_sort_group" ref={dropdownRef}>
      {icon && <i className={icon}></i>}

      <div className="toolbar_custom_dropdown">
        <button
          type="button"
          className={`toolbar_sort_trigger ${isOpen ? "active" : ""}`}
          onClick={() => setIsOpen((prev) => !prev)}
          aria-haspopup="menu"
          aria-expanded={isOpen}
        >
          <span>{selectedOption?.label}</span>

          <i
            className={`fa-solid fa-chevron-down toolbar_chevron ${
              isOpen ? "rotated" : ""
            }`}
          ></i>
        </button>

        {isOpen && (
          <div className="toolbar_sort_menu" role="menu">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                role="menuitem"
                className={`toolbar_sort_option ${
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
// MOVIE TOOLBAR
// ==========================================

const MovieToolbar = ({ activeCategory, settings, onSettingsChange }) => {
  if (!activeCategory || !settings) return null;

  const updateSetting = (key, value) => {
    onSettingsChange({
      [key]: value,
    });
  };

  const handleRatingClick = (rate) => {
    const newRating = settings.minRating === rate ? 0 : rate;

    updateSetting("minRating", newRating);
  };

  return (
    <section className="movie_toolbar">
      <div className="movie_toolbar_inner">
        {/* ACTIVE COLLECTION */}

        <div className="toolbar_collection">
          <span className="toolbar_eyebrow">NOW EXPLORING</span>

          <div className="toolbar_title">
            <h2>{activeCategory.title}</h2>

            <span className="toolbar_title_icon">
              <i className={activeCategory.icon}></i>
            </span>
          </div>

          <p className="toolbar_subtitle">{activeCategory.subtitle}</p>
        </div>

        {/* FILTER AND SORT CONTROLS */}

        <div className="movie_toolbar_controls">
          {/* RATING FILTER */}

          <div className="toolbar_rating_control">
            <span className="toolbar_control_label">RATING</span>

            <FilterGroup
              minRating={settings.minRating}
              onRatingClick={handleRatingClick}
              ratings={[8, 7, 6]}
            />
          </div>

          {/* SORTING */}

          <div className="toolbar_sort_controls">
            <SortDropdown
              icon="fa-solid fa-arrow-down-wide-short"
              value={settings.sortBy}
              onChange={(value) => updateSetting("sortBy", value)}
              options={[
                { value: "date", label: "Date" },
                { value: "rating", label: "Rating" },
              ]}
            />

            <SortDropdown
              value={settings.sortOrder}
              onChange={(value) => updateSetting("sortOrder", value)}
              options={[
                { value: "asc", label: "Ascending" },
                { value: "desc", label: "Descending" },
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MovieToolbar;
