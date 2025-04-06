import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourites from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';

const App = () => {
  const [movies, setMovies] = useState([]); // 👈 use camelCase for state variables
  const [favourites, setFavourites] = useState([]); // 👈 use camelCase for state variables

  const[searchValue, setsearchValue] = useState(''); // 👈 use camelCase for state variables

  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=d1ba5b21`; // 👈 make sure to replace with the actual search value
  
    // try {
      const response = await fetch(url); // 👈 make sure this is defined
      const responseJson = await response.json(); // 👈 use correct variable
  
      if (responseJson.Search) {
        setMovies(responseJson.Search);
      }
    // } catch (error) {
    //   console.error("Fetch error:", error);
    // }
    

    // setMovies(responseJson.Search);
  };
  
  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);
  

  const saveToLocalStorage = (items) => {
    localStorage.setItem('favourites', JSON.stringify(items));
  }

  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  }

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );
    setFavourites(newFavouriteList);

  }

  return (
    <div className='container-fluid movie-app'>
      <div className='row d-flex align-items-center mt-4 mb-4'>
          <MovieListHeading heading='Movies'/>
          <SearchBox searchValue={searchValue} setsearchValue={setsearchValue}/>
      </div>
      <div className='movie-row'>
        <MovieList movies={movies} handleFavouritesClick={addFavouriteMovie} FavouriteComponents={AddFavourites} />
      </div>
     
      <div className='row d-flex align-items-center mt-4 mb-4'>
          <MovieListHeading heading='Favourites'/>
      </div>
      <div className='movie-row'>
        <MovieList movies={favourites} 
        handleFavouritesClick={removeFavouriteMovie} 
        FavouriteComponents={RemoveFavourites} />
         {favourites.length === 0 && (
        <div className='row d-flex align-items-center mt-4 mb-4'>
          <p className='text-center'>No favourites added yet.</p>
        </div>
      )}
      </div>

    </div>
  );
};

export default App;
