import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListheading';
import SearchBox from './components/SearchBox';
import AddFavourites from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';

function App() {
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [serchValue, setSearchValue] = useState('avengers');

  const getMovieRequest = async (serchValue) => {
    const url = `http://www.omdbapi.com/?s=${serchValue}&apikey=f6be1bd0`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
      setMovies(responseJson.Search);
      console.log(responseJson.Search);
    }
  }

  useEffect(() => {
    getMovieRequest(serchValue);
  }, [serchValue]);

  useEffect(() => {
    const movieFavourites = JSON.parse(localStorage.getItem('react-movie-app-favourites'));
    setFavourites(movieFavourites);
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem('react-movie-app-favourites', JSON.stringify(items))
  };
  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
    // console.log(favourites);
  };
  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter((favourite) => favourite.imdbID !== movie.imdbID);
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  }

  return (
    <div>
      <div className="navbar">
        <MovieListHeading heading='Movies World' />
        <SearchBox serchValue={serchValue} setSearchValue={setSearchValue} />
      </div>
      <div className="horizontal-scroll">
        <div className="scroll-container">
          <MovieList movies={movies} handleFavouritesClick={addFavouriteMovie} favouriteComponent={AddFavourites} />
        </div>
      </div>
      <div className="navbar">
        <MovieListHeading heading='Favourites' />
      </div>
      <div className="horizontal-scroll">
        <div className="scroll-container">
          <MovieList movies={favourites} handleFavouritesClick={removeFavouriteMovie} favouriteComponent={RemoveFavourites} />
        </div>
      </div>
    </div>
  );
}

export default App;
