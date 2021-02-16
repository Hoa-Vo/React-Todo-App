import React, { useState } from "react";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import Button from "@material-ui/core/Button";

function CountDown(props) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleDateChange = date => {
    setSelectedDate(date);
  };
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
    <div>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <p>Choose end day</p>
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          format="dd/MM/yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
      </MuiPickersUtilsProvider>
      <Button onClick={startCountDown} variant="contained" color="primary">
        START COUNT DOWN
      </Button>
      <div className="countdown-area">
        <p id="days"></p>
        <p id="hours"></p>
        <p id="min"></p>
        <p id="sec"></p>
      </div>
    </div>
  );
}
export default CountDown;
