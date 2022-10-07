import axios from 'axios'
import { useState, useEffect } from 'react'

const REACT_APP_WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY

const CountriesDisplay = ({ countries, callback }) => {
    if (countries.length === 0) {
        return <p>No countries found</p>
    }

    if (countries.length > 10) {
        return <p>Too many matches, specify another filter</p>
    }

    if (countries.length > 1) {
        return <CountryList callback={callback} countries={countries}></CountryList>
    }
    
    return <Country country={countries[0]}></Country>
}

const CountryList = ({ countries, callback }) => {
    const showButtonHandler = (country) => {
        return () => callback(country)
    }

    return <div>
    {countries.map((country) => 
        <div key={country.name.common}>
            <p>{country.name.common}</p>
            <button onClick={showButtonHandler(country)}>show more</button>
        </div>
    )}</div>

}


const Country = ({ country }) => {
    const [weatherData, setWeatherData] = useState(-1)

    useEffect(() => {axios
                    .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]},${country.cca3}&appid=${REACT_APP_WEATHER_API_KEY}`)
                    .then(
                        (response) => {setWeatherData(response.data)}
                    )}, 
                [country.capital, country.cca3]
            )

    return (<div>
        <h1>{country.name.common}</h1>
        <p>capital {country.capital[0]}</p>
        <p>area {country.area}</p>
        <p><strong>languages:</strong></p>
        <ul>
            {Object.entries(country.languages).map((language) => <li key={language[1]}>{language[1]}</li>)}
        </ul>
        <img src={country.flags.png} alt="flag"></img>
        {<Weather weather={weatherData}></Weather>}
    </div>)
}

const Weather = ({ weather }) => {
    if (weather === -1) {
        return <></>
    }

    return (
        <div>
            <h1>Weather in {weather.name}</h1>
            <p>temperature {Math.round((weather.main.temp - 273) * 100) / 100} Celcius</p>
            <img alt="" src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}></img>
            <p>wind {weather.wind.speed} m/s</p>
        </div>
    )
}

export default CountriesDisplay