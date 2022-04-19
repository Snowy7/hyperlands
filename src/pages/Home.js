import React from "react";
import UsernameForm from "../components/UsernameForm";

export default function Home({ username, setUsername }) {
  return (
    <div className="home">
      <UsernameForm username={username} setUsername={setUsername} />
    </div>
  );
}
