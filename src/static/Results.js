import React, { useState, useEffect } from "react";
import "../styles/results.css";

const Results = ({ movieState, back, backButtState }) => {
  const [userState, setUserState] = useState({});

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    const response = await fetch("https://movie-app-backend-win.herokuapp.com/users/login", {
      method: "GET",
      credentials: "include",
    });
    const user = await response.json();
    const newUserState = user;
    console.log(newUserState);
    setUserState(await newUserState);
    //above works
  }

  async function saveMovie() {
    const movieId = movieState.id;
    console.log(movieId);
    let user = userState;
    if (user.favoriteMovies == null) {
      user.favoriteMovies = [movieId];
      alert("Movie was added to Favorites!");
    } else {
      if (user.favoriteMovies.includes(movieId)) {
        alert("You've already favorited this!");
      } else {
        user.favoriteMovies.push(movieId);
        alert("Movie was added to Favorites!");
      }
    }

    const response = await fetch("https://movie-app-backend-win.herokuapp.com/users/favorites", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    console.log("POSTUSER" + json);
    console.log(user.favoriteMovies);
  }

  return (
    <div className="main-container">
      <div className="row">
        <div className="col-md-3 img-container">
          <img
            className="img-fluid"
            max-width="50%"
            src={movieState.image}
            alt="img"
          />
        </div>

        <div className="col-md-7 info-container">
          {backButtState ? (
            <button className="backBtn" onClick={back}>
              <i
                class="fa fa-arrow-circle-left fa-cog fa-3x"
                aria-hidden="true"
              ></i>
            </button>
          ) : (
            <p></p>
          )}
          <p className="movieTitle">{movieState.title} </p>
          <p className="time">
            {" "}
            {movieState.year} | {movieState.runtimeMins} min |{" "}
            {movieState.contentRating}
          </p>
          <div>
            <p className="header-text">Directors:</p>
            <p className="info-text">{movieState.directors}</p>

            <p className="header-text">Stars:</p>
            <p className="info-text">{movieState.stars}</p>
            <p className="header-text">Genres:</p>
            <p className="info-text">{movieState.genres}</p>
            <br></br>
            <p className="header-text"> Plot: </p>
            <p className="info-text">{movieState.plot}</p>
          </div>
          <br></br>
          <button
            type="button"
            className="btn btn-warning resultsBtn"
            onClick={saveMovie}
          >
            Add to Favorites{" "}
          </button>{" "}
          {!backButtState ? (
            <button
              type="button"
              className="btn btn-warning resultsBtn"
              onClick={back}
            >
              Back To In Theaters{" "}
            </button>
          ) : (
            <p></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Results;
