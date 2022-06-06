import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListheading';
import SearchBox from './components/SearchBox';
import AddFavourites from './components/AddFavourites';

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

  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
    // console.log(favourites);
  };

  return (
    <div>
      <div className="navbar">
        <MovieListHeading heading='Movies' />
        <SearchBox serchValue={serchValue} setSearchValue={setSearchValue} />
      </div>
      <div className="horizontal-scroll">
        <MovieList movies={movies} handleFavouritesClick={addFavouriteMovie} favouriteComponent={AddFavourites} />
      </div>
      <div className="navbar">
        <MovieListHeading heading='Favourites' />
      </div>
      <div className="horizontal-scroll">
        <MovieList movies={favourites} handleFavouritesClick={addFavouriteMovie} favouriteComponent={AddFavourites} />
      </div>
    </div>
  );
}

export default App;
