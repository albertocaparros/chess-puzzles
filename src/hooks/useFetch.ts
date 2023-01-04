import axios from 'axios';
import { useEffect, useState } from 'react';

function useFetch(url: string) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    axios
      .get(url, {
        headers: {
          'X-RapidAPI-Key': import.meta.env.VITE_CHESS_API_KEY,
          'X-RapidAPI-Host': 'chess-puzzles.p.rapidapi.com',
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url]);

  console.log(data);
  return { data, loading, error };
}

export default useFetch;
