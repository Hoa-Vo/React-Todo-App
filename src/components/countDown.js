import React, { useState } from "react";
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

function CountDown(props) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const inputColor = props.darkMode ? "white" : "black";
  const handleDateChange = date => {
    setSelectedDate(date);
  };
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
  const startCountDown = () => {
    try {
      let now = new Date();
      let currentTime = now.getTime();
      let eventTime = selectedDate.getTime();
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
      document.getElementById("days").innerText = d;
      document.getElementById("hours").innerText = h;
      document.getElementById("min").innerText = m;
      document.getElementById("sec").innerText = s;
      setInterval(startCountDown, 1000);
    } catch {}
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
            id="task-content"
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
            onClick={startCountDown}
            variant="contained"
            color="primary"
          >
            START COUNT DOWN
          </Button>
          <div className="countdown-area">
            <p id="days"></p>
            <p id="hours"></p>
            <p id="min"></p>
            <p id="sec"></p>
          </div>
        </div>
      </div>
      <div className="col">
        <h4>All Events</h4>
        <div>
          <Card className={classes.card}>
            <CardContent>
              <p>Test</p>
            </CardContent>
          </Card>
          <Card className={classes.card}>
            <CardContent>
              <p>Test</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
export default CountDown;
