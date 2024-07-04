import { useState } from "react";

const MovieCard = ({ movie, genres }) => {
  const [shouldShowImage, setShouldShowImage] = useState(true);
  const genreNames = movie?.genre_ids
    ?.map((id) => genres?.find((x) => x?.id === id)?.name)
    .filter(Boolean)
    .join(" | ");

  return (
    <div
      key={movie?.id}
      className="movie-card"
      onMouseOver={() => setShouldShowImage(false)}
      onMouseOut={() => setShouldShowImage(true)}
    >
      <div
        className="card-media"
        style={{
          height: shouldShowImage ? 400 : 120,
          backgroundImage: `url(
            https://image.tmdb.org/t/p/w500/${movie?.poster_path}
          )`,
        }}
        title={movie?.title}
      />
      <div className="card-content">
        <h5>{movie?.title}</h5>
        <p className="body2">{movie?.overview}</p>
        <p className="body2 genre-names">{genreNames}</p>
      </div>
    </div>
  );
};

export default MovieCard;
