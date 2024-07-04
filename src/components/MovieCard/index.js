import { useState } from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";

const MovieCard = ({ movie, genres }) => {
  const [shouldShowImage, setShouldShowImage] = useState(true);
  const genreNames = movie?.genre_ids
    ?.map((id) => genres?.find((x) => x?.id === id)?.name)
    .filter(Boolean)
    .join(" | ");

  return (
    <Card
      key={movie?.id}
      className="movie-card"
      onMouseOver={() => setShouldShowImage(false)}
      onMouseOut={() => setShouldShowImage(true)}
    >
      <CardMedia
        sx={{ height: shouldShowImage ? 400 : 120 }}
        image={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
        title={movie?.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h5">
          {movie?.title}
        </Typography>
        <Typography variant="body2">{movie?.overview}</Typography>
        <Typography variant="body2" className="genre-names">
          {genreNames}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
