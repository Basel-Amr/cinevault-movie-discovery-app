import React from "react";
import "./styles/App.css";
import "./styles/index.css";
// import MovieList from "./components/MovieList/MovieList";
import Navbar from "./components/Navbar/Navbar";
const App = () => {
  return (
    <div className="app">
      <Navbar />
      {/* <MovieList /> */}
    </div>
  );
};

export default App;
