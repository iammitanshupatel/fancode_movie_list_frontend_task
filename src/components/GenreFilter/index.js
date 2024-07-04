const GenreFilter = ({ genres, selectedGenre, handleGenreChange }) => {
  return (
    <div className="genre-filter-container">
      {genres?.map((genre) => (
        <span
          component="span"
          key={genre?.id}
          style={{
            backgroundColor: selectedGenre?.id === genre?.id ? "red" : "grey",
          }}
          onClick={() => handleGenreChange(genre)}
        >
          {genre?.name}
        </span>
      ))}
    </div>
  );
};

export default GenreFilter;
