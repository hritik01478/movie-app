const MovieList = (props) => {
    const FavouriteComponent = props.favouriteComponent;
    return (
        <>
            {props.movies.map((movie, index) =>
                <div className="img-container">
                    <img src={movie.Poster} alt="movie" />
                    <div onClick={() => props.handleFavouritesClick(movie)} className="favourite"><FavouriteComponent /></div>
                </div>
            )}
        </>
    );
}

export default MovieList; 