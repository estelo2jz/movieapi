import React, {useEffect, useState} from 'react';
import Movie from './components/Movie';
import "./styles/main.scss";

const FEATURED_API = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const SEARCH_API = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

function App() {
  // set the movies when we get the movies from the api
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // useEffect hook 
  useEffect(() => {
    getMovies(FEATURED_API);
  }, [])

  const getMovies = (API) => {
    fetch(API)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      setMovies(data.results);
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (searchTerm) {
      getMovies(SEARCH_API+searchTerm)
      setSearchTerm("");
    }

  };

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  }

  return (
    <div>
      <header>
        <form onSubmit={handleOnSubmit}>
          <input 
            className="search" 
            type="search" 
            placeholder="Search..." 
            value={searchTerm}
            onChange={handleOnChange}
          />

        </form>
      </header>
      <div className="movie-container">
        {movies.length > 0 && movies.map((movie) => (
          // we getting the API here on the APP component, and were passing the results 
          // from the API throught the Movie component using props.
          <Movie key={movie.id} {...movie} />
        ))}
      </div>
    </div>
  );
}

export default App;
