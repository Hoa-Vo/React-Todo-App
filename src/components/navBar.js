import React, { useState } from "react";
import "../css/navBar.css";
import { Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import { FormControlLabel, FormGroup, Switch, withStyles } from "@material-ui/core";

const AntSwitch = withStyles(theme => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: "flex",
  },
  switchBase: {
    padding: 2,
    color: "#000000",
    "&$checked": {
      transform: "translateX(12px)",
      color: theme.palette.common.white,
      "& + $track": {
        opacity: 1,
        backgroundColor: "#4ee44e",
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: "none",
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}))(Switch);

function NavBar(props) {
  const [darkmode, setDarkMode] = useState(false);
  const handleChange = event => {
    setDarkMode(!darkmode);
    props.onChange(darkmode);
  };
  return (
    <Navbar className="main" bg="primary" variant="dark">
      <Navbar.Brand href="/">
        <PlaylistAddIcon></PlaylistAddIcon>ToDo
      </Navbar.Brand>
      <Nav className="justify-content-end main-nav-bar">
        <p className="darkmode-p">DarkMode</p>
        <AntSwitch onChange={handleChange} name="darkmode" />
      </Nav>
    </Navbar>
  );
}

export default NavBar;
