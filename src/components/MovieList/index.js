import { useState, useEffect, useRef } from "react";
import { Typography, Box, Input } from "@mui/material";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import MovieCard from "../MovieCard";
import GenreFilter from "../GenreFilter";

const MovieList = () => {
  const [year, setYear] = useState(2012);
  const [page, setPage] = useState(1);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState();
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [maxLimit, setMaxLimit] = useState();
  const debounceTimeout = useRef(null);

  const fetchGenres = async () => {
    setErrorMessage("");
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}`
      );
      setGenres([
        {
          id: "all",
          name: "All",
        },
        ...response.data.genres,
      ]);
      setSelectedGenre({
        id: "all",
        name: "All",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setYear(2012);
    fetchGenres();
  }, []);

  const fetchData = async (yearPassed, moviesPassed) => {
    setErrorMessage("");
    setIsLoading(true);
    const genreQuery =
      selectedGenre && selectedGenre?.id !== "all"
        ? `&with_genres=${selectedGenre?.id}`
        : "";
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&sort_by=popularity.desc&primary_release_year=${yearPassed}${genreQuery}&vote_count.gte=100`
      );
      const moviesFromData = {
        year: yearPassed,
        data: response?.data?.results,
      };
      setMovies([...moviesPassed, moviesFromData]);
    } catch (error) {
      console.error(error);
      setErrorMessage("Something went wrong, please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenreChange = (genre) => setSelectedGenre(genre);

  const fetchForSearch = async (value, pageFromProps, moviesPassed) => {
    setErrorMessage("");
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${value}&page=${pageFromProps}`
      );
      const moviesFromData = {
        data: response?.data?.results,
      };
      setMaxLimit(response?.data?.total_results);
      setMovies([...moviesPassed, moviesFromData]);
    } catch (error) {
      console.error(error);
      setErrorMessage("Something went wrong, please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    page > 1 && fetchForSearch(inputValue, page, movies);
  }, [page]);

  useEffect(() => {
    year > 2012 && fetchData(year, movies);
  }, [year]);

  useEffect(() => {
    setMovies([]);
    setYear(2012);
    fetchData(2012, []);
  }, [selectedGenre]);

  useEffect(() => {
    if (inputValue) {
      setPage(1);
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
      debounceTimeout.current = setTimeout(() => {
        fetchForSearch(inputValue, 1, []);
      }, 1000);
    } else {
      setSelectedGenre({ id: "all", name: "All" });
    }

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [inputValue]);

  const hasMore = inputValue
    ? movies?.reduce((p, c) => +p + +c?.data?.length, []) < maxLimit
    : year !== new Date().getFullYear();

  return (
    <>
      <Input
        className="search-bar"
        placeholder="Search Movies"
        value={inputValue}
        onChange={(e) => {
          const value = e?.target?.value;
          setMovies([]);
          setInputValue(value);
        }}
      />
      {!inputValue && (
        <GenreFilter
          genres={genres}
          selectedGenre={selectedGenre}
          handleGenreChange={handleGenreChange}
        />
      )}
      <InfiniteScroll
        dataLength={movies?.length}
        next={() =>
          inputValue ? setPage((prev) => prev + 1) : setYear((prev) => prev + 1)
        }
        hasMore={hasMore}
        loader={<></>}
      >
        {movies?.map((movie) => (
          <Box className="movie-list-container" key={movie?.year}>
            {movie?.year && (
              <Typography
                component="h3"
                variant="h3"
                sx={{ color: "white", mb: 3 }}
              >
                {movie.year}
              </Typography>
            )}
            <Box display="flex" flexWrap="wrap" gap={2}>
              {movie?.data?.map((movie) => (
                <MovieCard key={movie?.id} movie={movie} genres={genres} />
              ))}
            </Box>
          </Box>
        ))}
      </InfiniteScroll>
      {isLoading && (
        <Typography component="h6" variant="h6" sx={{ color: "white" }}>
          Loading...
        </Typography>
      )}
      {errorMessage && (
        <Typography component="h6" variant="h6" sx={{ color: "red" }}>
          {errorMessage}
        </Typography>
      )}
    </>
  );
};

export default MovieList;
