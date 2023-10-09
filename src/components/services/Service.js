import axios from "axios";

const X_API_KEY = '4cc6bd16fc8abd0766b13885aa2217c9';
const REST_API_HOST = "https://api.openweathermap.org/";

export const getCityWeatherDetails = (cityName) => axios.get(REST_API_HOST + "data/2.5/weather?q=" + cityName + "&appid=" + X_API_KEY);
export const getWeatherImage = (icon) => {return "https://openweathermap.org/img/wn/" + icon + ".png"};