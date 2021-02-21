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
import Tooltip from "@material-ui/core/Tooltip";
const storage = JSON.parse(localStorage.getItem("tasks"));
let items, flag;
if (storage === null) {
  const tasks = { items: [] };
  localStorage.setItem("tasks", JSON.stringify(tasks));
  items = [];
  flag = 0;
} else {
  items = storage.items;
  if (items.length) {
    flag = 1;
  } else {
    flag = 0;
  }
}
function MainTaskBoard(props) {
  const inputColor = props.darkMode ? "white" : "black";
  const [status, setStatus] = useState(flag);
  const [taskArr, setTaskArr] = useState(items);
  const cardBg = props.darkMode ? "#2a2a2a" : "#f9f9f9";
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
    if (taskArr.length === 0) {
      setStatus(0);
    }
    const tasks = {
      items: taskArr,
    };
    localStorage.setItem("tasks", JSON.stringify(tasks));
    items = JSON.parse(localStorage.getItem("tasks")).items;
  }, [taskArr]);

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
    text: {
      color: inputColor,
    },
    card: {
      backgroundColor: cardBg,
      height: "100vh",
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
  const childComponentChange = finishedTask => {
    const todoIndex = taskArr.indexOf(finishedTask);
    setTaskArr(taskArr => taskArr.filter((_, index) => index !== todoIndex));
  };
  if (status === 0) {
    mainContent = (
      <div className="empty-info">
        <img className="sunbed-image" src={sunbed}></img>
        <p className={classes.text} id="nofitication">
          No task for today?
        </p>
        <p className={classes.text} id="hints ">
          Add somework todo
        </p>
      </div>
    );
  } else {
    mainContent = (
      <ExistTask
        onChange={childComponentChange}
        darkMode={props.darkMode}
        taskArr={taskArr}
      ></ExistTask>
    );
  }
  return (
    <div className="container">
      <div className="row main-empty-task">
        <div className="row">
          <div className="col-8">
            <div className="time-info">
              <h4 className={classes.text}>Today</h4>
              <span className={classes.text}>
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
          <div className={`col ${classes.card}`}>
            <WeatherCard darkMode={props.darkMode}></WeatherCard>
            <Quote darkMode={props.darkMode}></Quote>
          </div>
        </div>
      </div>
    </div>
  );
}

function ExistTask(props) {
  const lableColor = props.darkMode ? "white" : "black";
  const useStyles = makeStyles({
    text: {
      color: lableColor,
      marginBottom: "0px",
    },
  });
  const CustomRadio = withStyles({
    root: {
      color: lableColor,
      "&$checked": {
        color: lableColor,
      },
    },
    checked: {},
  })(Radio);
  const classes = useStyles();
  const taskList = props.taskArr.map(task => (
    <div>
      <Tooltip title="Mark finished">
        <FormControlLabel
          value={task}
          control={<CustomRadio></CustomRadio>}
          label={<p className={classes.text}>{task}</p>}
        />
      </Tooltip>
    </div>
  ));
  const handleTaskChange = event => {
    props.onChange(event.target.value);
  };
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">
        <p className={classes.text}>All tasks</p>
      </FormLabel>
      <RadioGroup onChange={handleTaskChange} aria-label="tasks" name="customized-radios">
        {taskList}
      </RadioGroup>
    </FormControl>
  );
}
function TaskBoard(props) {
  return (
    <div className="container">
      <div className="row">
        <MainTaskBoard darkMode={props.darkMode}></MainTaskBoard>
      </div>
    </div>
  );
}

export default TaskBoard;
