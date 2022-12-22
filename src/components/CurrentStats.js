import React from "react";
import PropTypes from 'prop-types';
import cloudy from '../images/Cloudy.png';
import humidity from '../images/Humidity.png';
import fog from '../images/Fog.png';
import wind from '../images/Wind.png';

const CurrentStats = ({weatherData}) => {
  const currentCloudiness = weatherData? `${weatherData.current.clouds}%` : '';
  const currentHumidity = weatherData? `${weatherData.current.humidity}%` : '';
  const currentVisibility = weatherData? `${weatherData.current.visibility/1000}km` : '';
  const currentWindSpeed = weatherData? `${weatherData.current.wind_speed}m/s` : '';
  const currentWindDeg = weatherData? `${weatherData.current.wind_deg}°` : '';
  return (
    <div className="current-weather-stats">
      <div className="current-weather-stat">
        <img src={cloudy}/>
        <div>{currentCloudiness}</div>
      </div>
      <div className="current-weather-stat">
        <img src={humidity}/>
        <div>{currentHumidity}</div>
      </div>
      <div className="current-weather-stat">
        <img src={fog}/>
        <div>{currentVisibility}</div>
      </div>
      <div className="current-weather-stat">
        <img src={wind}/>
        <div className="current-wind-stats">
          <div>{currentWindSpeed}</div>
          <div>{currentWindDeg}</div>
        </div>
      </div>
    </div>
  );};

CurrentStats.propTypes = {
  weatherData: PropTypes.object.isRequired
};

export default CurrentStats;