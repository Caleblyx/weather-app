import React from "react";
import PropTypes from 'prop-types';
import HourlyForecastCard from "./HourlyForecastCard";
import uniqid from 'uniqid';
import DailyForecastCard from "./DailyForecastCard";

const Forecast = ({weatherData, tempUnit, forecastType, setForecastType}) => {

  const hourlyData = weatherData ? weatherData.hourly : [];
  const dailyData = weatherData ? weatherData.daily: [];

  const hourlyDataCards = hourlyData.map(
    hourData => <HourlyForecastCard key={uniqid()} hourData={hourData} tempUnit={tempUnit}/>
  );

  const dailyDataCards = dailyData.map(
    dailyData => <DailyForecastCard key={uniqid()} dailyData={dailyData} tempUnit={tempUnit}/>
  );

  const forecastMap = {
    'hourly' : hourlyDataCards,
    'daily' : dailyDataCards
  };
    
  const hourlyClass = forecastType === "hourly" ? 'forecast-type-selected' : 'forecast-type-unselected';
  const dailyClass = forecastType === "daily" ? 'forecast-type-selected' : 'forecast-type-unselected';
  return (
    <div>
      <div className = "forecast-selector"> 
        <div className={hourlyClass} onClick={() => {setForecastType('hourly');}}>Hourly</div>
        <div> | </div>
        <div className={dailyClass} onClick={()=> {setForecastType('daily');}}> Daily </div>
        <div> forecast </div>
      </div>
      <div className="forecast-cards">
        {forecastMap[forecastType]}
      </div>
    </div>
  );
};

Forecast.propTypes = {
  weatherData: PropTypes.object.isRequired,
  tempUnit: PropTypes.string.isRequired,
  forecastType: PropTypes.string.isRequired,
  setForecastType: PropTypes.func.isRequired
};

export default Forecast;