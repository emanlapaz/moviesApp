import React from "react";
import { useLocation } from "react-router-dom";
import TemplateTvShowPage from "../components/templateTvShowPage";
import TvShowReview from "../components/tvShowReview";

const TvShowReviewPage = (props) => {
  const { state : {tvShow, review } } = useLocation()
  return (
    <PageTemplate tvShow={tvShow}>
      <TvShowReview review={review} />
    </PageTemplate>
  );
};

export default TvShowReviewPage;
