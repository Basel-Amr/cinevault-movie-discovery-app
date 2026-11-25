import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);

const THEME_STORAGE_KEY = "cinevault-theme";

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    try {
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);

      return savedTheme === "light" || savedTheme === "dark"
        ? savedTheme
        : "dark";
    } catch {
      return "dark";
    }
  });

  // Apply theme globally and save preference
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);

    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (error) {
      console.warn("Could not save theme preference:", error);
    }
  }, [theme]);

  // Toggle between dark and light
  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  };

  // Set a specific theme
  const changeTheme = (newTheme) => {
    if (newTheme === "dark" || newTheme === "light") {
      setTheme(newTheme);
    }
  };

  const value = {
    theme,
    toggleTheme,
    changeTheme,
    isDark: theme === "dark",
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

// Custom hook for accessing theme
export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside a ThemeProvider");
  }

  return context;
};
