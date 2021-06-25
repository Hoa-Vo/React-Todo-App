/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';

import cloudyImage from '../images/cloudy.png';
import '../css/taskBoard.css';

function WeatherCard(props) {
   const [temperature, setTemperature] = useState(null);

   const [location, setLocation] = useState(null);

   const [decryption, setDecryption] = useState(null);

   const textColor = props.darkMode ? 'white' : 'black';

   const useStyle = makeStyles({
      text: {
         color: textColor,
      },
   });

   const classes = useStyle();

   const updateWeatherInfo = data => {
      setDecryption(data.weather[0].description);
      setLocation(data.name + ',' + data.sys.country);
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
   }, []);

   return (
      <div>
         <div className="header">
            <h4 className={classes.text}>Weather</h4>
         </div>
         <div className="status">
            <div className="contain">
               <p className={classes.text} id="location">
                  {location}
               </p>
               <p className={classes.text} id=" temperature">
                  {temperature}
               </p>
               <p className={classes.text}>Decryption: {decryption}</p>
            </div>
            <div className="contain">
               <img src={cloudyImage} className="weather-img"></img>
            </div>
         </div>
      </div>
   );
}

export default WeatherCard;
