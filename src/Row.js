import React, { useEffect, useState } from "react";
import axios from "./axios";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
const base_url = "https://image.tmdb.org/t/p/original";
function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  // console.log(movies);
  useEffect(() => {
    async function fetachData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetachData();
  }, [fetchUrl]);
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      //https://developers.google.com/youtube/player_parameters,
      autoplay: 1,
    },
  };

  // const handleClick = (movie) => {
  //   if (trailerUrl) {
  //     setTrailerUrl("");
  //   } else {
  //     movieTrailer(movie?.name || "")
  //       .then((url) => {
  //         const urlParams = new URLSearchParams(new URL(url).searchParams);
  //         setTrailerUrl(urlParams.get("v"));
  //         // setTrailerUrl(urlParams.v);
  //       })
  //       .catch((error) => console.log(error));
  //   }
  // };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || "")
        .then((url) => {
          try {
            if (url) {
              const urlParams = new URLSearchParams(new URL(url).searchParams);
              const trailerVideoId = urlParams.get("v");
              setTrailerUrl(trailerVideoId);
            } else {
              console.log("Empty URL received");
            }
          } catch (error) {
            console.log("Error parsing the URL:", error);
          }
        })
        .catch((error) => console.log("Error fetching the trailer:", error));
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row-posters">
        {movies.map((movie) => (
          <img
            onClick={() => handleClick(movie)}
            className={`row-poster ${isLargeRow && "row-largerow"}`}
            key={movie.id}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
