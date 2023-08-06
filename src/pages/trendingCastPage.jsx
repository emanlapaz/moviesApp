import React from "react";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import PageTemplate from "../components/templateCastListPage";

const CastsListPage = ({ castsData, castsError, castsLoading }) => {
  if (castsLoading) {
    return <Spinner />;
  }
  if (castsError) {
    return <h1>{castsError.message}</h1>;
  }

  const casts = castsData ? castsData.results : [];

  return (
    <div
      style={{
        backgroundImage: 'url("/src/images/pexels-dziana-hasanbekava-5480827.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <PageTemplate
        title="Trending People this week!"
        casts={casts}     
      />
    </div>
  );
};

export default CastsListPage;
