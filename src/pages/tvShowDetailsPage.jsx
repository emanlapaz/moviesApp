import React from "react";
import { useParams } from "react-router-dom";
import TvShowDetails from "../components/tvShowDetails";
import PageTemplate from "../components/templateTvShowPage";
import useTvShow from "../hooks/useTvShow";
import { getTvShow } from '../api/tmdb-api'
import { useQuery } from "react-query";
import Spinner from '../components/spinner'


const TvShowDetailsPage = () => {
  const { id } = useParams();

  const { data: tvShow, error, isLoading, isError } = useQuery(
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
    <div
    style={{
      backgroundImage: 'url("/src/images/pexels-dziana-hasanbekava-5480827.jpg")',
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      minHeight: "100vh",
    }}
  >
      {tvShow ? (
        <>
          <PageTemplate tvShow={tvShow}>
            <TvShowDetails tvShow={tvShow} />
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for Tv Show details</p>
      )}
   </div>
  );
};

export default TvShowDetailsPage;
