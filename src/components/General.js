import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const General = ({city}) => {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(()=>setDateTime(new Date()), 1000);
    return () => {
      clearInterval(timer);
    };
  });

  const currentDay = dateTime.toLocaleString('en-GB', {weekday: "long"});
  const currentDate = dateTime.toLocaleString('en-GB', {day: "numeric", month: "long", year: "numeric"});
  const currentTime = dateTime.toLocaleString('en-GB', {hour: "numeric", minute: "numeric", hour12: true});
  return (
    <div className="location-datetime">
      <div className="location">{city}</div>
      <div className="day">{currentDay}</div>
      <div className="datetime">
        <div>{currentDate}</div>
        <div>{currentTime}</div>
      </div>
    </div>
  );
};

General.propTypes = {
  city: PropTypes.string.isRequired,
};

export default General;