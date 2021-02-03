import React, { useEffect, useState } from "react";
import "../css/taskBoard.css";
import cloudyImage from "../images/cloudy.png";

function WeatherCard() {
  const [status, setStatus] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [location, setLocation] = useState(null);
  const [decription, setDecription] = useState(null);
  const updateWeatherInfo = data => {
    setStatus(data.weather[0].main);
    setDecription(data.weather[0].description);
    setLocation(data.name + "," + data.sys.country);
    setTemperature(`${Math.round(parseFloat(data.main.temp) - 273.15)} °C `);
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
          <p className="text location">{location}</p>
          <p className="text temperature">{temperature}</p>
          <p className="text ">Decription: {decription}</p>
        </div>
        <div className="contain">
          <img src={cloudyImage} className="weather-img"></img>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
