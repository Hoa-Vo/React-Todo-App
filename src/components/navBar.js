import React from "react";
import "../css/navBar.css";
import { Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";

function NavBar() {
  return (
    <Navbar className="main" bg="primary" variant="dark">
      <Navbar.Brand href="#home">
        <PlaylistAddIcon></PlaylistAddIcon>ToDo
      </Navbar.Brand>
      <Nav className="justify-content-end">
        <Nav.Link href="#home">About me</Nav.Link>
        <Nav.Link href="#features">Github</Nav.Link>
        <Nav.Link href="#pricing">More app</Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default NavBar;
