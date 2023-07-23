import SiteHeader from './components/siteHeader'
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes, Link } from "react-router-dom";
import HomePage from "./pages/moviePage";
import MovieDetailPage from "./pages/movieDetailsPage";
import TvShowDetailPage from "./pages/tvShowDetailsPage";
import FavouriteMoviesPage from "./pages/favouriteMoviesPage"; 
import FavouriteTvShowsPage from "./pages/favouriteTvShowsPage"; // NEW
import MovieReviewPage from "./pages/movieReviewPage";
import TvShowReviewPage from "./pages/tvShowReviewPage";
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import TvShowPage from "./pages/tvShowPage";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'
import ContextProvider from "./contexts/Context";
import AddMovieReviewPage from './pages/addMovieReviewPage'
import AddTvShowReviewPage from './pages/addTvShowReviewPage'


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});



const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <SiteHeader />
        <ContextProvider>
      <Routes>
        <Route path="/movies/favourites" element={<FavouriteMoviesPage />} />
        <Route path="/tvShows/favourites" element={<FavouriteTvShowsPage />} />
        <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
        <Route path="/movies/:id" element={<MovieDetailPage />} />
        <Route path="/tvShows/:id" element={<TvShowDetailPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/movieReviews/:id" element={<MovieReviewPage/>} />
        <Route path="/movieReviews/form" element={<AddMovieReviewPage/>} />
        <Route path="/tvShowReviews/:id" element={<TvShowReviewPage/>} />
        <Route path="/tvShowReviews/form" element={<AddTvShowReviewPage/>} />
        <Route path="/tvShows" element={<TvShowPage />} />  
      </Routes>
      </ContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

const rootElement = createRoot(document.getElementById("root"));
rootElement.render(<App />);


// tv to tvshow??
// movie contect provider to context provider