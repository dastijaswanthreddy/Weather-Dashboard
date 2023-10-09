import React, { useState } from 'react'
import SearchIcon from './Icons/SearchIcon'
import { getCityWeatherDetails, getWeatherImage } from './services/Service';
import WeatherDetails from './WeatherDetails';

const DisplayWeatherDetails = () => {
    const [cityName, setCityName] = useState("");
    const [weatherDetails, setWeatherDetails] = useState(null);
    const [notFound, setNotFound] = useState(false);
    const [temperatureUnit, setTemperatureUnit] = useState('F')

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
          fetchCityWeatherDetails();
        }
      };

    const handleCityNameChange = (e) => {
        setCityName(e.target.value);
        setNotFound(false);
    }

    const fetchCityWeatherDetails = async () => {
        if (cityName.length === 0) return;

        try {
            const cityWeatherDetailsResponse = await getCityWeatherDetails(cityName);
            const cityWeatherDetails = cityWeatherDetailsResponse.data;
            setNotFound(false);
            setWeatherDetails(cityWeatherDetails);
        } catch (error) {
            setWeatherDetails(null);
            setNotFound(true);
            console.error(`Error while fetching weather details for city "${cityName}":`, error);
        }
    }

    const switchTemparatureUnits = () => {
        const copyWeatherDetails = {...weatherDetails};
        const temp = copyWeatherDetails.main.temp;
        if (temperatureUnit === 'F') {
            let tempC = (temp - 32) * 5 / 9;
            copyWeatherDetails.main.temp = tempC.toFixed(2);
            setTemperatureUnit('C');
        } else {
            let tempF = 32 + temp * 9 / 5;
            copyWeatherDetails.main.temp = tempF.toFixed(2);
            setTemperatureUnit('F');
        }
        setWeatherDetails(copyWeatherDetails);
    }

    return (
        <>
            <div className="search-div mt-4">
                <div className='input-container d-flex justify-content-center'>
                    <SearchIcon />
                    <input type="search" value={cityName} className="form-control text-center"
                        placeholder="Enter city name" onChange={handleCityNameChange} onKeyUp={handleKeyPress} />
                    <input type='submit' value='Search' className='form-control search-width me-5' onClick={fetchCityWeatherDetails}/>
                </div>
            </div>
            {
                !notFound ? weatherDetails && (
                    <div className='container justify-content-center'>
                        <div className='card col-md-5'>
                            <div className="card-header ms-1 me-1">
                                <h3>{ weatherDetails.name }</h3>
                                <img src={getWeatherImage(weatherDetails.weather[0].icon)} alt=''/>
                            </div>
                            <div className='card-body mb-1'>
                                { <WeatherDetails data={weatherDetails} temperatureUnit={temperatureUnit} /> }
                            </div>
                            <div className='card-footer' onClick={switchTemparatureUnits}>
                                <center>
                                    <i>Click here to switch to {temperatureUnit === 'F' ? "Celcius" : "Fahrenheit"}</i>
                                </center>
                            </div>
                        </div>
                    </div>
                ) : (
                    <center className='mt-5'> <i> Found error while fetching weather details for city - <b>{cityName}</b> </i> </center>
                )
            }

        </>
    )
}

export default DisplayWeatherDetails