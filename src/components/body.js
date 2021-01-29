import React from "react";
import "../css/body.css";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import SideBar from "./sideBar";

function Body() {
  return (
    <div className="main-body">
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
