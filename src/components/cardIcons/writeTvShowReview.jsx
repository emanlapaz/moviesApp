import React from "react";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { Link } from "react-router-dom";

const WriteTvShowReviewIcon = ({ tvShow }) => {
  return (
    <Link
      to={'/reviews/form'}
      state={{
          movieId: tvShow.id,
        }}
    >
      <RateReviewIcon color="primary" fontSize="large" />
    </Link>
  );
};

export default WriteTvShowReviewIcon;
