import React, { useEffect, useState } from "react";
import "./MovieList.css";
import MovieCard from "./MovieCard";
const MovieList = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    fetchmovies();
  }, []);
  const fetchmovies = async () => {
    const response = await fetch("https://api.themoviedb.org/3/movie/popular", {
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYmU4MWY0Y2I0NjA4Y2VkM2IxMmIyYTNkY2RiZTkyNyIsIm5iZiI6MTc5NTQ4MTUyMC40NjgsInN1YiI6IjZiMDRkZmIwYmMxZmQ3ZjgxOTQwODI5NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lXmtc0hq5uPlMn-4yYXx4gMKLZ6TaWkWd4eSz_AacY8",
      },
    });
    const data = await response.json();
    setMovies(data.results);
  };

  return (
    <div>
      <section className="movie_list">
        {/* Part 1: Header */}
        <header className="movie_list_header align_center">
          <h2 className="align_center movie_list_heading ">
            Popular
            <i className="navbar_emoji fa-solid fa-fire-flame-curved"></i>
          </h2>
          <div className="align_center movie_list_fs ">
            <ul className=" align_center movie_filter ">
              <li className="movie_filter_item active">
                8+ <i className="fa-solid fa-star"></i>
              </li>
              <li className="movie_filter_item">
                7+ <i className="fa-solid fa-star"></i>
              </li>
              <li className="movie_filter_item">
                6+ <i className="fa-solid fa-star"></i>
              </li>
            </ul>
            {/*./movie_filter*/}
            <select name="" id="" className="movie_sorting">
              <option value="">SortBy</option>
              <option value="">Date</option>
              <option value="">Rating</option>
            </select>
            <select name="" id="" className="movie_sorting">
              <option value="">Ascending</option>
              <option value="">Descending</option>
            </select>
            {/*./movie_sorting*/}
          </div>
          {/*./movie_list_fs*/}
        </header>
        {/*./movie_list_header*/}

        {/*  Part 2: Movie Cart List */}

        <div className="movie_cards grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-4 sm:gap-5">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        {/*./movie_cards*/}
      </section>
    </div>
  );
};

export default MovieList;
