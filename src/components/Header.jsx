import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from '@mui/material/styles';
import { Navbar, Container, Nav, NavDropdown, Form, FormControl, Button } from "react-bootstrap";
import logo from "../images/logo2.png";
import { Link, useNavigate, useLocation } from "react-router-dom";


export default function Header({ stats, username, setUsername, leaderboards }) {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <Navbar className="bg-dark" variant="dark" expand="lg" fixed="top" >
            <Container fluid>
                <Navbar.Brand style={{ cursor: "pointer" }} onClick={() => {
                    navigate('/');
                }}>
                    <img src={logo} width="143" height="50" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="mx-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <NavDropdown title="Leaderboards" id="navbarScrollingDropdown">
                            {leaderboards ? [

                                leaderboards.map((leaderboard, index) => (
                                    <NavDropdown.Item key={index} onClick={() => {
                                        navigate(`/leaderboards/${leaderboard.id}`);
                                    }}>
                                        {leaderboard.name}
                                    </NavDropdown.Item>

                                ))

                            ] : <NavDropdown.Item>Loading....</NavDropdown.Item>
                            }
                        </NavDropdown>
                    </Nav>
                    {location.pathname !== '/' && (
                        <Form className="d-flex" onSubmit={
                            (e) => {
                                e.preventDefault();
                                navigate(`/stats/${username}`);
                            }
                        }>
                            <FormControl
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                value={username}
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        navigate(`/stats/${username}`);
                                    }
                                }}
                            />
                            <Button variant="outline-info">Search</Button>
                        </Form>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
}
