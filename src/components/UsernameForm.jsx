import React from "react";
import { Link } from "react-router-dom";

const UsernameForm = ({
    username,
    setUsername,
    showStats,
    isLoading,
    inputRef,
}) => {
    return (
        <div className="usernameForm_container">
            <div className="usernameForm">
                <div className="form-title">
                    <h1>Statistics lookup</h1>
                </div>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        showStats();
                    }}
                >
                    <input
                        value={username}
                        ref={inputRef}
                        autoComplete="off"
                        id="username"
                        placeholder="Enter a username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </form>
                <div className="form-footer">
                    <Link to={`/stats/${username}`}>
                        <button onClick={showStats} disabled={isLoading}>
                            Search
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default UsernameForm;
