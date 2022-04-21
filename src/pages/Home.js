import React from "react";
import UsernameForm from "../components/UsernameForm";
import { Alert, AlertTitle } from "@mui/material";

export default function Home({ error, username, setUsername }) {
  return (
    <div className="home">
      <UsernameForm username={username} setUsername={setUsername} />
      {error && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      )}
    </div>
  );
}
