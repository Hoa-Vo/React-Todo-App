import { Fab, TextField } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import "../css/taskBoard.css";
import { Add } from "@material-ui/icons";

function EmptyTaskBoard(props) {
  const inputColor = props.darkMode ? "white" : "black";
  console.log(inputColor);
  let CustomTextField;
  if (!props.darkMode) {
    CustomTextField = withStyles({
      root: {
        width: "500px",
        marginRight: "20px",
      },
    })(TextField);
  } else {
    CustomTextField = withStyles({
      root: {
        width: "500px",
        marginRight: "20px",

        "& label.Mui-focused": {
          color: "white",
        },
        "& .MuiInput-underline:after": {
          borderBottomColor: "pink",
        },
        "& .MuiOutlinedInput-root": {
          color: "white",
          "& fieldset": {
            borderColor: "white",
          },
          "&:hover fieldset": {
            borderColor: "white",
          },
          "&.Mui-focused fieldset": {
            borderColor: "pink",
          },
        },
      },
    })(TextField);
  }
  useEffect(() => {
    const elements = document.querySelectorAll(".text");
    for (const element of elements) {
      if (props.darkMode) {
        element.style.color = "white";
      } else {
        element.style.color = "black";
      }
    }
  });
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const currentDate = new Date();
  const date = currentDate.getDate();
  const day = days[currentDate.getDay() - 1];
  const month = months[currentDate.getMonth()];
  const useStyles = makeStyles({
    input: {
      color: inputColor,
    },
    lable: {
      color: inputColor,
    },
  });
  const classes = useStyles();
  return (
    <div className="container">
      <div className="row main-empty-task">
        <div className="time-info">
          <h4 className="text">Today</h4>
          <span className="text">
            {day} {date} {month}
          </span>
        </div>
        <div className="add-task">
          <CustomTextField
            variant="outlined"
            label="Add New Task"
            InputProps={{
              className: classes.input,
            }}
            InputLabelProps={{
              className: classes.lable,
            }}
          ></CustomTextField>
          <Fab size="small" color="primary" aria-label="add">
            <Add />
          </Fab>
        </div>
      </div>
    </div>
  );
}

function TaskBoard(props) {
  const [currentTask, setcurrentTask] = useState(null);
  return (
    <div className="container">
      <div className="row">
        <EmptyTaskBoard darkMode={props.darkMode}></EmptyTaskBoard>
      </div>
    </div>
  );
}

export default TaskBoard;
