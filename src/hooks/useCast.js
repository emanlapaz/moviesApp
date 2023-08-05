import { useEffect, useState } from "react";
import {getPopularCasts} from '../api/tmdb-api'

const useCast = id => {
  const [cast, setCast] = useState(null);
  useEffect(() => {
    getPopularCasts(id).then(cast => {
      setCast(cast);
    });
  }, [id]);
  return [cast, setCast];
};

export default useCast
