import React from "react";
import { useParams } from "react-router-dom";
import CastDetails from "../components/castDetails";
import PageTemplate from "../components/templateCastPage";
import useCast from "../hooks/useCast";
import { getCast } from '../api/tmdb-api';
import { useQuery } from "react-query";
import Spinner from '../components/spinner';

const CastDetailsPage = () => {
  const { id } = useParams();

  const { data: cast, error, isLoading, isError } = useQuery(
    ["cast", { id: id }],
    getCast
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
      {cast ? (
        <>
          <PageTemplate cast={cast}>
            <MovieDetails cast={cast} />
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for cast details</p>
      )}
    </div>
  );
};

export default CastDetailsPage;
