import React, { useEffect, useState } from 'react';
import General from './General';
import Temperature from './Temperature';
import CurrentStats from './CurrentStats';
import {WeatherImageMapBG} from './WeatherImageMap';
import Forecast from './Forecast';
import SearchBar from './SearchBar';

import cities from 'cities.json';

const Weather = () => {
  const [weatherData, setWeatherData] = useState();
  const [currentWeatherConditions, setCurrentWeatherConditions] = useState('');
  const [currentWeatherDesc, setCurrentWeatherDesc] = useState('');
  const [background, setBackground] = useState({});
  const [city, setCity] = useState('Singapore');
  const [tempUnit, setTempUnit] = useState("metric");
  const [forecastType, setForecastType] = useState('hourly');
  const [cityInput, setCityInput] = useState('');

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
        setCurrentWeatherConditions(weatherJson.current.weather[0].main);
        setCurrentWeatherDesc(weatherJson.current.weather[0].description);
        const backgroundRef = WeatherImageMapBG[weatherJson.current.weather[0].main];
        setBackground({
          backgroundImage: backgroundRef,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        });
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [tempUnit, city]);

  const capitalizeAndStrip = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).trim();
  };
  const isValidCity = (inputCity) => {
    const capitalize = capitalizeAndStrip(inputCity);
    return cities.some(city=>city.name===capitalize);
  }; 

  const onSubmitCitySearch = (e) => {
    e.preventDefault();
    const inputEl = e.target.querySelector('input[name="city"]');
    inputEl.setCustomValidity('');
    if (isValidCity(cityInput)) {
      setCity(capitalizeAndStrip(cityInput));
      setCityInput('');
    } else {
      inputEl.setCustomValidity('This is not a valid city.');
      setTimeout(()=>{inputEl.setCustomValidity('');}, 3000);
    };
  };


  return (
    <div className="weather-bg" style={background}>
      <div className="weather">
        <SearchBar 
          cityInput={cityInput} 
          setCityInput={setCityInput} 
          onSubmitCitySearch={onSubmitCitySearch}
        />
        <General city={city}/>
        <div className="current-weather">
          <Temperature weatherData={weatherData} tempUnit={tempUnit} setTempUnit={setTempUnit}/>
          <div className="current-weather-conditions">{currentWeatherConditions}</div>
          <div className="current-weather-desc">{currentWeatherDesc}</div>
        </div>
        <CurrentStats weatherData={weatherData}/>
        <Forecast weatherData={weatherData} tempUnit={tempUnit} forecastType={forecastType} setForecastType={setForecastType}/>
      </div>
    </div>
  );
};

export default Weather;
