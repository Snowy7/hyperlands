import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Stats from "./pages/Stats";

function App() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route
          path="/"
          element={<Home username={username} setUsername={setUsername} />}
        ></Route>
        <Route
          path="/stats/:name"
          element={
            <Stats username={username} error={error} setError={setError} />
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
