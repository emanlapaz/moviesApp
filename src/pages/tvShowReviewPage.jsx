import React from "react";
import { useLocation } from "react-router-dom";
import TemplateTvShowPage from "../components/templateTvShowPage";
import TvShowReview from "../components/tvShowReview";

const TvShowReviewPage = (props) => {
  const { state : {tvShow, review } } = useLocation()
  return (
    <TemplateTvShowPage tvShow={tvShow}>
      <TvShowReview review={review} />
    </TemplateTvShowPage>
  );
};

export default TvShowReviewPage;


// ? jsx