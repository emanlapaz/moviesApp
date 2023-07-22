import React from "react";
import { useLocation } from "react-router-dom";
import TemplateMoviePage from "../components/templateMoviePage";
import MovieReview from "../components/movieReview";

const MovieReviewPage = (props) => {
  const { state : {movie, review } } = useLocation()
  return (
    <TemplateMoviePage movie={movie}>
      <MovieReview review={review} />
    </TemplateMoviePage>
  );
};

export default MovieReviewPage;


// ? jsx