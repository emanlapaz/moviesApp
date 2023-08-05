import React from "react";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { Link } from "react-router-dom";

const WriteCastReviewIcon = ({ cast }) => {
  return (
    <Link
      to={'/reviews/form'}
      state={{
          castId: cast.id,
        }}
    >
      <RateReviewIcon color="primary" fontSize="large" />
    </Link>
  );
};

export default WriteCastReviewIcon;
