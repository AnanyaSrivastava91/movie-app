import React from 'react';

const MovieList = (props) => {
    const FavouriteComponents = props.FavouriteComponents;
  return (
    <>
      {props.movies.map((movie, index) => (
        <div className="image-container movie-card m-2" key={index}>
          <img src={movie.Poster} alt='this one f*cked up' />
          <div onClick={()=> props.handleFavouritesClick(movie)} className='overlay d-flex align-items-center justify-content-center'>
            <FavouriteComponents/>
          </div>
        </div>
      ))}
    </>
  );
};

export default MovieList;
