import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Stats from "./pages/Stats";
import axios from "axios";
import Leaderboard from "./components/Leaderboard";

function App() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);
  const [leaderboards, setLeaderboards] = useState([]);

  const getLeaderboards = async () => {
    const response = await axios.get(
      `https://sulky-alluring-diploma.glitch.me/leaderboards`
    );
    let data = await response.data;
    data = JSON.parse(JSON.stringify(data));
    if (data.hasOwnProperty("error")) {
      setError(data.error);
    } else {
      let arr = Array.from(response.data);
      Object.keys(response.data).map((champs) => {
        let obj = response.data[champs];
        obj.id = champs;
        if (!champs.includes("spleef")) arr.push(obj);
      });
      setLeaderboards(arr);
    }
  };

  useEffect(() => {
    const onPageLoad = () => {
      getLeaderboards();
    };

    // Check if the page has already loaded
    if (document.readyState === "complete") {
      onPageLoad();
    } else {
      window.addEventListener("load", onPageLoad);
      // Remove the event listener when component unmounts
      return () => window.removeEventListener("load", onPageLoad);
    }
  }, []);

  return (
    <div className="App">
      <Header
        leaderboards={leaderboards}
        username={username}
        setUsername={setUsername}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home error={error} username={username} setUsername={setUsername} />
          }
        ></Route>
        <Route
          path="/stats/:name"
          element={
            <Stats
              username={username}
              setUsername={setUsername}
              error={error}
              setError={setError}
            />
          }
        ></Route>
        <Route
          path="/leaderboards/:id"
          element={<Leaderboard leaderboards={leaderboards} />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
