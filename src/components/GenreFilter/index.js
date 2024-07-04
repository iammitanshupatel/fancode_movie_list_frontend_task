import Box from "@mui/material/Box";

const GenreFilter = ({ genres, selectedGenre, handleGenreChange }) => {
  return (
    <Box className="genre-filter-container">
      {genres?.map((genre) => (
        <Box
          component="span"
          key={genre?.id}
          sx={{
            backgroundColor: selectedGenre?.id === genre?.id ? "red" : "grey",
          }}
          onClick={() => handleGenreChange(genre)}
        >
          {genre?.name}
        </Box>
      ))}
    </Box>
  );
};

export default GenreFilter;
