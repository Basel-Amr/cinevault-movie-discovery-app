import React from "react";
import { useTheme } from "../../context/ThemeContext";
import "./DarkMode.css";

const DarkMode = ({ showLabel = false }) => {
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      className={`theme_toggle ${isDark ? "dark" : "light"}`}
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <span className="theme_toggle_icon">
        <i className={`fa-solid ${isDark ? "fa-sun" : "fa-moon"}`}></i>
      </span>

      {showLabel && (
        <span className="theme_toggle_label">
          {isDark ? "Light Mode" : "Dark Mode"}
        </span>
      )}

      <span className="theme_toggle_indicator">
        {isDark ? "Dark" : "Light"}
      </span>
    </button>
  );
};

export default DarkMode;
