import React, { useEffect, useState } from "react";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import Button from "@material-ui/core/Button";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import "../css/countdown.css";
import { Card, CardActions, CardContent } from "@material-ui/core";
import { Context } from "react-responsive";
import confetti from "../images/confetti.png";
let events = JSON.parse(localStorage.getItem("events"));
let flag;
if (events === null) {
  const temp = [];
  localStorage.setItem("events", JSON.stringify(temp));
  events = [];
  flag = 0;
} else {
  if (events.length) {
    flag = 1;
  } else {
    flag = 0;
  }
}
function Events(props) {
  let content;
  const useStyles = makeStyles({
    card: {
      margin: "10px 10px 10px 0px",
      padding: "20px",
    },
  });
  const classes = useStyles();
  const startCountDown = () => {
    try {
      for (const event of props.allEvents) {
        let now = new Date();
        let eventDate = new Date(event.endDay);
        let currentTime = now.getTime();
        let eventTime = eventDate.getTime();
        let remainTime = eventTime - currentTime;
        let s = Math.floor(remainTime / 1000);
        let m = Math.floor(s / 60);
        let h = Math.floor(m / 60);
        let d = Math.floor(h / 24);
        h %= 24;
        m %= 60;
        s %= 60;
        h = h < 10 ? "0" + h : h;
        m = m < 10 ? "0" + m : m;
        s = s < 10 ? "0" + s : s;
        document.getElementById(`${event.name}-day`).innerText = `${d} days`;
        document.getElementById(`${event.name}-hour`).innerText = `${h} hours`;
        document.getElementById(`${event.name}-min`).innerText = `${m} mins`;
        document.getElementById(`${event.name}-sec`).innerText = `${s} seconds`;
      }
    } catch {}
  };
  useEffect(() => {
    setInterval(startCountDown, 1000);
  });
  if (props.allEvents.length) {
    content = props.allEvents.map(event => (
      <Card className={classes.card}>
        <div>
          <p className="event-title">{event.name}</p>
          <span className="event-time" id={`${event.name}-day`}></span>
          <span>:</span>
          <span className="event-time" id={`${event.name}-hour`}></span>
          <span>:</span>
          <span className="event-time" id={`${event.name}-min`}></span>
          <span>:</span>
          <span className="event-time" id={`${event.name}-sec`}></span>
        </div>
      </Card>
    ));
  } else {
    content = (
      <div className="empty-event-main">
        <img className="empty-event-img" src={confetti}></img>
        <p id="nofitication">Seem like there are no event ?</p>
        <p id="hints ">Add some event</p>
      </div>
    );
  }
  return <div>{content}</div>;
}
function CountDown(props) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [allEvents, setAllEvents] = useState(events);
  const inputColor = props.darkMode ? "white" : "black";
  const handleDateChange = date => {
    setSelectedDate(date);
  };
  useEffect(() => {
    console.log("set event in effect 1");
    localStorage.setItem("events", JSON.stringify(allEvents));
    events = JSON.parse(localStorage.getItem("events"));
  }, [allEvents]);
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
    button: {
      width: "200px",
      marginTop: "40px",
    },
    picker: {
      width: "200px",
      marginBottom: "40px",
    },
    card: {
      margin: "20px 20px 20px 0px",
    },
  });
  const classes = useStyles();
  const addEvents = () => {
    const eventName = document.getElementById("event-name").value;
    const items = {
      name: eventName,
      endDay: selectedDate,
    };
    setAllEvents(allEvents => [...allEvents, items]);
  };
  return (
    <div className="row">
      <div className="col">
        <div className="main-countdown">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <h4>Add Event</h4>
            <KeyboardDatePicker
              className={classes.picker}
              disableToolbar
              variant="inline"
              margin="normal"
              id="date-picker-inline"
              format="dd/MM/yyyy"
              value={selectedDate}
              onChange={handleDateChange}
              label="Choose end day"
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
          <CustomTextField
            id="event-name"
            variant="outlined"
            label="Event name"
            InputProps={{
              className: classes.input,
            }}
            InputLabelProps={{
              className: classes.lable,
            }}
          ></CustomTextField>
          <Button
            className={classes.button}
            onClick={addEvents}
            variant="contained"
            color="primary"
          >
            START COUNT DOWN
          </Button>
        </div>
      </div>
      <div className="col">
        <h4>All Events</h4>
        <div>
          <Events allEvents={allEvents}></Events>
        </div>
      </div>
    </div>
  );
}
export default CountDown;
