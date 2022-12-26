import React, {useState} from "react";
import PropTypes from 'prop-types';
import { WeatherImageMap } from "./WeatherImageMap";
import Popover from '@mui/material/Popover';

const DailyForecastCard = ({dailyData, tempUnit}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const date = new Date(dailyData.dt * 1000).toLocaleString('en-GB', {day: 'numeric', month: 'numeric'});
  const weatherConditions = dailyData.weather[0].main;
  const tempMax = dailyData.temp.max.toFixed(1);
  const tempMin = dailyData.temp.min.toFixed(1);
  const tempU = tempUnit === "metric" ? '°C' : '°F';
  const open = Boolean(anchorEl);

  const weatherDesc = dailyData.weather[0].description;
  const cloudiness = dailyData.clouds;
  const humidity = dailyData.humidity;
  const windDeg = dailyData.wind_deg;
  const windSpeed = dailyData.wind_speed;


  return (
    <div>
      <div 
        className="hourly-forecast-card" 
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        <div className="forecast-datetime">{date}</div>
        <img className="forecast-card-img" src={WeatherImageMap[weatherConditions]}/>
        <div className="forecast-card-temperatures">
          <div>{tempMax}{tempU}</div>
          <div className="forecast-card-temperature-min">{tempMin}{tempU}</div>
        </div>
      </div>
      <Popover
        sx={{
          pointerEvents: 'none',
          opacity: '50%',
          boxShadow: '0'
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus>
        <div className="hourly-forecast-popover">
          <div className="hourly-forecast-description">{weatherDesc}</div>
          <div className="hourly-forecast-popover-stats">
            <div className='hourly-forecast-popover-stats-column'>
              <div>Cloudiness: {cloudiness}%</div>
              <div>Humidity: {humidity}%</div>
            </div>
            <div>
              Wind:
              <ul>
                <li>Degree: {windDeg}°</li>
                <li>Speed: {windSpeed}m/s</li>
              </ul>
            </div>
          </div>
        </div>
      </Popover>
    </div>
  );
}; 

DailyForecastCard.propTypes = {
  dailyData: PropTypes.object.isRequired,
  tempUnit: PropTypes.string.isRequired
};

export default DailyForecastCard;