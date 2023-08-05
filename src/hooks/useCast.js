import { useEffect, useState } from "react";
import {getCast} from '../api/tmdb-api'

const useCast = id => {
  const [cast, setCast] = useState(null);
  useEffect(() => {
    getCast(id).then(cast => {
      setCast(cast);
    });
  }, [id]);
  return [cast, setCast];
};

export default useCast
