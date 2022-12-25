import React, {useState} from "react";
import PropTypes from 'prop-types';
import { WeatherImageMap } from "./WeatherImageMap";
import Popover from '@mui/material/Popover';

const HourlyForecastCard = ({hourData, tempUnit}) => {
  console.log();
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const time = new Date(hourData.dt * 1000).toLocaleString('en-GB', {hour:'numeric', minute: 'numeric', hourCycle: 'h12'});
  const weatherConditions = hourData.weather[0].main;
  const temperature = hourData.temp;
  const tempU = tempUnit === "metric" ? '°C' : '°F';
  const open = Boolean(anchorEl);

  const weatherDesc = hourData.weather[0].description;
  const cloudiness = hourData.clouds;
  const humidity = hourData.humidity;
  const visibility = hourData.visibility/1000;
  const windDeg = hourData.wind_deg;
  const windSpeed = hourData.wind_speed;

  console.log(open);

  return (
    <div>
      <div 
        className="hourly-forecast-card" 
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        <div className="forecast-datetime">{time}</div>
        <img className="forecast-card-img" src={WeatherImageMap[weatherConditions]}/>
        <div>{temperature}{tempU}</div>
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
              <div>Visibility: {visibility}km </div>
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

HourlyForecastCard.propTypes = {
  hourData: PropTypes.object.isRequired,
  tempUnit: PropTypes.string.isRequired
};

export default HourlyForecastCard;