import React from 'react'

const WeatherDetails = ({data,temperatureUnit}) => {
  return (
    <>
        Temperature: {data.main.temp} °{temperatureUnit}<br />
        Weather Description: {data.weather[0].description}<br />
        Humidity: {data.main.humidity} %<br />
        Wind Speed: {data.wind.speed} m/s<br />
    </>
  )
}

export default WeatherDetails