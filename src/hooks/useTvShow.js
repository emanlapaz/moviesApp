import { useEffect, useState } from "react";
import {getTvShow} from '../api/tmdb-api'

const useTvShow = id => {
  const [tvShow, setTvShow] = useState(null);
  useEffect(() => {
    getTvShow(id).then(tvShow => {
      setTvShow(tvShow);
    });
  }, [id]);
  return [tvShow, setTvShow];
};

export default useTvShow


// change id to tvshow_id