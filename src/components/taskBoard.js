import { Fab, TextField } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import "../css/taskBoard.css";
import { Add } from "@material-ui/icons";
import sunbed from "../images/sunbed.png";
import WeatherCard from "./weather";
import Quote from "./quote";

function MainTaskBoard(props) {
  const inputColor = props.darkMode ? "white" : "black";
  const [status, setStatus] = useState(0);
  const [taskArr, setTaskArr] = useState([]);
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
          borderBottomColor: "white",
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
            borderColor: "white",
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
  const addNewTaskClick = () => {
    const content = document.getElementById("task-content").value;
    if (content !== "") {
      setStatus(1);
      setTaskArr(taskArr => [...taskArr, content]);
    }
  };
  let mainContent;
  if (status === 0) {
    mainContent = (
      <div className="empty-info">
        <img className="sunbed-image" src={sunbed}></img>
        <p className="nofitication text">No task for today?</p>
        <p className="hints text">Add somework todo</p>
      </div>
    );
  } else {
    mainContent = <ExistTask taskArr={taskArr}></ExistTask>;
  }
  return (
    <div className="container">
      <div className="row main-empty-task">
        <div className="row">
          <div className="col-8">
            <div className="time-info">
              <h4 className="text">Today</h4>
              <span className="text">
                {day} {date} {month}
              </span>
            </div>
            <div className="add-task">
              <CustomTextField
                id="task-content"
                variant="outlined"
                label="Add New Task"
                InputProps={{
                  className: classes.input,
                }}
                InputLabelProps={{
                  className: classes.lable,
                }}
              ></CustomTextField>
              <Fab onClick={addNewTaskClick} size="small" color="primary" aria-label="add">
                <Add />
              </Fab>
            </div>
            <div className="main-content">{mainContent}</div>
          </div>
          <div className="col weather-card">
            <WeatherCard></WeatherCard>
            <Quote></Quote>
          </div>
        </div>
      </div>
    </div>
  );
}

function ExistTask(props) {
  const [currentTask, setCurrentTask] = useState("");
  const unCheckTask = event => {
    if (currentTask === event.target.value) {
      setCurrentTask("");
    }
  };
  const taskList = props.taskArr.map(task => (
    <FormControlLabel
      value={task}
      control={<Radio onClick={unCheckTask} color="primary" />}
      label={task}
    />
  ));
  const handleTaskChange = event => {
    setCurrentTask(event.target.value);
  };
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Tasks</FormLabel>
      <RadioGroup
        value={currentTask}
        onChange={handleTaskChange}
        aria-label="tasks"
        name="customized-radios"
      >
        {taskList}
      </RadioGroup>
    </FormControl>
  );
}
function TaskBoard(props) {
  const [currentTask, setcurrentTask] = useState(null);
  return (
    <div className="container">
      <div className="row">
        <MainTaskBoard darkMode={props.darkMode}></MainTaskBoard>
      </div>
    </div>
  );
}

export default TaskBoard;
