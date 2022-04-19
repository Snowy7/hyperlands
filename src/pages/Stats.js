import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Stats({ username, error, setError }) {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getStats = async () => {
    setError(null);
    if (username.length <= 0) {
      setIsLoading(false);
      setError("Please enter a username!");
    } else {
      window.history.replaceState(
        { pathname: username },
        `${username} Stats`,
        `/${username}`
      );
      try {
        const response = await axios.get(
          `https://immediate-iodized-cockatoo.glitch.me/stats/${username}`
        );
        const data = await response.data;
        if (data.hasOwnProperty("error")) {
          setError(data.error);
          console.log(data.error);
        } else {
          console.log(data);
          setStats(data);
        }
        setIsLoading(false);
      } catch (err) {
        setError(err);
        console.log(err);
      }
    }
  };

  useEffect(() => {
    getStats();
  }, []);

  return <div></div>;
}
