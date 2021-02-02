import React, { useEffect, useState } from "react";
import "../css/taskBoard.css";
import cloudyImage from "../images/cloudy.png";

function WeatherCard() {
  const [status, setStatus] = useState(null);
  const updateWeatherInfo = data => {
    setStatus(data.weather[0].main);
    document.querySelector(".weather-status").innerHTML = status;
    document.querySelector(".location").innerHTML = data.name + "," + data.sys.country;
    document.querySelector(".temperature").innerHTML = `${Math.round(
      parseFloat(data.main.temp) - 273.15
    )} &#186C `;
  };
  useEffect(() => {
    let longitude, latitude;
    navigator.geolocation.getCurrentPosition(res => {
      longitude = res.coords.longitude;
      latitude = res.coords.latitude;
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=a17391360b374134d5b0e6b62e80f2f6`
      )
        .then(res => res.json())
        .then(data => {
          updateWeatherInfo(data);
        });
    });
  });
  return (
    <div className="weather-info ">
      <div className="header">
        <h4 className="text">Weather</h4>
      </div>
      <div className="status">
        <div className="contain">
          <p className="text location"></p>
          <p className="text temperature"></p>
        </div>
        <div className="contain">
          <span className="text weather-status"></span>
          <img src={cloudyImage} className="weather-img"></img>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
