import rain from '../images/rain.png';
import thunderstorm from '../images/thunderstorm.png';
import snow from '../images/snow.png';
import clear from '../images/clear.png';
import clouds from '../images/cloudy.png';
import drizzle from '../images/drizzle.png';

const WeatherImageMapBG = {
  "Rain" : "url(/images/rain-bg.png)",
  "Thunderstorm" : "url(/images/thunderstorm-bg.png)",
  "Snow" : "url(/images/snow-bg.png)",
  "Clear" : "url(/images/clear-bg.png)",
  "Clouds" : "url(/images/clouds-bg.png)",
  "Drizzle" : "url(/images/drizzle-bg.png)"
};

const WeatherImageMap = {
  "Rain" : rain,
  "Thunderstorm" : thunderstorm,
  "Snow" : snow,
  "Clear" : clear,
  "Clouds" : clouds,
  "Drizzle" : drizzle
};

export  {WeatherImageMapBG, WeatherImageMap};