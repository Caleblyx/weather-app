import React, { useEffect, useState } from 'react';
import General from './General';
import Temperature from './Temperature';
import CurrentStats from './CurrentStats';

const Weather = () => {
  const [weatherData, setWeatherData] = useState();
  const [city, setCity] = useState('Singapore');
  const [tempUnit, setTempUnit] = useState("metric");
  const [dateTime, setDateTime] = useState(new Date());
  useEffect(() => {
    const apiKey = '20f7632ffc2c022654e4093c6947b4f4';
    const fetchData = async () => {
      try {
        const coordinatesPromise = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`);
        const coordinatesJson = await coordinatesPromise.json();
        const lat = coordinatesJson[0].lat;
        const lon = coordinatesJson[0].lon;
        const weatherPromise = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${tempUnit}&exclude=minutely,alerts&appid=${apiKey}`);
        const weatherJson = await weatherPromise.json();
        console.log(weatherJson);
        setWeatherData(weatherJson);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [tempUnit]);

  useEffect(() => {
    const timer = setInterval(()=>setDateTime(new Date()), 1000);
    return () => {
      clearInterval(timer);
    };
  });

  const currentWeatherConditions = weatherData ? weatherData.current.weather[0].main : '';
  const currentWeatherDesc = weatherData? weatherData.current.weather[0].description : '';
  return (
    <div className="weather">
      <General city={city} dateTime={dateTime}/>
      <div className="current-weather">
        <Temperature weatherData={weatherData} tempUnit={tempUnit} setTempUnit={setTempUnit}/>
        <div className="current-weather-conditions">{currentWeatherConditions}</div>
        <div className="current-weather-desc">{currentWeatherDesc}</div>
      </div>
      <CurrentStats weatherData={weatherData}/>
    </div>
  );
};

export default Weather;
