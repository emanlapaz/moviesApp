import React from "react";
import { useParams } from "react-router-dom";
import TvShowDetails from "../components/tvShowDetails";
import TemplateTvShowPage from "../components/templateTvShowPage";
import useTvShow from "../hooks/useTvShow";
import { getTvShow } from '../api/tmdb-api'
import { useQuery } from "react-query";
import Spinner from '../components/spinner'


const TvShowDetailsPage = () => {
  const { id } = useParams();

  const { data: movie, error, isLoading, isError } = useQuery(
    ["tvShow", { id: id }],
    getTvShow
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  return (
    <>
      {tvShow ? (
        <>
          <TemplateTvShowPage tvShow={tvShow}>
            <TvShowDetails tvShow={tvShow} />
          </TemplateTvShowPage>
        </>
      ) : (
        <p>Waiting for Tv Show details</p>
      )}
    </>
  );
};

export default TvShowDetailsPage;


// recheck original for the useMovie