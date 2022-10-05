const CountriesDisplay = ({ countries }) => {
    if (countries.length === 0) {
        return <p>No countries found</p>
    }

    if (countries.length > 10) {
        return <p>Too many matches, specify another filter</p>
    }

    if (countries.length > 1) {
        return <CountryList countries={countries}></CountryList>
    }
    
    return <Country country={countries[0]}></Country>
}

const CountryList = ({ countries }) => {
    return <div>
        {countries.map((country) => <p>{country.name.common}</p>)}
    </div>
}


const Country = ({ country }) => {
    console.log(country)

    return (<div>
        <h1>{country.name.common}</h1>
        <p>capital {country.capital[0]}</p>
        <p>area {country.area}</p>
        <p><strong>languages:</strong></p>
        <ul>
            {Object.entries(country.languages).map((language) => <li key={language[1]}>{language[1]}</li>)}
        </ul>
        <img src={country.flags.png} alt="flag"></img>
    </div>)
}

export default CountriesDisplay