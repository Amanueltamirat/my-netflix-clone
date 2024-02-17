import React, { useEffect, useState } from "react";
import "./Banner.css";
import axios from "./axios";
import requests from "./requests";

function Banner() {
  const [movie, setMovies] = useState([]);

  useEffect(() => {
    async function fetachData() {
      const result = await axios.get(requests.fetchNetflixOriginals);
      setMovies(
        result.data.results[
          Math.floor(Math.random() * result.data.results.length - 1)
        ]
      );
      return result;
    }
    fetachData();
  }, []);
  // console.log(movie);
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner-contents">
        <h1 className="banner_title">
          {movie?.name || movie?.title || movie?.original_name}
        </h1>
        <div className="banner_buttons">
          <button className="banner_button">Play</button>
          <button className="banner_button">My List</button>
        </div>
        <h2 className="banner_description">{truncate(movie?.overview, 150)}</h2>
      </div>
      <div className="banner_fadebottom"></div>
    </header>
  );
}

export default Banner;
