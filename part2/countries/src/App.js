import { useState, useEffect } from 'react'
import axios from 'axios'
import CountriesDisplay from './components/CountriesDisplay'
import Filter from './components/Filter'


const App = () => {
    const [currFilter, setFilter] = useState('')
    const [countries, setCountries] = useState([])
    const [countriesToShow, setCountriesToShow] = useState([])

    useEffect(() => setCountriesToShow(countries.filter((country) => country.name.common.toLowerCase().includes(currFilter))), [currFilter, countries])

    const filterController = (event) => {
        event.preventDefault()
        setFilter(event.target.value)
    }

    const buttonHandler = (country) => {
        setCountriesToShow([country])
    }

    useEffect(() => {
        axios
            .get('https://restcountries.com/v3.1/all')
            .then((response) => {
                setCountries(response.data)
            })
    }, [])

    return <div>
        <Filter callback={filterController}></Filter>
        <CountriesDisplay callback={buttonHandler} countries={countriesToShow}></CountriesDisplay>
    </div>
    
}

export default App