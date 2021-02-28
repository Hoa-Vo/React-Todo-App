import React, { useState, useEffect } from "react";
import "../css/body.css";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import SideBar from "./sideBar";
import TaskBoard from "./taskBoard";
import CountDown from "./countDown";
import New from "./new";
import MonacoEditor from "./editor";

import { useMediaQuery } from "react-responsive";
import { SettingsInputAntennaTwoTone } from "@material-ui/icons";
function Body(props) {
  const [tabRole, setTabRole] = useState("taskboard");
  useEffect(() => {
    if (props.darkMode) {
      document.getElementById("body").style.backgroundColor = "#202020";
    } else {
      document.getElementById("body").style.backgroundColor = "white";
    }
  });

  const handleStateChange = index => {
    if (index === 0) {
      setTabRole("taskboard");
    } else if (index === 1) {
      setTabRole("news");
    } else if (index === 2) {
      setTabRole("countdown");
    } else {
      setTabRole("editor");
    }
  };
  return (
    <div id="body" className="main-body">
      <div className="row">
        <div className="col side-bar">
          <SideBar onChange={handleStateChange} darkMode={props.darkMode}></SideBar>
        </div>
        <div className="col-9">
          {tabRole === "taskboard" ? (
            <TaskBoard darkMode={props.darkMode}></TaskBoard>
          ) : tabRole === "news" ? (
            <New darkMode={props.darkMode}></New>
          ) : tabRole === "countdown" ? (
            <CountDown darkMode={props.darkMode}></CountDown>
          ) : (
            <MonacoEditor darkMode={props.darkMode}></MonacoEditor>
          )}
        </div>
      </div>
    </div>
  );
}

export default Body;
