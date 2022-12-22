import React from 'react';
import PropTypes from 'prop-types';
const Temperature = ({weatherData,tempUnit, setTempUnit}) => {
  const celciusClass = tempUnit === "metric" ? 'temp-unit-selected' : 'temp-unit-unselected';
  const farenheitClass = tempUnit === "imperial" ? 'temp-unit-selected' : 'temp-unit-unselected';
  const currentTemp = weatherData ? weatherData.current.temp : '';
  return (
    <div className="temperature">
      <div>{currentTemp}</div>
      <div className={celciusClass} onClick={() => setTempUnit("metric")}>°C</div>
      <div className="temp-unit-divider"> | </div>
      <div className={farenheitClass} onClick={() => setTempUnit("imperial")}>°F</div>
    </div>
  );
};

Temperature.propTypes = {
  weatherData: PropTypes.object.isRequired,
  tempUnit: PropTypes.string.isRequired,
  setTempUnit: PropTypes.func.isRequired
};

export default Temperature;