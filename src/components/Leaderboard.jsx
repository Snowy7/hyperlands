import React, { useEffect, useState } from "react";
import { DataGrid, } from '@mui/x-data-grid';
import { useParams } from 'react-router-dom';
import { Backdrop, CircularProgress } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const Leaderboard = ({ leaderboards, data, title }) => {
    const navigate = useNavigate();
    const location = useLocation()
    let { id } = useParams();
    const [rows, setRows] = useState([]);
    const [ready, setReady] = useState(false);

    const columns = [
        { field: 'id', headerName: 'Rank', flex: 0.3 },
        { field: 'name', headerName: 'Name', flex: 1 },
        { field: 'score', headerName: 'Score', flex: 0.5 },
    ];

    const onRowClick = (params, event, details) => {
        navigate(`/stats/${params.row.name}`);
    }

    const refreshLeaderboard = () => {
        if (leaderboards && leaderboards.length > 0) {
            let testRows = [];
            let i = 1;
            leaderboards.find((x) => x.id === id).data.forEach(row => {
                testRows.push({
                    id: i,
                    name: row[0],
                    score: row[1]
                });
                i++;
            });
            setRows(testRows);
            setReady(true);
        }
    }

    useEffect(() => {
        refreshLeaderboard();
    }, [leaderboards, location]);
    return (
        <>
            {ready ? (
                <div className="leaderboard_container">
                    <div className="leaderboard blur">
                        <DataGrid onRowClick={(params, event, details) => { onRowClick(params, event, details) }} rowsPerPageOptions={[]} autoPageSize={true} rows={rows} columns={columns} />
                    </div>
                </div>
            ) : (
                <Backdrop
                    sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={true}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            )}
        </>
    );
};

export default Leaderboard;
