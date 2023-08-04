import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddTvShowToFavouritesIcon from '../components/cardIcons/addTvShowToFavourites'
import PageTemplate from "../components/templateTvShowListPage";


const TvShowListPage = ({ tvShowsData, tvShowsError, tvShowsLoading }) => {
  if (tvShowsLoading) {
    return <Spinner />;
  }
  if (tvShowsError) {
    return <h1>{tvShowsError.message}</h1>;
  }

  const tvShows = tvShowsData ? tvShowsData.results : [];

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
        title="Trending TV Shows this week!"
        tvShows={tvShows}
        action={(item) => {
          return <AddTvShowToFavouritesIcon item={item} />;
        }}
      />
    </div>
  );
};

export default TvShowListPage;
