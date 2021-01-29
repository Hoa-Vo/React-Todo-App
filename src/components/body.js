import React, { useState, useEffect } from "react";
import "../css/body.css";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import SideBar from "./sideBar";

function Body(props) {
  const [bgColor, setbgColor] = useState("white");
  useEffect(() => {
    if (props.darkMode) {
      setbgColor("black");
      document.getElementById("body").style.backgroundColor = bgColor;
    } else {
      setbgColor("white");
      document.getElementById("body").style.backgroundColor = bgColor;
    }
  });
  return (
    <div id="body" className="main-body">
      <div className="row">
        <div className="col">
          <SideBar></SideBar>
        </div>
        <div className="col-9"></div>
      </div>
    </div>
  );
}

export default Body;
